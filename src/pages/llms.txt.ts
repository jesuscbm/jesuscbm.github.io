import type { APIContext } from "astro";
import { portfolio } from "@/data/portfolio";
import { getPublishedPosts, postPath } from "@/lib/blog";

// /llms.txt — a Markdown overview for LLMs / AI crawlers (the llms.txt
// convention). Generated at build time so it stays in sync with the content.
export async function GET(context: APIContext) {
  const site = (context.site ?? new URL("https://www.jesusblazquez.eu")).origin;
  const posts = await getPublishedPosts();
  const p = portfolio;
  const L: string[] = [];

  L.push(`# ${p.meta.title}`, "");
  L.push(`> ${p.meta.description}`, "");
  for (const par of p.about.paragraphs) L.push(par, "");

  if (posts.length) {
    L.push("## Writing", "");
    for (const post of posts) {
      const d = post.data.description ? `: ${post.data.description}` : "";
      L.push(`- [${post.data.title}](${site}${postPath(post)})${d}`);
    }
    L.push("");
  }

  L.push("## Projects", "");
  for (const proj of p.projects) {
    L.push(`- ${proj.title}: ${proj.blurb}`);
  }
  L.push("");

  L.push("## Links", "");
  L.push(`- [Home](${site}/)`);
  L.push(`- [Blog](${site}/blogs/)`);
  L.push(`- [CV (PDF)](${site}${p.hero.cta.url})`);
  if (p.contact.pgpKeyUrl) L.push(`- [PGP public key](${site}${p.contact.pgpKeyUrl})`);
  for (const s of p.socials) L.push(`- [${s.label}](${s.url})`);
  L.push(`- [RSS feed](${site}/index.xml)`);
  L.push("");

  L.push("## Contact", "");
  L.push(`- Email: ${p.contact.email}`);
  if (p.contact.irc) L.push(`- IRC: ${p.contact.irc}`);
  if (p.contact.pgpFingerprint) L.push(`- PGP fingerprint: ${p.contact.pgpFingerprint}`);
  L.push("");

  return new Response(L.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
