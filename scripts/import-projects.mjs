import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { marked } from 'marked';
import { sanitizeReadmeHtml } from './lib/feed-html.mjs';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
function option(name) {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} 옵션에 값이 필요합니다.`);
  return value;
}
const fixtureDir = option('--fixture-dir');
const output = resolve(option('--out') ?? 'src/data/generated/github-projects.json');
const { projects: config } = JSON.parse(await readFile('src/data/projects.json', 'utf8'));
let before = '';
try { before = await readFile(output, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
let previous = [];
try { previous = JSON.parse(before).projects ?? []; } catch { /* Recover from a damaged cache. */ }
const oldByRepo = new Map(previous.map((item) => [item.repo, item]));
const usedIds = new Set();
const results = [];
let failures = 0;
let reused = 0;
const warn = (message) => { failures++; console.warn(message); };
const serialize = (value) => JSON.stringify(value, null, 2) + '\n';
const value = (header, defaults, key, fallback = '') => header[key] !== undefined ? header[key] : defaults[key] ?? fallback;
const safeUrl = (url) => { try { const parsed = new URL(url); return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : ''; } catch { return ''; } };
const repoPattern = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

async function fetchText(url) {
  let error;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'seolmango-portfolio-importer', Accept: 'application/vnd.github+json',
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (caught) { error = caught; }
  }
  throw error;
}
async function apiFor(repo) {
  if (fixtureDir) return JSON.parse(await readFile(resolve(fixtureDir, `${repo.replace('/', '__')}.json`), 'utf8'));
  return JSON.parse(await fetchText(`https://api.github.com/repos/${repo}`));
}
async function readmeFor(repo, branch) {
  if (fixtureDir) return await readFile(resolve(fixtureDir, `${repo.replace('/', '__')}.md`), 'utf8');
  let error;
  for (const name of ['README.md', 'readme.md', 'README.MD']) {
    try { return await fetchText(`https://raw.githubusercontent.com/${repo}/${encodeURIComponent(branch)}/${name}`); }
    catch (caught) { error = caught; }
  }
  throw error;
}
function parseReadme(markdown) {
  const header = {};
  const links = [];
  const block = markdown.match(/^\s*<!-- portfolio\s*\r?\n([\s\S]*?)\r?\n-->\s*/i);
  if (block) {
    for (const line of block[1].split(/\r?\n/)) {
      const match = line.match(/^([a-z-]+):\s*(.*)$/);
      if (!match) continue;
      const [, key, raw] = match;
      const text = raw.trim();
      if (key === 'link') {
        const [label, ...rest] = text.split('|');
        const url = safeUrl(rest.join('|').trim());
        if (label?.trim() && url) links.push({ label: label.trim(), url });
      } else if (['title', 'summary', 'thumbnail', 'thumbnail-alt', 'field', 'period', 'tags'].includes(key)) header[key] = text;
    }
    markdown = markdown.slice(block[0].length);
  }
  markdown = markdown.replace(/<!-- portfolio:hide -->[\s\S]*?(?:<!-- portfolio:show -->|$)/gi, '');
  const heading = markdown.match(/^#\s+(.+)\s*$/m)?.[1]?.trim();
  markdown = markdown.replace(/^#\s+.+\r?\n?/m, '');
  return { header, links, heading, markdown };
}
function resolveImage(src, repo, branch) {
  if (!src) return '';
  if (src.startsWith('//')) return '';
  if (src.startsWith('/')) return `https://raw.githubusercontent.com/${repo}/${branch}${src}`;
  if (/^https?:\/\//i.test(src)) return src.replace(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i,
    'https://raw.githubusercontent.com/$1/$2/$3/$4');
  try { return new URL(src, `https://raw.githubusercontent.com/${repo}/${branch}/README.md`).href; }
  catch { return ''; }
}
function firstImage(html) {
  const src = html.match(/<img\b[^>]*\bsrc="([^"]+)"/i)?.[1];
  const alt = html.match(/<img\b[^>]*\balt="([^"]*)"/i)?.[1];
  return src ? { src: src.replaceAll('&amp;', '&'), alt: (alt ?? '').replaceAll('&quot;', '"') } : null;
}

for (const defaults of config) {
  const repo = defaults.repo;
  if (!repoPattern.test(repo)) { warn(`잘못된 저장소 이름: ${repo}`); continue; }
  const previousEntry = oldByRepo.get(repo);
  // URL slug: an explicit `id` in projects.json wins; otherwise split camelCase repo names into words.
  const toSlug = (value) => value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  let id = toSlug(defaults.id || repo.split('/')[1]);
  if (usedIds.has(id)) id = `${toSlug(repo.split('/')[0])}-${id}`;
  if (usedIds.has(id)) { warn(`중복된 프로젝트 ID: ${repo}`); continue; }
  usedIds.add(id);
  let api = {};
  try { api = await apiFor(repo); } catch (error) { warn(`${repo}: API 가져오기 실패 (${error.message})`); }
  const branch = api.default_branch || 'HEAD';
  let parsed;
  try { parsed = parseReadme(await readmeFor(repo, branch)); }
  catch (error) {
    warn(`${repo}: README 가져오기 실패 (${error.message})`);
    if (previousEntry) { results.push({ ...previousEntry, id }); reused++; continue; }
  }
  const header = parsed?.header ?? {};
  const title = value(header, defaults, 'title', parsed?.heading || repo.split('/')[1]);
  const summary = value(header, defaults, 'summary', api.description || '');
  let field = value(header, defaults, 'field', 'software');
  if (!['materials', 'software', 'both'].includes(field)) { warn(`${repo}: 잘못된 field '${field}' → software`); field = 'software'; }
  const period = String(value(header, defaults, 'period', api.created_at?.slice(0, 4) || ''));
  const tags = header.tags !== undefined ? header.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    : Array.isArray(defaults.tags) ? defaults.tags : api.language ? [api.language] : [];
  const links = parsed?.links.length ? parsed.links : defaults.links?.length ? defaults.links.filter((link) => safeUrl(link.url))
    : api.homepage && safeUrl(api.homepage) ? [{ label: '웹사이트', url: safeUrl(api.homepage) }] : [];
  const base = `https://raw.githubusercontent.com/${repo}/${branch}/README.md`;
  let html = '';
  if (parsed) try { html = sanitizeReadmeHtml(marked.parse(parsed.markdown, { gfm: true, async: false }), base); }
  catch (error) {
    warn(`${repo}: README 변환 실패 (${error.message})`);
    if (previousEntry) { results.push({ ...previousEntry, id }); reused++; continue; }
  }
  const sourceThumb = header.thumbnail ? { src: header.thumbnail, alt: header['thumbnail-alt'] || title }
    : defaults.thumbnail ?? firstImage(html);
  const thumbnail = sourceThumb ? { src: resolveImage(sourceThumb.src, repo, branch),
    alt: header['thumbnail-alt'] || sourceThumb.alt || title } : null;
  results.push({ id, repo, url: `https://github.com/${repo}`, title, summary, field, period, tags, links,
    thumbnail, html, updatedAt: api.pushed_at || previousEntry?.updatedAt || '' });
}
const next = serialize({ projects: results });
if (next !== before) await writeFile(output, next);
console.log(`GitHub 프로젝트 ${results.length}개, 이전 내용 유지 ${reused}개, 경고 ${failures}개, 파일 ${next === before ? '변경 없음' : '갱신'}`);
if (strict && failures) process.exitCode = 1;
