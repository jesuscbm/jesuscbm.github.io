import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPortfolio } from "@/data/portfolio";
import { getPublishedPosts, postPath } from "@/lib/blog";

// Site feed at /index.xml (matches the old Hugo path referenced by <link
// rel="alternate">).
export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const portfolio = getPortfolio("en");
  return rss({
    title: portfolio.meta.title,
    description: portfolio.meta.description,
    site: context.site ?? "https://www.jesusblazquez.eu",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postPath(post),
      categories: post.data.tags,
    })),
  });
}
