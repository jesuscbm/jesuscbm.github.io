// @ts-check
import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeTableWrap from "./src/lib/rehype-table-wrap.ts";

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
  markdown: {
    // Match the old Chroma "tokyonight-night" look; Shiki renders at build time
    // with zero client JS. Dual themes so code reads well in light + dark.
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "tokyo-night",
      },
      wrap: false,
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
