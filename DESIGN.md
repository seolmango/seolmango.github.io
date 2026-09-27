---
name: seolmango.github.io
description: A Korean personal research notebook where materials science and software share one axis.
colors:
  plate-white: "#f5f6f4"
  graphite-ink: "#1c2024"
  graphite-ink-2: "#474d55"
  graphite-ink-3: "#656b73"
  hairline-grey: "#c9cdd1"
  rule-strong: "#1c2024"
  steel-blue: "#2c5877"
  mango: "#e2a336"
  mango-ink: "#8f5600"
  mango-wash: "color-mix(in srgb, var(--mango) 14%, var(--ground))"
  graphite-plate-dark: "#15181b"
  chalk-ink-dark: "#e4e6e4"
  chalk-ink-2-dark: "#b4b9be"
  chalk-ink-3-dark: "#8e949a"
  hairline-grey-dark: "#353a40"
  steel-blue-dark: "#93b9d6"
  mango-dark: "#f0b454"
typography:
  display:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  body-small:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
    fontFeature: "tnum"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.9375rem"
    lineHeight: 1.6
rounded:
  none: "0px"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-6: "1.5rem"
  s-8: "2rem"
  s-12: "3rem"
  s-16: "4rem"
  s-24: "6rem"
components:
  notebook-row:
    backgroundColor: "{colors.plate-white}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem 0"
  row-label:
    textColor: "{colors.graphite-ink-3}"
    typography: "{typography.label}"
    width: "10rem"
  nav-link:
    textColor: "{colors.graphite-ink}"
    typography: "{typography.body-small}"
    height: "44px"
  nav-link-current:
    textColor: "{colors.steel-blue}"
    typography: "{typography.body-small}"
    height: "44px"
  theme-toggle:
    textColor: "{colors.graphite-ink}"
    height: "40px"
  original-link:
    textColor: "{colors.steel-blue}"
    padding: "0.75rem 0"
    height: "44px"
  field-input:
    backgroundColor: "{colors.plate-white}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.none}"
    padding: "0.25rem 0.5rem"
    height: "40px"
  field-mark:
    textColor: "{colors.graphite-ink-3}"
    typography: "{typography.label}"
---

# Design System: seolmango.github.io

## Overview

**Creative North Star: "The Phase-Diagram Plate"**

The site is set like a printed binary phase-diagram plate kept in a tidy research notebook. Materials science and software are the two components of one system and sit on one axis; everything else is hairlines, ticks, small labels, and numbered rows. The ground is a cool plate white with graphite ink, and a single steel-blue line marks what is live: links, focus, axis boundaries, and data points.

Density is that of a notebook index, not a landing page. The plate reaches 76rem; row text caps at 48rem, with a 10rem margin column for dates and indices on wider screens. Article prose caps at 46rem. There are no cards, no shadows, and no rounded corners; figures appear when a project or post supplies them. Motion is brief and removed under reduced motion.

Light is the default; dark mode follows the system until a visitor chooses a theme with the header toggle. The explicit choice is saved locally and applied before paint.

**Key Characteristics:**
- One Korean workhorse sans (Pretendard) on a fixed stepped scale, tabular figures for dates and indices.
- Structure through 1px hairline rules, never through fills or elevation.
- Steel blue is a signal, not a decoration.
- Categories and fields are expressed as line forms (solid, dashed, double), never as coloured chips.
- Numbered notebook rows with a provenance line on every entry.

## Colors

A near-monochrome graphite-on-plate palette with steel blue for links and focus, plus a restrained mango accent for section ticks, active underlines, dates, selection, and prose details.

### Primary
- **Steel-Blue Boundary Line** (steel-blue; dark mode steel-blue-dark): links on hover and focus, current navigation text, the focus outline, field-boundary lines and project points on the home axis, the diffraction peaks in the playground, the prominent "Velog에서 원문 보기" link, and the text caret.
- **Mango** (#e2a336; dark #f0b454): short marks on section rules, the home-name full stop, active nav/category underlines, thumbnail hover frames and title underlines, and prose dividers.
- **Mango ink** (#8f5600; dark #f0b454): dates and period numerals, plus list markers. Keep category and field labels in ink-3.
- **Mango wash** (14% mango on light ground; 12% on dark): inline code. A 35% mix colors text selection.

### Neutral
- **Cool Plate White** (plate-white; dark graphite-plate-dark): the page ground and the ground of form controls.
- **Graphite Ink** (graphite-ink; dark chalk-ink-dark): headings, body text, and the strong rule used for axis baselines and ticks.
- **Graphite Ink 2** (graphite-ink-2; dark chalk-ink-2-dark): secondary prose such as taglines, excerpts, row summaries, field marks, and empty states.
- **Graphite Ink 3** (graphite-ink-3; dark chalk-ink-3-dark): nonnumeric row labels, captions, axis field names, counts, and quiet notes.
- **Hairline Grey** (hairline-grey; dark hairline-grey-dark): every 1px divider, link underlines at rest, form borders, figure frames, table rules, and the scrollbar thumb.

### Named Rules
**The Two Accent Roles.** Steel blue identifies links and focus; mango marks structural details and selected underlines. Body links remain blue on hover.

**The Ink Ladder Rule.** Hierarchy of text is carried by three ink steps (ink, ink-2, ink-3), not by extra hues.

## Typography

**Display Font:** Pretendard Variable (self-hosted dynamic subset, with Pretendard, system-ui, sans-serif)
**Body Font:** Pretendard Variable (same stack)
**Label/Mono Font:** ui-monospace stack, used only for code in post prose

**Character:** One Korean sans does all the work at a small number of fixed steps; weight 600 with slight negative tracking makes headings, weight 500 makes labels. Korean text uses `word-break: keep-all` so words never split mid-syllable-group.

### Hierarchy
- **Display** (600, fluid 2rem to 2.75rem, 1.3): the page title only; on the home page, the owner's name.
- **Headline** (600, 1.625rem, 1.3): section headings (최근 글, 프로젝트, 플레이그라운드), each sitting under a hairline.
- **Title** (600, 1.25rem, 1.3): entry titles inside notebook rows, and the data table caption.
- **Body** (400, 1.0625rem, 1.75): running text, capped at 48rem; article prose at 46rem.
- **Body small** (400, 0.9375rem): navigation, "more" links, project links, footer, excerpts, form legends.
- **Label** (500, 0.8125rem, 1.5, tabular figures): dates, indices, provenance lines, field marks, captions, axis names and numerals.

### Named Rules
**The Tabular Figures Rule.** Every date, index, count, and measured value uses tabular numerals so columns of numbers align like a lab table.

**The Fixed Step Rule.** Only the six size tokens exist; only the display step is fluid.

## Layout

A single plate container (max 76rem, 1.25rem side padding, 2rem from 48rem, 3rem from 80rem) holds a left-aligned reading column. Row content caps at 48rem; article prose caps at 46rem.

From 48rem, each notebook row becomes a two-column grid with a 9rem label column; from 64rem, the label grows to 10rem. The content column fills the remaining plate but its text caps at 48rem. Below 48rem, the label stacks above the content. On blog lists from 80rem, a sticky 10rem category column sits beside the post list.

Vertical rhythm uses a 4px-based scale (0.25rem to 6rem). Page heads take 4rem above and 3rem below; sections are separated by 4rem, with the heading placed 2rem below its hairline; rows take 1.5rem top and bottom; the footer sits 6rem below content. A heading sits closer to its first row than to the rule above it.

Header: site name at left linking home, four nav items and a 40px sun/moon theme toggle at right, with a 4rem bar and hairline beneath. Below 42rem the name stacks above the nav, which drops to label size.

## Elevation & Depth

The system is completely flat. There are no shadows and no tonal surface layers; depth and grouping come only from 1px hairline rules, whitespace, and the ink ladder. The only layered element is an axis point number, which takes a ground-coloured background so it sits cleanly over the tick line.

### Named Rules
**The Hairline Rule.** Separation is a 1px rule in hairline grey. If something needs to feel grouped, add space or a rule, never a shadow or a fill.

## Shapes

Square everywhere: zero radius on inputs, selects, figures, and code blocks. Borders are 1px hairlines. Underlines are 1px, offset 0.25em, grey at rest and steel blue on hover. The recurring geometry is the plotted line: axis baselines, ticks every 5 units with longer ticks every 25, vertical point strokes, and short field-mark strokes. Icons are 12px stroked SVG arrows (1.25 stroke) for external and back links only.

## Components

### Notebook Row
The core unit for posts, projects, playground entries, and contact links.
- **Structure:** label column (date in label type, or project index number) and content column (title, summary in ink-2, then a label-size provenance line).
- **Separation:** a hairline above every row after the first; no container, fill, or radius.
- **Provenance:** posts end with field mark and category, then "Velog 원문" as an external link; projects end with "GitHub 저장소" and any extra links; playground entries end with a quiet "데모 · 실제 연구 프로젝트가 아닙니다".
- **Blog year groups:** a small tabular year heading occupies the label column width.

### Field Mark
A 20 by 8 inline SVG stroke followed by the field name in label type, ink-3.
- **재료과학:** one solid line (1.5 stroke).
- **소프트웨어:** one dashed line (1.5 stroke, 3/2 dash), which reads as dotted at this size.
- **재료 + 코드:** a double line (two 1-stroke parallels).
- In post provenance lines and post metadata the mark appears without its text, next to the category label.

### System Axis (signature)
The home-page plate: three field bands labelled 재료과학, 재료 + 코드, 소프트웨어 above a graphite baseline with 21 ticks. Two steel-blue vertical boundaries split the bands at 35 and 65 percent. Each featured project is a steel-blue point stroke in its band, with its index number linking to its row. Hovering or focusing a project row thickens its point to 3px and underlines its number. The SVG carries a Korean summary label with the count per field.

### Navigation
- **Style:** body-small text, no underline, 44px minimum hit height, 1.5rem gaps.
- **Current:** steel-blue text with a mango bottom border.
- **Category nav (blog):** the same pattern over a hairline, each item followed by its count in ink-3 tabular label type. From 80rem it becomes a sticky vertical list.

### Links
- **Inline:** inherit ink colour with a 1px hairline-grey underline; hover and focus turn text and underline steel blue over 150ms.
- **External:** label followed by a 12px north-east arrow SVG.
- **Original article:** on post pages, a full-width row between two hairlines, steel blue, weight 600, 44px tall, repeated at the end of the post.
- **Focus:** a 2px steel-blue outline offset 3px on every focusable element.

### Inputs / Fields
- **Style:** plate-white ground, 1px hairline border, square, 40px minimum height; native radios and range use the accent colour.
- **Grouping:** fieldsets without borders, legends in body-small at 600; the whole form sits between two hairlines.

### Figures
- **Frame:** images get a 1px hairline border, no radius.
- **Caption:** below the image in ink-3 label type, numbered "그림 n." followed by the caption.
- **Project galleries:** first figure spans the full width, the rest pair in two columns from 48rem.

### Data Plot and Table (playground)
The Bragg demo reuses the axis grammar: graphite baseline and ticks (longer every 10°), steel-blue peak strokes (1.5), hkl labels in ink-2 label type, and 2θ numerals in ink-3 that drop alternate decades below 38rem. The results table is small, tabular, right-aligned numerically, with hairline row rules and no vertical rules.

## Do's and Don'ts

### Do:
- **Do** separate content with 1px hairline-grey rules and whitespace from the spacing scale.
- **Do** set every date, index, count, and measurement in tabular figures at label size.
- **Do** give every entry a provenance line: category or field, then the original Velog or GitHub link.
- **Do** mark field and category with a line form: solid for 재료과학, dashed for 소프트웨어, double for 재료 + 코드.
- **Do** number figures "그림 n." with the caption below the image in ink-3 label type.
- **Do** keep steel blue to links on hover and focus, the current state, focus rings, axis boundaries, and data points.
- **Do** keep hit targets at least 44px for navigation and the original-article link, and remove transitions under reduced motion.

### Don't:
- **Don't** use shadows, rounded corners, or filled card containers.
- **Don't** express categories, fields, or states as coloured chips or badges.
- **Don't** use either accent as a broad fill or heading colour; keep their roles distinct.
- **Don't** add decorative imagery or hero banners; images appear only as numbered figures supplied by content.
- **Don't** add type sizes outside the six-step scale.
