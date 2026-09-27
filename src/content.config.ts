import { defineCollection, z } from 'astro:content';
// @ts-ignore Node types are supplied by Astro at runtime, but not exposed to astro check here.
import { createRequire } from 'node:module';
import type { glob as GlobLoader } from 'astro/loaders';

// Load Astro's glob loader through Node so its CommonJS matcher stays external
// to Vite's content-config module runner on Windows.
const { glob } = createRequire(import.meta.url)('astro/loaders') as { glob: typeof GlobLoader };

const imageSource = z.string().refine(
  (value) => (value.startsWith('/') && !value.startsWith('//')) || value.startsWith('https://'),
  '이미지 주소는 / 또는 https://로 시작해야 합니다.',
);
const image = z.object({
  src: imageSource,
  alt: z.string().min(1),
  caption: z.string().optional(),
});
const schema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  field: z.enum(['materials', 'software', 'both']),
  repo: z.url().optional(),
  links: z.array(z.object({ label: z.string().min(1), url: z.url() })).default([]),
  images: z.array(image).default([]),
  thumbnail: image.pick({ src: true, alt: true }).optional(),
  tags: z.array(z.string()).default([]),
  period: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(100),
  playground: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema,
});
const sampleProjects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sample-projects' }),
  schema,
});

export const collections = { projects, sampleProjects };
