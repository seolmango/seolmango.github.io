# Task H: redesign pass — thumbnails, long-form project pages, name, slightly livelier

Read AGENTS.md, DESIGN.md, and the current code first. `npm run build` cannot run in your sandbox (esbuild spawn EPERM); run `npm run check` (0 errors, 0 warnings). Keep readable formatting. Don't edit .github/**, vendor/.claude/.agents/.codex, .impeccable/**. No new npm dependencies (Astro content collections are built in).

Owner feedback: the tick-mark axis is confusing — remove it. Use "seolmango" as the public name, not the Korean real name. Be slightly livelier (not loud): project thumbnails, and projects should be writable as long articles.

## 1. Name
- `src/data/profile.json`: `"name": ""` (display name falls back to siteTitle "seolmango"), add `"englishName": "Chaehwan Seol"`. Add `englishName` (optional string) to Profile type/validation (also sample profile: "Sample Name").
- About page: under the h1 "소개" show a small line (label size, --ink-2) with the englishName when set.
- Links: add optional `text` to `{ label, url, text? }` — when present it replaces `linkText(url)` as visible text. Set LinkedIn's `text` to `linkedin.com/in/chaehwan-seol` in profile.json so the Korean name is not shown.
- Make sure the Korean name "설채환" appears nowhere in the rendered real-mode site (grep the source data; the LinkedIn URL itself may keep its encoded form).

## 2. Remove the axis
Delete `src/components/SystemAxis.astro` and all uses (home, projects). Keep `FieldMark` line forms for project fields and categories.

## 3. Projects become Markdown articles (content collection)
- Create `src/content.config.ts` with two collections using the `glob` loader: `projects` (`src/content/projects/*.md`) and `sampleProjects` (`src/content/sample-projects/*.md`). Zod schema for frontmatter: `title` (string), `summary` (string), `field` (enum materials|software|both), `repo` (url, optional), `links` (array of {label, url}, default []), `images` (array of {src, alt, caption?}, default []), `thumbnail` ({src, alt}, optional; defaults to images[0]), `tags` (string[], default []), `period` (string, optional), `featured` (boolean, default false), `order` (number, default 100; lower first), `playground` (string, optional). Image src: starts with "/" or https. The file name is the project id / URL slug.
- Migrate every project in `src/data/projects.json` to `src/content/projects/<id>.md` (same ids, same facts), and every sample project to `src/content/sample-projects/<id>.md`. Then delete `src/data/projects.json` and `src/data/sample/projects.json`, and update `src/lib/content.ts` (`getProjects()` becomes async via `getCollection`, choosing the collection by `isSampleMode`; keep validation errors readable; export a `Project` type with `id`, `body`-rendering access via `render()` from `astro:content`). Update all callers to await.
- Article bodies for REAL projects: write 2–5 short paragraphs per project using ONLY facts already in the project's current summary/description/tags, plus facts from its GitHub README if you can fetch `https://raw.githubusercontent.com/<owner>/<repo>/HEAD/README.md` (try it; if the network is unavailable, stay with the existing facts). Use headings like "무엇을 만들었나", "어떻게 동작하나", "사용한 것" only when there is real content for them. Never invent results, awards, dates, motivations, or feelings. Sample project bodies can be fictional and longer (use headings, lists, a code block, an image figure).
- Ordering: featured first, then `order`, then period descending.

## 4. Project pages
- `/projects/` : h1 "프로젝트", lead sentence, then a thumbnail grid of ALL projects (component `ProjectCardGrid.astro` — but no card chrome: image + text on the ground, separated by whitespace, not boxes). Grid: 3 columns ≥64rem, 2 columns ≥40rem, 1 column below; gap var(--s-8) row / var(--s-6) column. Each item: thumbnail (aspect-ratio 4 / 3, object-fit cover, 1px --rule frame, 0 radius), then period · FieldMark field label (label size), title (--t-h3, 600), summary (2-line clamp, --ink-2). Whole item is one link to `/projects/<id>/` (single anchor, accessible name = title). Hover/focus-visible: image scales to 1.03 inside its frame (overflow hidden) over 240ms ease-out, title underline turns --accent; reduced motion: no scale.
- Projects without any image get an authored typographic thumbnail (component `ProjectThumbFallback.astro`, pure HTML/CSS or inline SVG, no gradients): a plate in a tint of the field (materials: accent at ~8% mix on ground; software: --mango at ~12%; both: split diagonally by a 1px line into those two tints), the project title set large (clamp to 3 lines) in --ink, and the field's line-form pattern (solid / dashed / double lines) as a sparse texture along the bottom edge. Must look intentional in light and dark.
- `/projects/[id]/` (new `src/pages/projects/[id].astro`, getStaticPaths from the collection): BackLink "프로젝트 목록"; h1 title; meta line (period · FieldMark label · tags); summary as a lead paragraph (--t-body, --ink-2); links row (GitHub 저장소 + every link, ExternalLink, wrapping; "플레이그라운드에서 보기" if `playground` matches the registry); a hero figure = thumbnail (if real image) at full main-column width; then the Markdown body rendered with the existing `.prose` styles; then remaining `images` as numbered figures "그림 n." (existing figure styles); then prev/next project navigation (two links, hairline above, label "이전 프로젝트" / "다음 프로젝트"). Canonical is the site URL. The old `/projects/` anchors `#project-<id>` are gone; update any links pointing to them.

## 5. Home
Order: page head (display name "seolmango", tagline, intro) → section "대표 프로젝트" with the thumbnail grid of up to 3 featured projects (same component) and a "모든 프로젝트 보기" link → "최근 글" (unchanged) → "플레이그라운드" (unchanged). Remove the old compact project rows from home (ProjectRows may be deleted if unused).

## 6. Slightly livelier, same world
- Add a second, warm accent token "mango": light `--mango: #e2a336`, dark `--mango: #f0b454` (decorative only; never for text on ground since contrast is low). Use it sparingly: a small 0.4em filled circle after the site name in the header (aria-hidden), the text selection background (mix with ground so selected text stays ≥4.5:1), the 2px underline bar under the active nav item (replace accent there), and the software thumbnail tint. Steel-blue --accent stays for links and focus.
- Page head on home: display name a step larger on desktop (up to 3.5rem via clamp), tagline --t-h3 weight 400 --ink-2.
- Keep everything else calm: no gradients, shadows, glass, or scroll animations. One subtle entrance is allowed: the home thumbnail grid items fade/translate 8px in over 400ms ease-out with 60ms stagger on first load, content visible by default without JS (CSS animation only, `prefers-reduced-motion: reduce` disables it).

## 7. Docs
Update README.md: section "### 2. 프로젝트" now documents `src/content/projects/<id>.md` (frontmatter fields table + a full example file with body), thumbnails (`thumbnail` or first image, or the automatic text thumbnail), `order`/`featured`, and that the body is ordinary Markdown written like a blog post. Update the profile table (`englishName`, link `text`). Remove README mentions of projects.json and of the axis. Update the sample-mode notes (sample projects now in `src/content/sample-projects/`).

Done when `npm run check` passes with 0 errors/0 warnings, "설채환" does not appear in src/ (except inside the percent-encoded LinkedIn URL), and all pages exist. Summarize changed files.
