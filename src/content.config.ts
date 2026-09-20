import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog posts migrated from Hugo. Co-located under src/content/blog/<slug>/index.md
// so URLs stay /blogs/<slug>/ (see src/pages/blogs/[slug].astro).
const blog = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      // Optional hero image for the post (co-located).
      image: image().optional(),
      // post -> project links. Resolved bidirectionally with portfolio data.
      projects: z.array(reference("projects")).default([]),
    }),
});

// Optional per-project pages. A project only needs an entry here when it earns
// a full page at /projects/<id>/; the home cards live in src/data/portfolio.ts.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      // draft: true keeps a file as an in-repo template; it never builds a page.
      draft: z.boolean().default(false),
      image: image().optional(),
      badges: z.array(z.string()).default([]),
      links: z
        .array(z.object({ label: z.string(), url: z.string() }))
        .default([]),
      // project -> post links (in addition to any post that references back).
      relatedPosts: z.array(reference("blog")).default([]),
    }),
});

export const collections = { blog, projects };
