---
title: "Example project page"
description: "Template only. Copy this file to <project-id>.md and set draft: false."
draft: true
badges: ["Tag one", "Tag two"]
links:
  - label: "Source"
    url: "https://github.com/jesuscbm/your-repo"
relatedPosts: []
---

This is a **template**, not a real project. Because `draft: true`, it never
builds a page and never shows a "Case study" link.

To add a real dedicated page for a project:

1. Copy this file to `src/content/projects/<id>.md`, where `<id>` matches the
   `id` of an entry in `src/data/portfolio.ts`.
2. Set `draft: false` and write the page body in Markdown here.
3. Optionally list `relatedPosts` (blog slugs); links are bidirectional with the
   post's `projects` front matter.

The matching home card then gains a **Case study →** link to `/projects/<id>/`.
