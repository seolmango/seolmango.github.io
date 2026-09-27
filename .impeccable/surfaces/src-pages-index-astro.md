---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages"]
---

Scope: whole site (home, about, projects, blog index/category/post, playground index/demo). Mode: Read (portfolio home leans Experience, but reading and wayfinding win).
Audience: peers and collaborators reading about a materials science undergraduate who codes. Job: understand the two halves of one practice, reach Velog originals and GitHub repos, try a playground demo.
Constraint from owner (pinned): "연구 노트 느낌, 정돈된. 화려하게 뭐 하려고 하지 말 것." Owner rejects developer landing-page tropes, heavy animation, card grids, résumé-style lists. Light default with system dark mode.
Unresolved: Velog username, bio, featured projects (owner-editable data, Korean empty states).

## Direction contract

THESIS: The site is a printed phase-diagram plate kept in a tidy research notebook: materials science and software are the two components of one system, and everything is set with hairlines, axis ticks, and small labels. It refuses the hero-banner/card-grid developer portfolio and the cream-paper editorial default.

OWN-WORLD: Cool plate white (#f5f6f4) ground, graphite ink (#1c2024), 1px hairline grey rules, one steel-blue boundary line (#2c5877) used only for links, focus, and the single axis. Dark: graphite plate (#15181b) with chalk ink. One Korean workhorse sans (Pretendard, self-hosted) at a fixed stepped scale, tabular numerals for dates and indices. Categories and states are line forms (solid, dashed, tick), never coloured chips. No cards, no shadows, no images besides post content.

STORY: The visitor reads a short name and one-line practice statement, sees the two components (재료 · 코드) on one axis, scans recent entries and projects as numbered notebook rows each carrying a provenance line, then opens a post (with the original Velog link prominent), a GitHub repo, or the playground demo.

FIRST VIEWPORT: Top: thin header rule with site name left and five Korean nav items right. Left-aligned column (max ~68ch): name as the largest text, one-line statement beneath, then a full-column hairline axis labelled 재료과학 at the left end and 소프트웨어 at the right end with small ticks. Directly below, the latest notebook entries (posts/projects) as dated rows. Primary action: the entries themselves and a quiet "모든 기록 보기" link.

FORM: Phase-diagram plate (binary system notation), candidate 6 of 7 on the ordered list; seed key 3fb53f9c. Raises: line form instead of hue for state (emission-line rail); provenance line on every entry (provenance ribbon); fixed stepped scale and tabular figures (star atlas).

SIGNATURE INTERACTION: The playground Bragg-diffraction demo draws a stick pattern on the same hairline axis grammar; elsewhere motion is limited to a short underline/tick transition on hover/focus, disabled under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
