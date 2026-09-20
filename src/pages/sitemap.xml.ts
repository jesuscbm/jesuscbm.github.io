import type { APIContext } from "astro";
import { getPublishedPosts, getAllTags, postPath } from "@/lib/blog";

// Hand-rolled so it stays at exactly /sitemap.xml (the path public/robots.txt
// points at). @astrojs/sitemap would emit /sitemap-index.xml instead.
export async function GET(context: APIContext) {
  const site = (context.site ?? new URL("https://www.jesusblazquez.eu")).origin;
  const posts = await getPublishedPosts();
  const tags = await getAllTags();

  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const seen = new Set<string>();
  const entries: { loc: string; lastmod?: string }[] = [];
  const add = (loc: string, lastmod?: string) => {
    if (seen.has(loc)) return;
    seen.add(loc);
    entries.push({ loc, lastmod });
  };

  add("/");
  add("/blogs/");
  add("/tags/");
  for (const p of posts) {
    add(postPath(p), iso(p.data.updatedDate ?? p.data.pubDate));
  }
  for (const t of tags) add(`/tags/${t.slug}/`);

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url><loc>${site}${e.loc}</loc>` +
          (e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : "") +
          `</url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
