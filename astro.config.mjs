import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Deploys to the root of https://seolmango.github.io/, so `site` is set to
// the root domain and no `base` path is configured.
export default defineConfig({
  site: "https://seolmango.github.io",
  integrations: [mdx(), sitemap()],
});
