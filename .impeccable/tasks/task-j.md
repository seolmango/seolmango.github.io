# Task J: public sample fallback for sections the owner has not filled yet

Read AGENTS.md and the current `src/lib/content.ts`, pages, and `src/data/**`. Another agent is concurrently adding files under `src/content/projects/` — do NOT touch that folder. `npm run build` cannot run in your sandbox; run `npm run check` (0 errors/0 warnings).

The owner explicitly wants the PUBLIC site to show dummy/sample content wherever real content is still missing, until they fill it in. It must stay honest: every sample item visibly says it is an example, and nothing links to fake external pages.

## Switch
Add `"sampleFallback": true` to `src/data/profile.json` (and false in `src/data/sample/profile.json` is not needed — sample mode already uses sample data everywhere). Type + validation in content.ts. Document in README (profile table: "`sampleFallback` — true면 아직 비어 있는 부분(글 등)을 예시 데이터로 채워 보여 줌. 실제 내용을 다 채우면 false").

## Fallback rules (real mode, only when `sampleFallback` is true)
- Blog posts: when the real generated posts list is empty, use the posts from `src/data/sample/velog-posts.json` and the categories/maps from `src/data/sample/categories.json`. Mark each such post with `isSample: true` on the Post type. As soon as at least one real post exists, no sample posts are used at all (never mix).
- Profile text fields: if `intro` is empty, leave it empty (don't fabricate intro). Do not add dummy emails or dummy links. Profile photo, about, records, links, projects are already real — no fallback for them.
- Nothing else falls back.

## Honest labelling of sample posts (real-mode fallback AND sample mode)
- Post rows (home "최근 글", /blog/, category pages): the provenance line shows "예시 글" (label style, with the mango dot or a small outlined tag in --ink-3 hairline — no filled coloured chip) instead of the "Velog 원문" link.
- /blog/ and category pages: above the list, a one-line notice in --ink-2 between hairlines: "아직 Velog 계정이 연결되지 않아 예시 글을 보여 주고 있습니다." (only when the list consists of sample posts).
- Post page for a sample post: replace both "Velog에서 원문 보기" rows with a non-link notice row in the same position/size: "예시 글입니다. Velog 계정이 연결되면 실제 글로 바뀝니다." Canonical = the site's own URL for sample posts (not velog). Add `<meta name="robots" content="noindex">` on sample post pages.
- Footer "마지막 동기화" must not show for sample posts (getSyncInfo returns null when using sample fallback).
- Sample post content images (`/images/sample/...`) must render in real mode too: pass `allowSiteImages: true` to the sanitizer for sample posts.
- The top-of-page sample-mode banner stays only for `--mode sample` (not for the fallback).

## Check
Make sure real posts (when present) still get the normal Velog links, canonical, and no labels. Summarize changed files.
