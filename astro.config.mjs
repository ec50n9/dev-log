import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";
import { transformerNotationDiff, transformerNotationErrorLevel, transformerNotationFocus, transformerNotationHighlight, transformerNotationWordHighlight } from 'shikiji-transformers';


// https://astro.build/config
export default defineConfig({
  site: "https://www.xxsong.com",
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // theme: 'github-dark',
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
        transformerNotationFocus()
      ]
    }
  },
  integrations: [
    mdx(),
    sitemap({
      changefreq: "daily",
      priority: 1,
      lastmod: new Date().toISOString().split("T")[0],
    }),
    tailwind(),
    icon()
  ],
  output: "server",
  adapter: cloudflare(),
});
