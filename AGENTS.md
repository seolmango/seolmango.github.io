# Repository guidance

- This repository is a Korean personal portfolio, blog, and playground on GitHub Pages. Give materials science and software work equal editorial weight.
- Keep the public UI, navigation, article labels, metadata, and empty states in Korean. Communicate with the owner in Korean; internal agent task prompts may be English.
- Build as a static Astro site. Keep interactive code limited to projects that need it.
- The owner's Velog username, biography, and featured projects are undecided. Put owner-editable values in one clearly documented place. Never invent personal facts, projects, or posts to fill gaps.
- Blog posts must originate from Velog RSS, retain their original URL, and support categories from feed metadata or an explicit owner-editable mapping. Keep a useful empty state before a feed URL is configured.
- Keep project descriptions owner-editable without changing component code. Link to original GitHub repositories.
- For UI work, use the installed Impeccable skill and the product brief in `PRODUCT.md`. Keep the result restrained, readable, responsive, and accessible.
- After implementation changes, run `npm run check` and `npm run build`; report any failure clearly.
