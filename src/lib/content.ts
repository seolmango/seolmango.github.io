import profileData from '../data/profile.json';
import projectData from '../data/projects.json';
import categoryData from '../data/categories.json';
import postData from '../data/generated/velog-posts.json';
import sampleProfileData from '../data/sample/profile.json';
import sampleProjectData from '../data/sample/projects.json';
import sampleCategoryData from '../data/sample/categories.json';
import samplePostData from '../data/sample/velog-posts.json';
import { sanitizeFeedHtml } from '../../scripts/lib/feed-html.mjs';

export const isSampleMode = import.meta.env.MODE === 'sample';
const profileSource = isSampleMode ? sampleProfileData : profileData;
const projectSource = isSampleMode ? sampleProjectData : projectData;
const categorySource = isSampleMode ? sampleCategoryData : categoryData;
const postSource = isSampleMode ? samplePostData : postData;
const dataPath = (name: string) => `src/data/${isSampleMode ? 'sample/' : ''}${name}.json`;

export type Link = { label: string; url: string };
export type Image = { src: string; alt: string; caption?: string };
export type ProfileRecord = {
  group: string;
  title: string;
  detail?: string;
  period?: string;
  url?: string;
};
export type Profile = {
  siteTitle: string;
  siteDescription: string;
  name: string;
  displayName: string;
  tagline: string;
  intro: string[];
  about: string[];
  records: ProfileRecord[];
  links: Link[];
  photo: Image | null;
  velog: { username: string };
};
export type Project = {
  id: string;
  title: string;
  summary: string;
  description?: string[];
  field: 'materials' | 'software' | 'both';
  repo?: string;
  links?: Link[];
  images?: Image[];
  tags?: string[];
  period?: string;
  playground?: string;
  featured?: boolean;
};
export type Category = { id: string; label: string; field?: Project['field'] };
export type Post = {
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
  const links = profileSource.links.map((link, index) => {
    if (!link.label?.trim() || !validLink(link.url))
      throw new Error(`${dataPath('profile')}: 잘못된 링크 ${index}: ${JSON.stringify(link)}`);
    return { label: trim(link.label), url: trim(link.url) };
  });
  if (profileSource.photo && !validImage(profileSource.photo))
    throw new Error(`${dataPath('profile')}: 잘못된 사진 photo: ${JSON.stringify(profileSource.photo)}`);
  return {
    ...profileSource,
    siteTitle,
    siteDescription: trim(profileSource.siteDescription),
    name,
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
export function getProjects(): Project[] {
  const seen = new Set<string>();
  const projects = (projectSource.projects as Project[]).map((project, index) => {
    if (
      !project.id?.trim() ||
      !project.title?.trim() ||
      !project.summary?.trim() ||
      !['materials', 'software', 'both'].includes(project.field) ||
      seen.has(project.id) ||
      (project.repo && !webUrl(project.repo)) ||
      project.links?.some((link) => !link.label?.trim() || !validLink(link.url))
    ) {
      throw new Error(
        `${dataPath('projects')}: 잘못된 항목 ${index}: ${JSON.stringify(project)}`,
      );
    }
    project.images?.forEach((image, imageIndex) => {
      if (!validImage(image))
        throw new Error(`${dataPath('projects')}: 잘못된 이미지 ${index}.${imageIndex}: ${JSON.stringify(image)}`);
    });
    seen.add(project.id);
    return project;
  });
  return projects.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}
export function getFeaturedProjects(limit = 3): Project[] {
  const projects = getProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}
export function getCategories(): Category[] {
  const categories = categorySource.categories as Category[];
  for (const [index, category] of categories.entries()) {
    if (category.field !== undefined && !['materials', 'software', 'both'].includes(category.field))
      throw new Error(`src/data/categories.json: 잘못된 field 항목 ${index}: ${category.field}`);
  }
  const ids = new Set(categories.map((category) => category.id));
  for (const id of Object.values(categorySource.tagMap as Record<string, string>))
    if (!ids.has(id))
      throw new Error(`src/data/categories.json: 알 수 없는 분류 ${id}`);
  for (const id of Object.values(
    categorySource.postMap as Record<string, string>,
  ))
    if (!ids.has(id))
      throw new Error(`src/data/categories.json: 알 수 없는 분류 ${id}`);
  return categories;
}
export function getCategoryLabel(id: string): string | null {
  return getCategories().find((category) => category.id === id)?.label ?? null;
}
export function getPosts(): Post[] {
  getCategories();
  const postMap: Record<string, string> = categorySource.postMap;
  const tagMap: Record<string, string> = categorySource.tagMap;
  return (postSource.posts as Omit<Post, 'categoryId'>[]).map((post) => ({
    ...post,
    contentHtml: sanitizeFeedHtml(post.contentHtml, post.url, { allowSiteImages: isSampleMode }),
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
  const source = postSource.source as { updatedAt?: string } | null;
  return source?.updatedAt ? { updatedAt: source.updatedAt } : null;
}
