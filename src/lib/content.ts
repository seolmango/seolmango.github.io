import profileData from '../data/profile.json';
import { getCollection, type CollectionEntry } from 'astro:content';
import categoryData from '../data/categories.json';
import postData from '../data/generated/velog-posts.json';
import sampleProfileData from '../data/sample/profile.json';
import sampleCategoryData from '../data/sample/categories.json';
import samplePostData from '../data/sample/velog-posts.json';
import { sanitizeFeedHtml } from '../../scripts/lib/feed-html.mjs';

export const isSampleMode = import.meta.env.MODE === 'sample';
const profileSource = isSampleMode ? sampleProfileData : profileData;
const usingSamplePosts = () => isSampleMode || (getProfile().sampleFallback && postData.posts.length === 0);
const categorySource = () => usingSamplePosts() ? sampleCategoryData : categoryData;
const postSource = () => usingSamplePosts() ? samplePostData : postData;
const dataPath = (name: string) => `src/data/${isSampleMode ? 'sample/' : ''}${name}.json`;

export type Link = { label: string; url: string; text?: string };
export type Image = { src: string; alt: string; caption?: string };
export type ProfileRecord = {
  group: string;
  title: string;
  detail?: string;
  period?: string;
  url?: string;
};
export type Profile = {
  sampleFallback: boolean;
  siteTitle: string;
  siteDescription: string;
  name: string;
  englishName?: string;
  displayName: string;
  tagline: string;
  intro: string[];
  about: string[];
  records: ProfileRecord[];
  links: Link[];
  photo: Image | null;
  velog: { username: string };
};
export type Project = CollectionEntry<'projects'> | CollectionEntry<'sampleProjects'>;
export type Category = { id: string; label: string; field?: Project['data']['field'] };
export type Post = {
  isSample: boolean;
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  tags: string[];
  excerpt: string;
  contentHtml: string;
  categoryId: string | null;
};

const trim = (value: string) => value.trim();
function validLink(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol) ||
      (parsed.protocol === 'mailto:' && !!parsed.pathname.trim());
  } catch {
    return false;
  }
}
function validImage(image: Image): boolean {
  if (!image || typeof image.src !== 'string' || typeof image.alt !== 'string' || !image.alt.trim())
    return false;
  if (image.src.startsWith('/') && !image.src.startsWith('//')) return true;
  try {
    return new URL(image.src).protocol === 'https:';
  } catch {
    return false;
  }
}
export function linkText(url: string): string {
  if (url.startsWith('mailto:')) return url.slice('mailto:'.length);
  const parsed = new URL(url);
  const path = parsed.pathname.replace(/\/$/, '');
  // Show percent-encoded paths (e.g. Korean LinkedIn slugs) as readable text.
  let readablePath = path;
  try {
    readablePath = decodeURIComponent(path);
  } catch {}
  return parsed.host.replace(/^www\./, '') + readablePath;
}
export function getProfile(): Profile {
  const siteTitle = trim(profileSource.siteTitle);
  const name = trim(profileSource.name);
  const englishName = (profileSource as { englishName?: unknown }).englishName;
  const sampleFallback = (profileSource as { sampleFallback?: unknown }).sampleFallback;
  if (sampleFallback !== undefined && typeof sampleFallback !== 'boolean')
    throw new Error(`${dataPath('profile')}: 잘못된 sampleFallback 값`);
  if (englishName !== undefined && typeof englishName !== 'string')
    throw new Error(`${dataPath('profile')}: 잘못된 englishName 값`);
  const configuredRecords = (profileSource as { records?: unknown }).records;
  const rawRecords = configuredRecords === undefined ? [] : configuredRecords;
  if (!Array.isArray(rawRecords))
    throw new Error(`${dataPath('profile')}: 잘못된 records 배열`);
  const records: ProfileRecord[] = rawRecords.map((record, index) => {
    if (
      !record ||
      typeof record !== 'object' ||
      typeof record.group !== 'string' ||
      !record.group.trim() ||
      typeof record.title !== 'string' ||
      !record.title.trim() ||
      (record.detail !== undefined && typeof record.detail !== 'string') ||
      (record.period !== undefined && typeof record.period !== 'string') ||
      (record.url !== undefined && (
        typeof record.url !== 'string' ||
        (record.url.trim() !== '' && !webUrl(record.url.trim()))
      ))
    )
      throw new Error(`${dataPath('profile')}: 잘못된 이력 ${index}: ${JSON.stringify(record)}`);
    return {
      group: trim(record.group),
      title: trim(record.title),
      ...(record.detail !== undefined && { detail: trim(record.detail) }),
      ...(record.period !== undefined && { period: trim(record.period) }),
      ...(record.url !== undefined && { url: trim(record.url) }),
    };
  });
  const links = (profileSource.links as Link[]).map((link, index) => {
    if (!link.label?.trim() || !validLink(link.url) || (link.text !== undefined && typeof link.text !== 'string'))
      throw new Error(`${dataPath('profile')}: 잘못된 링크 ${index}: ${JSON.stringify(link)}`);
    return { label: trim(link.label), url: trim(link.url), ...(link.text !== undefined && { text: trim(link.text) }) };
  });
  if (profileSource.photo && !validImage(profileSource.photo))
    throw new Error(`${dataPath('profile')}: 잘못된 사진 photo: ${JSON.stringify(profileSource.photo)}`);
  return {
    ...profileSource,
    sampleFallback: sampleFallback === true,
    siteTitle,
    siteDescription: trim(profileSource.siteDescription),
    name,
    ...(englishName !== undefined && { englishName: trim(englishName) }),
    displayName: name || siteTitle,
    tagline: trim(profileSource.tagline),
    intro: profileSource.intro.map(trim).filter(Boolean),
    about: profileSource.about.map(trim).filter(Boolean),
    records,
    links,
    photo: profileSource.photo,
    velog: { username: trim(profileSource.velog.username).replace(/^@/, '') },
  };
}
export function getVelog(): {
  configured: boolean;
  username: string;
  profileUrl: string | null;
} {
  const username = getProfile().velog.username;
  return {
    configured: !!username,
    username,
    profileUrl: username
      ? `https://velog.io/@${encodeURIComponent(username)}/posts`
      : null,
  };
}
function webUrl(value: string): boolean {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}
export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = isSampleMode
    ? await getCollection('sampleProjects')
    : await getCollection('projects');
  return projects.sort((a, b) =>
    Number(b.data.featured) - Number(a.data.featured) ||
    a.data.order - b.data.order ||
    (b.data.period ?? '').localeCompare(a.data.period ?? '', 'ko'),
  );
}
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.data.featured).slice(0, limit);
}
export function getCategories(): Category[] {
  const source = categorySource();
  const categories = source.categories as Category[];
  for (const [index, category] of categories.entries()) {
    if (category.field !== undefined && !['materials', 'software', 'both'].includes(category.field))
      throw new Error(`src/data/categories.json: 잘못된 field 항목 ${index}: ${category.field}`);
  }
  const ids = new Set(categories.map((category) => category.id));
  for (const id of Object.values(source.tagMap as Record<string, string>))
    if (!ids.has(id))
      throw new Error(`src/data/categories.json: 알 수 없는 분류 ${id}`);
  for (const id of Object.values(source.postMap as Record<string, string>))
    if (!ids.has(id))
      throw new Error(`src/data/categories.json: 알 수 없는 분류 ${id}`);
  return categories;
}
export function getCategoryLabel(id: string): string | null {
  return getCategories().find((category) => category.id === id)?.label ?? null;
}
export function getPosts(): Post[] {
  getCategories();
  const categories = categorySource();
  const source = postSource();
  const isSample = usingSamplePosts();
  const postMap: Record<string, string> = categories.postMap;
  const tagMap: Record<string, string> = categories.tagMap;
  return (source.posts as Omit<Post, 'categoryId' | 'isSample'>[]).map((post) => ({
    ...post,
    isSample,
    contentHtml: sanitizeFeedHtml(post.contentHtml, post.url, {
      allowSiteImages: isSample,
      allowExternalLinks: !isSample,
    }),
    categoryId:
      postMap[post.url] ??
      postMap[post.id] ??
      post.tags.map((tag) => tagMap[tag]).find(Boolean) ??
      null,
  }));
}
export function getPost(id: string): Post | undefined {
  return getPosts().find((post) => post.id === id);
}
export function getPostsByCategory(categoryId: string): Post[] {
  return getPosts().filter((post) => post.categoryId === categoryId);
}
export function getUsedCategories(): (Category & { count: number })[] {
  const posts = getPosts();
  return getCategories()
    .map((category) => ({
      ...category,
      count: posts.filter((post) => post.categoryId === category.id).length,
    }))
    .filter((category) => category.count > 0);
}
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  }).format(new Date(iso));
}
export function getSyncInfo(): { updatedAt: string } | null {
  if (usingSamplePosts()) return null;
  const source = postSource().source as { updatedAt?: string } | null;
  return source?.updatedAt ? { updatedAt: source.updatedAt } : null;
}
