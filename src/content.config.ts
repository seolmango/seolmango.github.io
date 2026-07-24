import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    hook: z.string(),
    // ISO date the project itself shipped/was last substantially worked on
    // (not the blog post's publish date) — used for sorting the log.
    date: z.coerce.date(),
    category: z.enum([
      "물리·수학 시뮬레이션",
      "로켓 동아리 & 센서",
      "머신러닝 실험",
      "웹 & 도구",
      "장난 프로젝트",
      "진행 중",
    ]),
    stack: z.array(z.string()),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    status: z.enum(["완료", "진행중", "아카이브"]).default("완료"),
    stars: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const playground = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/playground" }),
  schema: z.object({
    title: z.string(),
    hook: z.string(),
    // date the toy was built/last tinkered with — sorts the grid.
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, playground };
