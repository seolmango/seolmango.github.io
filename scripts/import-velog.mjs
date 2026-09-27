import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { sanitizeFeedHtml, htmlToExcerpt } from './lib/feed-html.mjs';

const args = process.argv.slice(2);
const option = (name) => {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const value = args[i + 1];
  // A flag without a value must not silently fall back to the real data file.
  if (!value || value.startsWith('--')) {
    console.error(`${name} 옵션에 값이 필요합니다 / ${name} requires a value.`);
    process.exit(1);
  }
  return value;
};
const output = resolve(
  option('--out') ?? 'src/data/generated/velog-posts.json',
);
const strict = args.includes('--strict');
const profile = JSON.parse(await readFile('src/data/profile.json', 'utf8'));
const username = String(option('--username') ?? profile.velog.username ?? '')
  .trim()
  .replace(/^@/, '');
const empty = { source: null, posts: [] };
const serialize = (value) => JSON.stringify(value, null, 2) + '\n';
let previousText;
try {
  previousText = await readFile(output, 'utf8');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

if (!username) {
  console.log(
    'Velog 사용자 이름이 설정되지 않았습니다 / Velog is not configured.',
  );
  if (previousText === undefined) await writeFile(output, serialize(empty));
  process.exit(0);
}

const feedUrl = `https://v2.velog.io/rss/@${encodeURIComponent(username)}`;
const warn = (message) => {
  console.warn(`Velog 가져오기 실패: ${message}`);
  if (process.env.GITHUB_ACTIONS)
    console.warn(
      `::warning::Velog import failed: ${message.replaceAll('\n', ' ')}`,
    );
};
let xml;
try {
  if (option('--file')) xml = await readFile(resolve(option('--file')), 'utf8');
  else {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(feedUrl, {
          signal: AbortSignal.timeout(15_000),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        xml = await response.text();
        break;
      } catch (error) {
        if (attempt === 3) throw error;
        await new Promise((done) => setTimeout(done, 250 * attempt));
      }
    }
  }
  const valid = XMLValidator.validate(xml);
  if (valid !== true) throw new Error('RSS XML을 읽을 수 없습니다');
  const parsed = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    cdataPropName: '#text',
    trimValues: true,
  }).parse(xml);
  if (!parsed?.rss?.channel) throw new Error('RSS channel이 없습니다');
  const channel = parsed.rss.channel;
  const items = channel.item
    ? Array.isArray(channel.item)
      ? channel.item
      : [channel.item]
    : [];
  const value = (entry) =>
    typeof entry === 'string'
      ? entry
      : Array.isArray(entry)
        ? entry.map(value).join('')
        : String(entry?.['#text'] ?? '');
  const prior = previousText ? JSON.parse(previousText) : empty;
  const sameSource =
    prior.source?.username?.toLowerCase() === username.toLowerCase();
  const posts = new Map(
    (sameSource ? prior.posts : []).map((post) => [post.url, post]),
  );
  const ids = new Set([...posts.values()].map((post) => post.id));
  let added = 0;
  let updated = 0;
  for (const item of items) {
    let url;
    try {
      url = new URL(value(item.link) || value(item.guid));
      if (url.protocol !== 'https:' || url.hostname !== 'velog.io') continue;
      url.search = '';
      url.hash = '';
    } catch {
      continue;
    }
    const canonical = url.href;
    const date = new Date(value(item.pubDate));
    if (!value(item.pubDate) || Number.isNaN(date.getTime())) continue;
    const old = posts.get(canonical);
    let id = old?.id;
    if (!id) {
      try {
        id = decodeURIComponent(
          url.pathname.split('/').filter(Boolean).at(-1) ?? '',
        );
      } catch {
        id = '';
      }
      id = id
        .normalize('NFC')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}_-]+/gu, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      if (!id || ids.has(id))
        id = `${id || 'post'}-${createHash('sha1').update(canonical).digest('hex').slice(0, 8)}`;
      ids.add(id);
    }
    const rawTags = item.category
      ? Array.isArray(item.category)
        ? item.category
        : [item.category]
      : [];
    const tags = [
      ...new Set(rawTags.map((tag) => value(tag).trim()).filter(Boolean)),
    ];
    const contentHtml = sanitizeFeedHtml(
      value(item.description) || value(item['content:encoded']),
      canonical,
    );
    const post = {
      id,
      title: value(item.title).trim() || '제목 없음',
      url: canonical,
      publishedAt: date.toISOString(),
      tags,
      excerpt: htmlToExcerpt(contentHtml),
      contentHtml,
    };
    if (old) {
      if (JSON.stringify(old) !== JSON.stringify(post)) updated++;
    } else added++;
    posts.set(canonical, post);
  }
  const result = [...posts.values()].sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) || a.url.localeCompare(b.url),
  );
  const unchanged =
    sameSource &&
    prior.source?.feedUrl === feedUrl &&
    JSON.stringify(prior.posts) === JSON.stringify(result);
  if (unchanged) console.log('변경 없음 / no changes');
  else
    await writeFile(
      output,
      serialize({
        source: { username, feedUrl, updatedAt: new Date().toISOString() },
        posts: result,
      }),
    );
  console.log(
    `새 글 ${added}, 갱신 ${updated}, 유지 ${result.length - added - updated}`,
  );
} catch (error) {
  warn(error instanceof Error ? error.message : String(error));
  process.exitCode = strict ? 1 : 0;
}
