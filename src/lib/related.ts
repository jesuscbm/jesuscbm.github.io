import { getCollection, type CollectionEntry } from "astro:content";
import { portfolio, getPortfolio, type LocalizedProject } from "@/data/portfolio";
import { getPublishedPosts, postSlug } from "@/lib/blog";
import { DEFAULT_LANG, type Lang } from "@/i18n";

/**
 * Resolve project <-> blog relations bidirectionally at build time.
 *
 * A post is "related" to a project if EITHER:
 *   - the project (portfolio.ts) lists the post slug in `relatedPosts`, OR
 *   - the post's front matter lists the project id in `projects`.
 * The union is returned, deduped, newest first.
 */
export async function getRelatedPosts(
  projectId: string,
): Promise<CollectionEntry<"blog">[]> {
  const posts = await getPublishedPosts();
  const project = portfolio.projects.find((p) => p.id === projectId);
  const fromProject = new Set(project?.relatedPosts ?? []);

  return posts.filter((post) => {
    if (fromProject.has(postSlug(post))) return true;
    return post.data.projects.some((ref) => ref.id === projectId);
  });
}

/** Projects related to a given post (both directions). */
export async function getRelatedProjects(
  post: CollectionEntry<"blog">,
  lang: Lang = DEFAULT_LANG,
): Promise<LocalizedProject[]> {
  const slug = postSlug(post);
  const ids = new Set<string>(post.data.projects.map((ref) => ref.id));
  for (const project of portfolio.projects) {
    if (project.relatedPosts?.includes(slug)) ids.add(project.id);
  }
  return getPortfolio(lang).projects.filter((p) => ids.has(p.id));
}

/** Which project ids have a dedicated (non-draft) page at /projects/<id>/. */
export async function getProjectPageIds(): Promise<Set<string>> {
  const entries = await getCollection("projects", ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );
  return new Set(entries.map((e) => e.id));
}

/** Projects in display order (featured first) with their links resolved. */
export async function getProjectsWithLinks(lang: Lang) {
  const pageIds = await getProjectPageIds();
  const projects = getPortfolio(lang).projects;
  const ordered = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ];
  return Promise.all(
    ordered.map(async (p) => ({
      ...p,
      hasPage: pageIds.has(p.id),
      posts: await getRelatedPosts(p.id),
    })),
  );
}
