import { getCollection, type CollectionEntry } from "astro:content";

const isProd = import.meta.env.PROD;

/** Published posts (drafts hidden in production, like Hugo), newest first. */
export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) =>
    isProd ? data.draft !== true : true,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** The post's URL slug = its directory name (preserves /blogs/<slug>/). */
export function postSlug(post: CollectionEntry<"blog">): string {
  // glob loader ids look like "architecturing_an_http_server/index"
  return post.id.replace(/\/index$/, "");
}

export function postPath(post: CollectionEntry<"blog">): string {
  return `/blogs/${postSlug(post)}/`;
}

/** Hugo-compatible tag slug (lowercase, spaces -> hyphens). Keeps /tags/<tag>/ stable. */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export async function getAllTags(): Promise<
  { tag: string; slug: string; count: number }[]
> {
  const posts = await getPublishedPosts();
  const map = new Map<string, { tag: string; slug: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { tag, slug, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => a.tag.localeCompare(b.tag));
}
