/**
 * ============================================================================
 *  portfolio.ts :: THE single file you edit to update the portfolio.
 * ============================================================================
 *
 *  Everything on the home page (hero, about, experience, education,
 *  achievements, skills, projects, contact) is authored here, in English and
 *  Spanish (Spanish is built but not yet published; see PUBLISHED_LANGS in
 *  src/i18n/index.ts). Interface strings (nav, headings, buttons) are in
 *  src/i18n/ui.ts.
 *
 *  Translations: any text field takes either a plain string (same in every
 *  language, e.g. names, "C++", URLs) or `{ en: "...", es: "..." }`.
 *  Components read the resolved version via `getPortfolio(lang)`.
 *
 *  Inline markup in prose fields: **text** is rendered as a highlight, `text`
 *  as code (see src/lib/rich.ts).
 *
 *  Quick recipes (full docs in README.md):
 *    • Add a job          -> push to `experience[].jobs`
 *    • Add a project      -> push to `projects` (`featured: true` puts it on
 *                            the home page; every project is on /projects/)
 *    • Give a project its own page at /projects/<id>/
 *                          -> create src/content/projects/<id>.md (id must match)
 *    • Link a project <-> a blog post
 *                          -> project side: `relatedPosts: ["<post-slug>"]` below
 *                             post side:    `projects: ["<project-id>"]` in the
 *                                           post's front matter (either direction
 *                                           works; both are merged at build time)
 * ============================================================================
 */
import { localize, type Lang, type Localized, type Text } from "@/i18n";

export interface SocialLink {
  /** Icon key -> see src/components/Icon.astro */
  icon: "github" | "linkedin" | "email" | "rss" | "irc";
  label: string;
  url: string;
}

export interface Job {
  role: Text;
  date: Text;
  summary: Text;
  details?: Text[];
}

export interface Experience {
  company: string;
  companyUrl?: string;
  location?: Text;
  jobs: Job[];
}

export interface EducationItem {
  title: Text;
  school: string;
  schoolUrl?: string;
  date: Text;
  /** Place in the Studies timeline (newest first): the year it ends or ended. */
  year: number;
  summary?: Text;
  /** Shown as a compact list under the entry. */
  courses?: Text[];
}

export interface Achievement {
  title: Text;
  content: Text;
  /** Award year; also its place in the Studies timeline. */
  year: number;
}

export interface SkillGroup {
  name: Text;
  items: Text[];
}

export interface ProjectLink {
  label: Text;
  url: string;
}

export interface Project {
  /** Stable slug. Must match src/content/projects/<id>.md if a page exists. */
  id: string;
  title: Text;
  /** One or two lines, shown on the home card and at the top of each entry. */
  blurb: Text;
  /** Extra detail, shown on the all-projects page. Optional. */
  longDescription?: Text;
  /** Short status line, e.g. "merged upstream". Optional. */
  status?: Text;
  badges: Text[];
  /** Public image path (a matching .webp sibling is used automatically). */
  image?: string;
  links: ProjectLink[];
  /** Blog post slugs related to this project (bidirectional with post's `projects`). */
  relatedPosts?: string[];
  /** Show on the home page. Keep it to about three. */
  featured?: boolean;
}

export interface PortfolioData {
  meta: {
    title: string;
    /** Used as the <title> suffix on the home page. */
    tagline: Text;
    description: Text;
    keywords: string[];
    ogImage: string;
    author: string;
  };
  hero: {
    name: string;
    role: Text;
    tagline: Text;
    cvUrl: string;
  };
  socials: SocialLink[];
  about: {
    /** One or two sentences. Supports **highlight**. */
    intro: Text;
    /** Scannable key facts. Supports **highlight**. */
    highlights: Text[];
    now?: Text;
    /** Extra rows at the top of the skills panel (before `skills`). */
    facts: { key: Text; value: Text }[];
  };
  skills: SkillGroup[];
  experience: Experience[];
  education: EducationItem[];
  achievements: Achievement[];
  projects: Project[];
  contact: {
    intro: Text;
    email: string;
    irc?: Text;
    pgpFingerprint?: string;
    pgpKeyUrl?: string;
    faq?: { q: Text; a: Text }[];
  };
}

export const portfolio: PortfolioData = {
  meta: {
    title: "Jesús Blázquez",
    tagline: {
      en: "CS & Mathematics student",
      es: "Estudiante de Informática y Matemáticas",
    },
    description: {
      en: "Jesús Blázquez, Computer Science and Mathematics student at UAM, based in Spain. Systems programming in C and C++, security research, and mathematics.",
      es: "Jesús Blázquez, estudiante de Ingeniería Informática y Matemáticas en la UAM (España). Programación de sistemas en C y C++, investigación en seguridad y matemáticas.",
    },
    keywords: [
      "Jesús Blázquez",
      "Systems Programming",
      "Security Research",
      "C",
      "C++",
      "Cybersecurity",
      "Mathematics",
      "Portfolio",
    ],
    ogImage: "/img/og.jpg",
    author: "Jesús Blázquez",
  },

  hero: {
    name: "Jesús Blázquez",
    role: {
      en: "CS & Mathematics student · UAM",
      es: "Estudiante de Informática y Matemáticas · UAM",
    },
    tagline: {
      en: "Systems programmer at heart, mathematician by training. I like software close to the hardware and easy to reason about.",
      es: "Programador de sistemas de corazón, matemático de formación. Me gusta el software cerca del hardware y fácil de razonar.",
    },
    cvUrl: "/jesusblazquez_cv.pdf",
  },

  socials: [
    { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/jesuscblazquez" },
    { icon: "github", label: "GitHub", url: "https://github.com/jesuscbm" },
    { icon: "email", label: "Email", url: "mailto:jesuscblazquez@gmail.com" },
  ],

  about: {
    intro: {
      en: "I'm a **student** in the Computer Science and Mathematics double degree at the Universidad Autónoma de Madrid (UAM). I write low-level C and C++, contribute to open source, and do security research.",
      es: "Soy **estudiante** del doble grado en Ingeniería Informática y Matemáticas en la Universidad Autónoma de Madrid (UAM). Programo en C y C++ a bajo nivel, contribuyo a software libre e investigo en seguridad.",
    },
    highlights: [
      {
        en: "**INSAIT research fellow**, one of 15 students picked from 2,800+ applicants. **Found a vulnerability in i2pd** by fuzzing it (CVE ID [CENSORED] pending disclosure).",
        es: "**Beca de investigación en INSAIT**: 15 plazas para más de 2.800 candidaturas. **Encontré una vulnerabilidad en i2pd** mediante fuzzing (CVE ID [CENSORED] pendiente de divulgación).",
      },
      {
        en: "**Code merged into FreeBSD**: C23 floating-point functions in libm, the system math library.",
        es: "**Código integrado en FreeBSD**: funciones de coma flotante de C23 en libm, la biblioteca matemática del sistema.",
      },
      {
        en: "**HTTP/1.1 server from scratch** in C++17, with an epoll event loop and a thread pool: **123k requests/s** in benchmarks.",
        es: "**Servidor HTTP/1.1 desde cero** en C++17, con un bucle de eventos epoll y un pool de hilos: **123 000 peticiones/s** en pruebas de rendimiento.",
      },
      {
        en: "**GPA 9.14/10** and an Academic Excellence Scholarship (2024).",
        es: "**Nota media de 9,14/10** y Beca de Excelencia Académica (2024).",
      },
    ],
    now: {
      en: "Next: Erasmus exchange at TUM (Munich), October 2026 to August 2027.",
      es: "Próximamente: Erasmus en la TUM (Múnich), de octubre de 2026 a agosto de 2027.",
    },
    facts: [
      {
        key: { en: "status", es: "estado" },
        value: { en: "student · UAM, CS + Maths", es: "estudiante · UAM, Informática + Matemáticas" },
      },
      {
        key: { en: "location", es: "ubicación" },
        value: { en: "Spain", es: "España" },
      },
      {
        key: { en: "spoken", es: "idiomas" },
        value: { en: "Spanish (native), English", es: "español (nativo), inglés" },
      },
    ],
  },

  skills: [
    { name: { en: "languages", es: "lenguajes" }, items: ["C++", "C", "Python", "Bash", "Lua", "Java"] },
    {
      name: { en: "systems", es: "sistemas" },
      items: [
        "Linux",
        "epoll",
        { en: "POSIX threads", es: "hilos POSIX" },
        { en: "memory management", es: "gestión de memoria" },
        { en: "networking", es: "redes" },
        "Docker",
      ],
    },
    {
      name: { en: "security", es: "seguridad" },
      items: [
        "fuzzing",
        { en: "vulnerability research", es: "investigación de vulnerabilidades" },
        { en: "memory safety", es: "seguridad de memoria" },
      ],
    },
    { name: { en: "tooling", es: "herramientas" }, items: ["GDB", "Valgrind", "AddressSanitizer", "Make/CMake", "Git", "Neovim"] },
    {
      name: { en: "maths", es: "matemáticas" },
      items: [
        { en: "numerical analysis", es: "análisis numérico" },
        { en: "linear algebra", es: "álgebra lineal" },
        { en: "probability", es: "probabilidad" },
      ],
    },
  ],

  experience: [
    {
      company: "INSAIT",
      companyUrl: "https://insait.ai/surfers-2026/",
      location: { en: "Sofia, Bulgaria", es: "Sofía, Bulgaria" },
      jobs: [
        {
          role: { en: "Summer Research Fellow · SURF 2026", es: "Beca de investigación de verano · SURF 2026" },
          date: { en: "June – August 2026", es: "Junio – agosto 2026" },
          summary: {
            en: "One of 15 students selected from 2,800+ applicants to research the security of the I2P anonymity network.",
            es: "Selección entre más de 2.800 candidaturas (15 plazas) para investigar la seguridad de la red de anonimato I2P.",
          },
          details: [
            {
              en: "Fuzzed the multi-threaded C++ i2pd codebase; diagnosed memory corruption, race conditions and leaks with GDB, Valgrind and AddressSanitizer.",
              es: "Fuzzing del código de i2pd (C++ multihilo); diagnóstico de corrupción de memoria, condiciones de carrera y fugas con GDB, Valgrind y AddressSanitizer.",
            },
            {
              en: "Found a vulnerability in i2pd (CVE ID [CENSORED]); technical details [CENSORED] pending coordinated disclosure.",
              es: "Hallazgo de una vulnerabilidad en i2pd (CVE ID [CENSORED]); detalles técnicos [CENSORED] pendientes de divulgación coordinada.",
            },
            {
              en: "Supervised by Dr. David Basin and Ms. Nadia Markova; paper under submission (venue [CENSORED] pending review).",
              es: "Bajo la supervisión del Dr. David Basin y Nadia Markova; artículo enviado (venue [CENSORED] pending review).",
            },
          ],
        },
      ],
    },
  ],

  education: [
    {
      title: {
        en: "Double Degree in Computer Science and Mathematics",
        es: "Doble Grado en Ingeniería Informática y Matemáticas",
      },
      school: "Universidad Autónoma de Madrid",
      schoolUrl: "https://www.uam.es/",
      date: { en: "Expected 2028", es: "Fin previsto: 2028" },
      year: 2028,
      summary: {
        en: "GPA 9.14/10. Distinctions in Computer Architecture (2026) and Data Structures (2024).",
        es: "Nota media 9,14/10. Matrícula de Honor en Arquitectura de Computadores (2026) y Estructuras de Datos (2024).",
      },
      courses: [
        { en: "Operating Systems", es: "Sistemas Operativos" },
        { en: "Computer Architecture", es: "Arquitectura de Computadores" },
        { en: "Algorithm Design", es: "Diseño de Algoritmos" },
        { en: "Networks", es: "Redes" },
        { en: "Numerical Analysis", es: "Análisis Numérico" },
        { en: "Linear Algebra", es: "Álgebra Lineal" },
      ],
    },
    {
      title: { en: "Erasmus Exchange in Computer Science", es: "Erasmus en Informática" },
      school: "Technical University of Munich (TUM)",
      schoolUrl: "https://www.tum.de/en/",
      date: { en: "Oct 2026 – Aug 2027", es: "Oct 2026 – ago 2027" },
      year: 2027,
      summary: {
        en: "Planned courses: Computer Systems, High Performance Computing, Cybersecurity, Artificial Intelligence.",
        es: "Asignaturas previstas: Sistemas de Computadores, Computación de Altas Prestaciones, Ciberseguridad, Inteligencia Artificial.",
      },
    },
    {
      title: "Sino-Euro Spring School 2026",
      school: "Northwestern Polytechnical University (NPU)",
      schoolUrl: "https://en.nwpu.edu.cn/",
      date: { en: "April 2026", es: "Abril 2026" },
      year: 2026,
      summary: {
        en: "Selected by GPA for a 10-day program at NPU in Xi'an, with a course on the foundations and applications of large language models.",
        es: "Selección por expediente para un programa de 10 días en la NPU (Xi'an), con un curso sobre fundamentos y aplicaciones de los grandes modelos de lenguaje.",
      },
    },
    {
      title: { en: "Professional Degree in Music (Oboe)", es: "Grado Profesional de Música (Oboe)" },
      school: "Conservatorio Tomás de Torrejón y Velasco",
      date: "2013 – 2023",
      year: 2023,
      summary: {
        en: "Ten years of conservatory training in oboe.",
        es: "Diez años de conservatorio, especialidad de oboe.",
      },
    },
  ],

  achievements: [
    {
      title: { en: "Academic Excellence Scholarship", es: "Beca de Excelencia Académica" },
      year: 2024,
      content: {
        en: "Awarded by the Community of Madrid and UAM to the students with the highest grades.",
        es: "Concedida por la Comunidad de Madrid y la UAM a los mejores expedientes.",
      },
    },
    {
      title: { en: "Regional Mathematical Olympiads", es: "Olimpiadas Matemáticas regionales" },
      year: 2018,
      content: {
        en: "Silver medal (Albacete) and bronze medal (Castilla-La Mancha).",
        es: "Medalla de plata (Albacete) y medalla de bronce (Castilla-La Mancha).",
      },
    },
  ],

  // Featured projects appear on the home page in this order; /projects/ lists
  // every project, featured ones first.
  projects: [
    {
      id: "posthaste",
      title: { en: "POSTHaste HTTP server", es: "Servidor HTTP POSTHaste" },
      blurb: {
        en: "A zero-dependency HTTP/1.1 server written from scratch in C++17, benchmarked at 123k requests/s.",
        es: "Un servidor HTTP/1.1 sin dependencias, escrito desde cero en C++17, con 123 000 peticiones/s en pruebas de rendimiento.",
      },
      longDescription: {
        en: "Reactor pattern on an edge-triggered epoll loop, a bounded lock-free MPMC queue, and a worker thread pool, serving a Pastebin-style app. The write-up covers the architecture and a response-framing bug that only appeared behind Nginx.",
        es: "Patrón Reactor sobre un bucle epoll edge-triggered, una cola MPMC lock-free acotada y un pool de hilos, sirviendo una aplicación tipo Pastebin. El artículo explica la arquitectura y un fallo de enmarcado de respuestas que solo aparecía detrás de Nginx.",
      },
      image: "/img/projects/posthaste.png",
      badges: ["C++17", "epoll", "Lock-Free", { en: "Networking", es: "Redes" }],
      links: [{ label: { en: "Source", es: "Código" }, url: "https://github.com/jesuscbm/posthaste" }],
      relatedPosts: ["architecturing_an_http_server"],
      featured: true,
    },
    {
      id: "freebsd-libm",
      title: { en: "FreeBSD libm contributions", es: "Contribuciones a libm de FreeBSD" },
      blurb: {
        en: "C23 floating-point functions merged upstream into FreeBSD's system math library.",
        es: "Funciones de coma flotante de C23 integradas en la biblioteca matemática de FreeBSD.",
      },
      longDescription: {
        en: "The C23 fmaximum/fminimum function families, with man pages and ATF tests, handling NaN propagation and signed zeros as the standard requires.",
        es: "Las familias de funciones fmaximum/fminimum de C23, con páginas de manual y tests ATF, tratando la propagación de NaN y los ceros con signo como exige el estándar.",
      },
      status: { en: "merged upstream", es: "integrado en FreeBSD" },
      image: "/img/projects/freebsd.jpg",
      badges: ["C", "FreeBSD", "IEEE 754", { en: "Open Source", es: "Software libre" }],
      links: [
        {
          label: "Commits",
          url: "https://github.com/freebsd/freebsd-src/commits/main/?author=jesuscbm",
        },
      ],
      relatedPosts: ["freebsd_libm"],
      featured: true,
    },
    {
      id: "i2pd-cve",
      title: { en: "i2pd vulnerability research", es: "Investigación de vulnerabilidades en i2pd" },
      blurb: {
        en: "Found a vulnerability in i2pd (CVE ID [CENSORED]) by fuzzing it during my INSAIT research fellowship.",
        es: "Vulnerabilidad en i2pd (CVE ID [CENSORED]) encontrada mediante fuzzing durante la beca de investigación en INSAIT.",
      },
      longDescription: {
        en: "Technical details [CENSORED] pending coordinated disclosure; the paper is under submission (venue [CENSORED] pending review).",
        es: "Detalles técnicos [CENSORED] pendientes de divulgación coordinada; el artículo está enviado (venue [CENSORED] pending review).",
      },
      status: { en: "pending disclosure", es: "pendiente de divulgación" },
      badges: ["I2P", "C++", "Fuzzing", { en: "Security Research", es: "Seguridad" }],
      links: [],
      featured: true,
    },
    {
      id: "memory-allocator",
      title: { en: "malloc from scratch", es: "malloc desde cero" },
      blurb: {
        en: "A drop-in malloc/free/realloc in C, written to learn how the heap works.",
        es: "Un malloc/free/realloc intercambiable en C, escrito para entender cómo funciona el heap.",
      },
      longDescription: {
        en: "Covers heap layout, free-list management, and fragmentation.",
        es: "Organización del heap, gestión de listas libres y fragmentación.",
      },
      image: "/img/projects/alloc.png",
      badges: ["C", { en: "Memory Management", es: "Gestión de memoria" }],
      links: [{ label: { en: "Source", es: "Código" }, url: "https://github.com/jesuscbm/memory-allocator" }],
    },
    {
      id: "sorting-visualizer",
      title: { en: "Sorting visualizer", es: "Visualizador de ordenación" },
      blurb: {
        en: "Real-time visualization of sorting algorithms such as QuickSort, in C and SDL3.",
        es: "Visualización en tiempo real de algoritmos de ordenación como QuickSort, en C y SDL3.",
      },
      longDescription: {
        en: "Sorting runs on POSIX threads so the UI stays responsive while it renders.",
        es: "La ordenación corre en hilos POSIX para que la interfaz siga respondiendo mientras se dibuja.",
      },
      badges: ["C", "SDL3", { en: "Concurrency", es: "Concurrencia" }],
      links: [{ label: { en: "Source", es: "Código" }, url: "https://github.com/jesuscbm/sorting_visualizer" }],
    },
    {
      id: "homelab",
      title: { en: "Self-hosted Linux infrastructure", es: "Infraestructura Linux autoalojada" },
      blurb: {
        en: "An always-on homelab: Docker services behind reverse proxies and VPNs.",
        es: "Un homelab siempre encendido: servicios en Docker detrás de proxies inversos y VPN.",
      },
      longDescription: {
        en: "Where I practice networking and system administration on infrastructure I depend on.",
        es: "Donde practico redes y administración de sistemas con infraestructura que uso a diario.",
      },
      image: "/img/projects/homelab.png",
      badges: ["Linux", "Docker", { en: "Networking", es: "Redes" }],
      links: [],
    },
    {
      id: "dos-workshop",
      title: { en: "DoS workshop lab", es: "Laboratorio de un taller de DoS" },
      blurb: {
        en: "A containerized lab for practicing and analyzing Layer 7 denial-of-service attacks.",
        es: "Un laboratorio en contenedores para practicar y analizar ataques de denegación de servicio de capa 7.",
      },
      longDescription: {
        en: "Reproducible Docker setup for studying application-layer attacks and their mitigations safely.",
        es: "Entorno Docker reproducible para estudiar ataques a nivel de aplicación y sus mitigaciones sin riesgo.",
      },
      image: "/img/projects/dosworkshop.jpeg",
      badges: ["Docker", { en: "Networking", es: "Redes" }, { en: "Security", es: "Seguridad" }],
      links: [{ label: { en: "Source", es: "Código" }, url: "https://github.com/jesuscbm/dos-workshop" }],
    },
  ],

  contact: {
    intro: {
      en: "If you want to talk about systems programming, security research, or open source, email me. I'm also on Libera.Chat.",
      es: "Si quieres hablar de programación de sistemas, investigación en seguridad o software libre, escríbeme. También estoy en Libera.Chat.",
    },
    email: "jesuscblazquez@gmail.com",
    irc: { en: "rotten_egg on Libera.Chat", es: "rotten_egg en Libera.Chat" },
    pgpFingerprint: "1BC8 3469 6F33 43B0 7B8C 260C 549B 97A5 8FB2 EBB4",
    pgpKeyUrl: "/jesus.pub",
    faq: [
      {
        q: { en: "What are you looking for?", es: "¿Qué buscas?" },
        a: {
          en: "Opportunities in systems engineering and security research.",
          es: "Oportunidades en ingeniería de sistemas e investigación en seguridad.",
        },
      },
      {
        q: { en: "How should I reach you securely?", es: "¿Cómo te escribo de forma segura?" },
        a: {
          en: "Email me and encrypt with the PGP key above. The fingerprint is listed so you can verify it out of band.",
          es: "Escríbeme cifrando con la clave PGP de arriba. La huella está a la vista para que puedas verificarla por otro canal.",
        },
      },
    ],
  },
};

export type Portfolio = Localized<PortfolioData>;
export type LocalizedProject = Portfolio["projects"][number];

const cache = new Map<Lang, Portfolio>();

/** The portfolio with every text field resolved to `lang`. */
export function getPortfolio(lang: Lang): Portfolio {
  let p = cache.get(lang);
  if (!p) cache.set(lang, (p = localize(portfolio, lang)));
  return p;
}

export default portfolio;
