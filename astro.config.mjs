// @ts-check
import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeTableWrap from "./src/lib/rehype-table-wrap.ts";
import shikiContrast from "./src/lib/shiki-contrast.ts";

// Custom domain served at the root. Keep trailing slashes + directory output so
// every legacy Hugo URL (/blogs/<slug>/) resolves byte-for-byte and Giscus
// (mapping: pathname) keeps existing comment threads attached.
//
// The sitemap is hand-rolled at src/pages/sitemap.xml.ts (not @astrojs/sitemap)
// so it stays at the exact /sitemap.xml path referenced by public/robots.txt.
export default defineConfig({
  site: "https://www.jesusblazquez.eu",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  // English stays at the root (no /en/ prefix) so existing URLs are unchanged;
  // Spanish pages live under /es/. See src/i18n/index.ts.
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    // Match the old Chroma "tokyonight-night" look; Shiki renders at build time
    // with zero client JS. Dual themes so code reads well in light + dark.
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "tokyo-night",
      },
      wrap: false,
      transformers: [shikiContrast],
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { className: ["heading-anchor"] },
        },
      ],
      rehypeTableWrap,
    ],
  },
  image: {
    responsiveStyles: true,
  },
});
