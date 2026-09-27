# Build the personal website

You are the director working in Claude Code inside this repository. Read `CLAUDE.md`, `AGENTS.md`, `PRODUCT.md`, and the current repository before making changes. Carry this task through to a working, deployable site. Use Codex CLI for substantive coding in bounded tasks; you own architecture, design direction, diff review, and acceptance. Use the installed Impeccable skill to shape the design, then critique/audit and fix concrete findings. Communicate with the owner in Korean, and write the public website in Korean. Agent-to-agent prompts may be English.

## Product

Build a restrained, thoughtful portfolio for a materials science undergraduate who also codes. It should feel like a personal field notebook or editorial site, not a developer-only landing page or a generic SaaS template. Make typography, hierarchy, and whitespace do most of the work. Keep motion subtle and purposeful. Support mobile and desktop, keyboard navigation, readable contrast, and reduced-motion preferences.

Include a concise home/introduction, an about section, selected projects with short explanations and GitHub links, a blog with category filtering, and a playground that can host interactive project pages. At least one small, meaningful interactive example should demonstrate the playground structure without inventing a real personal project. Label it clearly as a demo. Avoid invented biography, achievements, project claims, photos, and blog posts.

## Content management

The owner has not chosen a Velog username, public introduction, or featured projects. Put these in a small, clearly named configuration/data area, with neutral Korean empty states where values are missing. Editing a title, link, category override, or project description must not require editing layout components. Document exact editing steps in the README.

Velog remains the blog source of truth. Implement an RSS import using the installed XML parser. Preserve canonical Velog URLs, publication dates, available tags/categories, and enough article content to render a useful themed post page when the feed provides it; always offer a prominent “Velog에서 원문 보기” link. Do not invent absent content. If RSS lacks reliable categories, provide a simple explicit mapping file and an “전체” category fallback. Sanitize or safely render any feed HTML, and handle images and links correctly.

Add a GitHub Actions workflow to refresh imported posts on a daily schedule and via `workflow_dispatch`. Make it idempotent: commit data only when changed, retain the last good data on transient feed failure, and do not create duplicate entries. Keep local builds usable when Velog is not configured or the network is unavailable. Add the GitHub Pages build/deploy workflow using Astro's supported static deployment method for this user-site repository. Do not require paid services, runtime secrets, or a server.

## Engineering and finish

Use the existing Astro project and its lockfile. Prefer small, maintainable components and the fewest additional dependencies needed. Keep interactive code isolated so the rest remains static. Verify `npm run check` and `npm run build`, and inspect the site in desktop and mobile views. Verify the empty Velog state, category navigation, original-post links, and an example project interaction. Fix failures, document any external setup required in GitHub Pages settings, and summarize completed work and remaining owner-editable values in Korean. Do not publish or push the site without the owner's explicit request.
