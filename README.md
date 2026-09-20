# Jesús Blázquez — Portfolio

Personal portfolio and blog, showcasing work in low-level systems programming,
mathematics, and security research.

Live at **[www.jesusblazquez.eu](https://www.jesusblazquez.eu)**.

## Tech stack

- **[Astro](https://astro.build/)** (static output) — ships zero JS by default;
  interactive/animated bits are small, self-contained scripts.
- **Content Collections** for the blog and (optional) project pages, with
  type-safe front matter and bidirectional relations via `reference()`.
- **Shiki** for build-time syntax highlighting (theme `tokyo-night`).
- **Self-hosted variable fonts** (`@fontsource-variable/*`) — no external font
  requests.
- **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`), custom
  domain through `public/CNAME`.

Motion is deliberately lean: a Canvas 2D network field in the hero, CSS
stroke-draw logos, and IntersectionObserver reveal-on-scroll. Everything
respects `prefers-reduced-motion` and degrades gracefully with JS disabled.

## Local development

Requires Node 20.3+ (or 22+). Then:

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build -> dist/
npm run preview   # serve the built dist/ locally
npx astro check   # type-check .astro / .ts
```

## Project layout

```
src/
  data/portfolio.ts        # ← THE single file for all portfolio content
  data/site.ts             # site switches (which logo variant is live)
  content/
    blog/<slug>/index.md    # blog posts (URLs: /blogs/<slug>/)
    projects/<id>.md        # OPTIONAL dedicated project pages (/projects/<id>/)
  content.config.ts         # collection schemas (blog + projects)
  components/               # UI + section components + logo concepts
  layouts/BaseLayout.astro  # shell: head/SEO, nav, footer, theme, motion
  pages/                    # routes (home, blog, tags, feeds, sitemap, 404)
  lib/                      # blog/tag helpers + related-content resolver
public/                     # static passthrough: CNAME, robots.txt, CV, PGP,
                            # og.jpg, favicons, project images
```

---

## How to: add a portfolio entry

Everything on the home page lives in **`src/data/portfolio.ts`**. It is a typed
module, so your editor flags mistakes.

- **Experience / job** — add to `experience[].jobs`. `summary` shows collapsed;
  the optional `details: string[]` are revealed in the expandable.
- **Education** — add to `education[]`; `focus: string[]` becomes the expandable.
- **Achievement** — add to `achievements[]`.
- **Skill** — add to the relevant `skills[]` group (or add a new group).
- **Project card** — push to `projects[]`:

  ```ts
  {
    id: "my-project",              // stable slug (used for links + page routing)
    title: "My Project",
    blurb: "One line for the card face.",
    longDescription: "Shown when the card is expanded.", // optional
    badges: ["C", "Networking"],
    image: "/img/projects/my-project.png",  // optional; put file in public/img/projects/
    links: [{ label: "Source", url: "https://github.com/…" }],
    relatedPosts: ["some-post-slug"],        // optional; see linking below
    featured: false,
  }
  ```

  If you add an `image`, drop the file (and an optional `.webp` sibling, used
  automatically) in `public/img/projects/`.

## How to: add a blog post

Create `src/content/blog/<slug>/index.md`. The directory name is the URL:
`/blogs/<slug>/`.

```md
---
title: "Post title"
description: "Short summary for cards, RSS, and social previews."
pubDate: 2026-09-19
draft: false            # true = hidden in production builds
tags: ["C++", "epoll"]
projects: ["my-project"] # optional; links this post to a project (see below)
image: ./cover.png       # optional; co-locate the file next to index.md
---

Body in Markdown. Co-locate images next to `index.md` and reference them
with `./image.png` — Astro optimizes them. Fenced code blocks are highlighted
at build time. GFM tables are supported and scroll on mobile.
```

Comments (Giscus), RSS (`/index.xml`, `/blogs/index.xml`), the sitemap, tag
pages, and the reading TOC are all generated automatically.

## How to: give a project its own page

Home-page cards live in `portfolio.ts`. A project earns a **dedicated page** at
`/projects/<id>/` only when you add a Markdown file whose name matches the
project `id`:

```
src/content/projects/my-project.md
```

```md
---
title: "My Project"
description: "…"
badges: ["C", "Networking"]     # falls back to the portfolio.ts entry if omitted
links: [{ label: "Source", url: "https://github.com/…" }]
relatedPosts: ["some-post-slug"]
---

Full write-up in Markdown…
```

The matching home card automatically gains a **“Case study →”** link. The card
itself is still authored in `portfolio.ts` — this file only *enriches* it with a
page. (Tradeoff: quick entries stay in one file; only projects that deserve a
long page get a second file, keyed by the same `id`.)

## How to: link a blog post ↔ a project

Links are **bidirectional** and resolved at build time — declare them on either
side (or both; they’re merged and de-duplicated):

- **From the project:** in `portfolio.ts`, set
  `relatedPosts: ["post-slug", …]` on the project.
- **From the post:** in the post’s front matter, set
  `projects: ["project-id", …]`.

Result: the project (card and page) shows **Related writing**, and the post
shows its **Related project(s)**.

---

## Logo / mark

The mark set lives in `src/lib/glyphs.ts`, grouped into families: **Abstract**,
**Greek**, **Initials**, **Monogram** (`jloop`, `cinj`, `cinb`, `jloopcinb`),
**Pixel**, **Figures**, **Systems**, and **Maths**.
Each is pure SVG on a `0 0 100 100` viewBox, monochrome (`currentColor`),
stroke-draw animatable, and legible at favicon size.

The live mark is `cinb` — a monoline **C inscribed in a B** — so the favicons in
`public/favicon.svg` and `public/img/` carry that same geometry.

Preview them side-by-side at **`/logos/`** (`npm run dev`, then visit
`/logos/`; click a tile to replay its draw). That page is **dev-only** — it is
not emitted by `npm run build`, so it never deploys. Choose one by setting
`MARK` in `src/data/site.ts`; it propagates to the navbar, footer, and the
default glyph.

### How to add a mark

Everything is keyed by the same id, in `src/lib/glyphs.ts` — four edits, no
page changes (the `/logos/` grid iterates `GLYPH_GROUPS` automatically):

1. Push the id onto the `GLYPHS` tuple (this defines the `GlyphName` type).
2. Add a display label to `GLYPH_LABELS`.
3. Add the SVG inner markup to `GLYPH_PATHS`.
4. Add the id to a family in `GLYPH_GROUPS` (or add a new family).

Markup conventions: keep art within roughly `15..85`, elements are rendered
with `stroke-width` 9 by `Glyph.astro`. Give stroked elements `class="d"` and
`pathLength="1"` (stroke-draw animation); give filled elements `class="f"` and
`fill="currentColor" stroke="none"` (pop-in animation).

The favicons in `public/favicon.svg` and `public/img/` are hand-authored, not
generated at build time. If you switch `MARK`, redraw them from the new glyph's
path (same geometry as in `glyphs.ts`, centred and scaled into the `92×92`
rounded square) and re-rasterize, e.g.:

```bash
rsvg-convert -w 32  -h 32  public/favicon.svg -o public/img/favicon-32x32.png
rsvg-convert -w 180 -h 180 public/favicon.svg -o public/img/apple-touch-icon.png
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
Astro and publishes `dist/` to GitHub Pages. The custom domain is preserved by
`public/CNAME`; `public/robots.txt` points at the generated `/sitemap.xml`.

## Contact

- **Email:** jesuscblazquez@gmail.com (PGP key at `/jesus.pub`)
- **GitHub:** [jesuscbm](https://github.com/jesuscbm)
- **IRC:** `rotten_egg` on Libera.Chat
