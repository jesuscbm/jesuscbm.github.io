/**
 * Languages, localized paths, and localized data.
 *
 * English is the default and lives at the root (so every existing URL, like
 * /blogs/<slug>/, is unchanged). Spanish lives under /es/. Only the pages in
 * TRANSLATED exist in both languages; blog posts, tags and case studies are
 * English-only.
 */

export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

/**
 * Languages offered to visitors and search engines (language switcher,
 * hreflang, sitemap). A language missing here still builds under /<lang>/ so
 * it can be previewed, but nothing links to it and it is marked noindex.
 * Spanish is parked until the translation is reviewed: add "es" to publish it.
 */
export const PUBLISHED_LANGS: readonly Lang[] = ["en"];
export const isPublished = (lang: Lang) => PUBLISHED_LANGS.includes(lang);

export const LANG_META: Record<
  Lang,
  { name: string; short: string; og: string; intl: string }
> = {
  en: { name: "English", short: "EN", og: "en_US", intl: "en-US" },
  es: { name: "Español", short: "ES", og: "es_ES", intl: "es-ES" },
};

/** Resolve Astro.currentLocale (undefined outside i18n routes) to a Lang. */
export function getLang(locale: string | undefined): Lang {
  return (LANGS as readonly string[]).includes(locale ?? "")
    ? (locale as Lang)
    : DEFAULT_LANG;
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

/** English paths that also exist under /es/. */
const TRANSLATED = new Set(["/", "/projects/", "/blogs/"]);

/** `path` is the English, root-relative path with a trailing slash. */
export function localePath(lang: Lang, path = "/"): string {
  return lang === DEFAULT_LANG ? path : `/${lang}${path}`;
}

/** The English path of any page (strips a /es prefix). */
export function basePath(pathname: string): string {
  for (const l of LANGS) {
    if (l === DEFAULT_LANG) continue;
    if (pathname === `/${l}` || pathname === `/${l}/`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export function isTranslated(pathname: string): boolean {
  return TRANSLATED.has(basePath(pathname));
}

/**
 * Where the language switcher sends someone. English-only pages fall back to
 * the closest translated section (a post -> the Spanish blog index, etc.).
 */
export function switchPath(pathname: string, to: Lang): string {
  const base = basePath(pathname);
  if (to === DEFAULT_LANG || TRANSLATED.has(base)) return localePath(to, base);
  if (base.startsWith("/blogs/") || base.startsWith("/tags/"))
    return localePath(to, "/blogs/");
  if (base.startsWith("/projects/")) return localePath(to, "/projects/");
  return localePath(to, "/");
}

// ---------------------------------------------------------------------------
// Localized data
// ---------------------------------------------------------------------------

/** A value given once per language. */
export type I18n<T = string> = { [L in Lang]: T };

/** Text that differs by language, or a plain string shared by all of them. */
export type Text = string | I18n;

/** `T` with every I18n<U> replaced by U. */
export type Localized<T> =
  T extends I18n<infer U>
    ? U
    : T extends readonly (infer E)[]
      ? Localized<E>[]
      : T extends object
        ? { [K in keyof T]: Localized<T[K]> }
        : T;

function isI18n(v: unknown): v is I18n<unknown> {
  if (typeof v !== "object" || v === null || Array.isArray(v)) return false;
  const keys = Object.keys(v);
  return keys.length === LANGS.length && LANGS.every((l) => keys.includes(l));
}

/** Deep-resolve every I18n value in `value` to `lang`. */
export function localize<T>(value: T, lang: Lang): Localized<T> {
  if (isI18n(value)) return value[lang] as Localized<T>;
  if (Array.isArray(value))
    return value.map((v) => localize(v, lang)) as Localized<T>;
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localize(v, lang)]),
    ) as Localized<T>;
  return value as Localized<T>;
}
