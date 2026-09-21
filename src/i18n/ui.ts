/**
 * Interface strings (navigation, headings, buttons, labels). Portfolio content
 * itself lives in src/data/portfolio.ts. `es` must have exactly the same keys
 * as `en`; TypeScript flags anything missing.
 */
import { LANG_META, type Lang } from "@/i18n";

const en = {
  skip: "Skip to content",
  nav: {
    primary: "Primary",
    mobile: "Menu",
    home: "Home, Jesús Blázquez",
    about: "About",
    work: "Experience",
    projects: "Projects",
    writing: "Writing",
    contact: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    theme: "Dark theme",
    language: "Language",
  },
  hero: {
    label: "Introduction",
    intro: "Hi, I'm",
    location: "Based in Spain",
    cv: "Read the CV",
    work: "View projects",
    socials: "Social links",
    scroll: "Scroll to content",
    pause: "Pause animation",
    play: "Play animation",
  },
  about: {
    eyebrow: "about",
    title: "About",
    highlights: "Highlights",
    fetch: "Skills and background",
  },
  experience: {
    eyebrow: "experience",
    title: "Where I've worked",
  },
  projects: {
    eyebrow: "projects",
    title: "Selected projects",
    lede: "Three I would show first. The rest are on their own page.",
    all: "All projects",
    allTitle: "All projects",
    allLede:
      "Everything I have built or broken, including the smaller projects. Starred entries are the ones on the home page.",
    featured: "featured",
    writeup: "Write-up",
    caseStudy: "Case study",
    backHome: "Home",
  },
  education: {
    eyebrow: "education",
    title: "Studies & awards",
    courses: "Courses",
    award: "award",
  },
  writing: {
    eyebrow: "git log --author=jesus",
    title: "Writing",
    all: "All posts",
    draft: "draft",
    englishOnly: "",
  },
  blog: {
    eyebrow: "writing",
    title: "Notes & write-ups",
    lede: "Long-form posts on systems programming, security research, and the projects behind them.",
    tags: "Tags",
    empty: "No posts published yet.",
    read: "read",
  },
  contact: {
    eyebrow: "contact",
    title: "Contact",
    faq: "Good to know",
    copy: "copy",
    copied: "copied",
    copyLabel: "Copy PGP fingerprint",
    publicKey: "public key",
  },
  footer: {
    tagline: "Systems · Security · Mathematics",
    socials: "Social links",
    rss: "RSS feed",
    built: "static site · deployed on GitHub Pages",
  },
};

export type UI = typeof en;

const es: UI = {
  skip: "Saltar al contenido",
  nav: {
    primary: "Principal",
    mobile: "Menú",
    home: "Inicio, Jesús Blázquez",
    about: "Sobre mí",
    work: "Experiencia",
    projects: "Proyectos",
    writing: "Artículos",
    contact: "Contacto",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    theme: "Tema oscuro",
    language: "Idioma",
  },
  hero: {
    label: "Presentación",
    intro: "Hola, soy",
    location: "Vivo en España",
    cv: "Ver el CV (en inglés)",
    work: "Ver proyectos",
    socials: "Redes",
    scroll: "Ir al contenido",
    pause: "Pausar animación",
    play: "Reanudar animación",
  },
  about: {
    eyebrow: "sobre mí",
    title: "Sobre mí",
    highlights: "Lo más destacado",
    fetch: "Habilidades y formación",
  },
  experience: {
    eyebrow: "experiencia",
    title: "Dónde he trabajado",
  },
  projects: {
    eyebrow: "proyectos",
    title: "Proyectos destacados",
    lede: "Los tres que enseñaría primero. El resto está en su propia página.",
    all: "Todos los proyectos",
    allTitle: "Todos los proyectos",
    allLede:
      "Todo lo que he construido o roto, incluidos los proyectos pequeños. Los marcados con estrella son los de la portada.",
    featured: "destacado",
    writeup: "Artículo (en inglés)",
    caseStudy: "Caso de estudio",
    backHome: "Inicio",
  },
  education: {
    eyebrow: "formación",
    title: "Estudios y premios",
    courses: "Asignaturas",
    award: "premio",
  },
  writing: {
    eyebrow: "git log --author=jesus",
    title: "Artículos",
    all: "Todos los artículos",
    draft: "borrador",
    englishOnly: "Los artículos están escritos en inglés.",
  },
  blog: {
    eyebrow: "artículos",
    title: "Notas y artículos",
    lede: "Artículos largos sobre programación de sistemas, investigación en seguridad y los proyectos que hay detrás.",
    tags: "Etiquetas",
    empty: "Todavía no hay artículos publicados.",
    read: "leer",
  },
  contact: {
    eyebrow: "contacto",
    title: "Contacto",
    faq: "Conviene saber",
    copy: "copiar",
    copied: "copiado",
    copyLabel: "Copiar la huella PGP",
    publicKey: "clave pública",
  },
  footer: {
    tagline: "Sistemas · Seguridad · Matemáticas",
    socials: "Redes",
    rss: "Feed RSS",
    built: "sitio estático · publicado en GitHub Pages",
  },
};

const ui: Record<Lang, UI> = { en, es };

export function getUI(lang: Lang): UI {
  return ui[lang];
}

/** Date formatter for post dates in the given language. */
export function dateFormat(
  lang: Lang,
  opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" },
): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(LANG_META[lang].intl, opts);
}
