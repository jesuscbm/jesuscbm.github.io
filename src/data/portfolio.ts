/**
 * ============================================================================
 *  portfolio.ts :: THE single file you edit to update the portfolio.
 * ============================================================================
 *
 *  Everything on the home page (hero, about, experience, education,
 *  achievements, skills, project cards, contact) is authored here. It is a
 *  typed module, so your editor will flag typos and missing fields.
 *
 *  Quick recipes (full docs in README.md):
 *    • Add a job          -> push to `experience[].jobs`
 *    • Add a project card -> push to `projects`
 *    • Give a project its own page at /projects/<id>/
 *                          -> create src/content/projects/<id>.md (id must match)
 *    • Link a project <-> a blog post
 *                          -> project side: `relatedPosts: ["<post-slug>"]` below
 *                             post side:    `projects: ["<project-id>"]` in the
 *                                           post's front matter (either direction
 *                                           works; both are merged at build time)
 * ============================================================================
 */

export interface SocialLink {
  /** Icon key -> see src/components/Icon.astro */
  icon: "github" | "linkedin" | "email" | "rss" | "irc";
  label: string;
  url: string;
}

export interface Job {
  role: string;
  date: string;
  /** One-line summary shown collapsed. */
  summary: string;
  /** Bullet details revealed when the entry is expanded. Optional. */
  details?: string[];
}

export interface Experience {
  company: string;
  companyUrl?: string;
  location?: string;
  jobs: Job[];
}

export interface EducationItem {
  title: string;
  school: string;
  schoolUrl?: string;
  date: string;
  summary?: string;
  /** Focus areas revealed when expanded. */
  focus?: string[];
}

export interface Achievement {
  title: string;
  content: string;
  year?: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  /** Stable slug. Must match src/content/projects/<id>.md if a page exists. */
  id: string;
  title: string;
  /** Short blurb shown on the card face. */
  blurb: string;
  /** Longer description revealed when the card expands. Optional. */
  longDescription?: string;
  badges: string[];
  /** Public image path (a matching .webp sibling is used automatically). */
  image?: string;
  links: ProjectLink[];
  /** Blog post slugs related to this project (bidirectional with post's `projects`). */
  relatedPosts?: string[];
  /** Highlight this project (larger card / first row). */
  featured?: boolean;
}

export interface Portfolio {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    author: string;
  };
  hero: {
    intro: string;
    name: string;
    roles: string[];
    tagline: string;
    cta: { label: string; url: string };
  };
  socials: SocialLink[];
  about: {
    heading: string;
    paragraphs: string[];
    now?: string;
  };
  skills: SkillGroup[];
  experience: Experience[];
  education: EducationItem[];
  achievements: Achievement[];
  projects: Project[];
  contact: {
    heading: string;
    intro: string;
    email: string;
    irc?: string;
    pgpFingerprint?: string;
    pgpKeyUrl?: string;
    faq?: { q: string; a: string }[];
  };
}

export const portfolio: Portfolio = {
  meta: {
    title: "Jesús Blázquez",
    description:
      "Systems programming, security research, and mathematics. The portfolio of Jesús Blázquez.",
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
    intro: "Hi, I am",
    name: "Jesús Blázquez",
    // Rotated by the hero animation; the first is the static/no-JS fallback.
    roles: [
      "Systems Programmer",
      "CS & Mathematics Student",
      "Security Researcher",
    ],
    tagline:
      "I build things at the low level: memory allocators, network servers, and the protocols underneath. When I break something, it is (usually) on purpose.",
    cta: { label: "Read the CV", url: "/jesusblazquez_cv.pdf" },
  },

  socials: [
    { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/jesuscblazquez" },
    { icon: "github", label: "GitHub", url: "https://github.com/jesuscbm" },
    { icon: "email", label: "Email", url: "mailto:jesuscblazquez@gmail.com" },
  ],

  about: {
    heading: "About",
    paragraphs: [
      "I am a Computer Science and Mathematics student at the Universidad Autónoma de Madrid (UAM), working at the intersection of low-level systems programming, open-source development, and security research.",
      "At INSAIT I fuzzed the I2P anonymity network and found a vulnerability in i2pd (CVE ID [CENSORED] pending disclosure), and I am co-authoring the resulting security research (under submission). I also contribute floating-point arithmetic to FreeBSD's libm and build networking, memory-management, and HTTP tooling from scratch in C and C++.",
      "I am looking for opportunities in security research and systems engineering, where rigor in low-level code and mathematics both matter.",
    ],
    now: "Currently: pushing C23 float routines into FreeBSD libm and writing up my I2P vulnerability research (venue [CENSORED] pending review).",
  },

  skills: [
    { name: "Languages", items: ["C", "C++", "Python", "Java", "Lua", "Bash"] },
    { name: "Systems", items: ["Linux", "Memory Management", "Networking", "Concurrency", "epoll", "Lock-Free"] },
    { name: "Security", items: ["Fuzzing", "Vulnerability Research", "Memory Safety", "Applied Cryptography"] },
    { name: "Mathematics", items: ["Numerical Calculus", "Applied Mathematics", "Algorithms"] },
    { name: "Tooling", items: ["GDB", "Valgrind", "Docker", "Git", "Reverse Proxies"] },
  ],

  experience: [
    {
      company: "INSAIT",
      companyUrl: "https://insait.ai/surfers-2026/",
      location: "Sofia, Bulgaria",
      jobs: [
        {
          role: "Research Fellow :: SURF 2026",
          date: "June – August 2026",
          summary:
            "Selected for the SURF program to research vulnerabilities in the I2P anonymity protocol.",
          details: [
            "Fuzzed the C++ i2pd implementation and found a vulnerability in i2pd (CVE ID [CENSORED]); technical details [CENSORED] pending coordinated disclosure.",
            "Supervised by Dr. David Basin and Ms. Nadia Markova; co-authoring a paper under submission (venue [CENSORED] pending review).",
          ],
        },
      ],
    },
  ],

  education: [
    {
      title: "Double Degree in Computer Science and Mathematics",
      school: "Universidad Autónoma de Madrid",
      schoolUrl: "https://www.uam.es/",
      date: "Present",
      summary: "Dual-degree program combining CS systems foundations with rigorous mathematics.",
      focus: [
        "Data Structures and Algorithms",
        "Memory Management and Systems Architecture",
        "Applied Mathematics",
      ],
    },
    {
      title: "Professional Degree in Music (Oboe)",
      school: "Conservatorio Tomás de Torrejón y Velasco",
      date: "2013 – 2023",
      summary:
        "A 10-year degree demonstrating high-level discipline, performance under pressure, and long-term commitment.",
    },
  ],

  achievements: [
    {
      title: "Regional Mathematical Olympiads",
      year: "2018",
      content:
        "Silver Medal (Albacete) and Bronze Medal (Castilla-La Mancha) in regional mathematical competitions.",
    },
    {
      title: "Academic Excellence Scholarship",
      year: "2024",
      content:
        "Awarded by the Community of Madrid and UAM for maintaining a GPA within the top percentile of the cohort.",
    },
  ],

  // Ordered systems-first. The i2pd CVE work is the security standout, kept
  // prominent via `featured` rather than by leading the list.
  projects: [
    {
      id: "posthaste",
      title: "POSTHaste HTTP server",
      blurb:
        "A multithreaded Pastebin-style service on a custom HTTP/1.1 stack written from scratch in C.",
      longDescription:
        "A from-scratch HTTP/1.1 library and server: an epoll reactor, a bounded lock-free MPMC queue, and a worker thread pool. The write-up covers the architecture and a subtle response-framing bug that only appeared behind Nginx.",
      image: "/img/projects/posthaste.png",
      badges: ["C", "epoll", "Lock-Free", "Networking"],
      links: [{ label: "Source", url: "https://github.com/jesuscbm/posthaste" }],
      relatedPosts: ["architecturing_an_http_server"],
      featured: true,
    },
    {
      id: "freebsd-libm",
      title: "FreeBSD libm contributions",
      blurb: "Upstream C23 floating-point routines for FreeBSD's system math library.",
      longDescription:
        "Upstream contributions to FreeBSD's math library, implementing C23 floating-point routines with attention to correctness across rounding modes and edge cases.",
      image: "/img/projects/freebsd.jpg",
      badges: ["C", "FreeBSD", "Numerics", "Open Source"],
      links: [
        {
          label: "Commits",
          url: "https://github.com/freebsd/freebsd-src/commits/main/?author=jesuscbm",
        },
      ],
    },
    {
      id: "memory-allocator",
      title: "malloc from scratch",
      blurb:
        "A drop-in dynamic allocator in C, built to understand the heap from the metadata up.",
      longDescription:
        "A drop-in dynamic memory allocator implementing the malloc/free/realloc interface, written to understand heap layout, free-list strategies, and fragmentation from first principles.",
      image: "/img/projects/alloc.png",
      badges: ["C", "Memory Management", "Systems"],
      links: [{ label: "Source", url: "https://github.com/jesuscbm/memory-allocator" }],
    },
    {
      id: "i2pd-cve",
      title: "i2pd vulnerability research (CVE ID [CENSORED])",
      blurb:
        "Found a vulnerability in i2pd (CVE ID [CENSORED]) during a fuzzing fellowship at INSAIT.",
      longDescription:
        "Research from my INSAIT fellowship: found a vulnerability in i2pd (CVE ID [CENSORED]) by fuzzing the C++ i2pd codebase. Technical details [CENSORED] pending coordinated disclosure; co-authoring the paper under submission (venue [CENSORED] pending review).",
      badges: ["I2P", "C++", "Fuzzing", "Security Research"],
      links: [],
      featured: true,
    },
    {
      id: "homelab",
      title: "Self-hosted Linux infrastructure",
      blurb:
        "An always-on homelab: Docker services behind reverse proxies and VPNs, run as a networking practice ground.",
      longDescription:
        "An always-on homelab where I run services behind reverse proxies and VPNs, manage containers, and treat my own infrastructure as a practice ground for networking and systems administration.",
      image: "/img/projects/homelab.png",
      badges: ["Linux", "Docker", "Networking", "SysAdmin"],
      links: [],
    },
    {
      id: "dos-workshop",
      title: "DoS workshop laboratory",
      blurb: "A containerized lab for practicing and analyzing Layer 7 network attacks.",
      longDescription:
        "A Docker-based lab for hands-on study of application-layer denial-of-service techniques and their mitigations, in a safe, reproducible environment.",
      image: "/img/projects/dosworkshop.jpeg",
      badges: ["Docker", "Networking", "Security"],
      links: [{ label: "Source", url: "https://github.com/jesuscbm/dos-workshop" }],
    },
  ],

  contact: {
    heading: "Contact",
    intro:
      "If you want to discuss systems programming, security research, or open-source projects, feel free to reach out. You can also find me on Libera.Chat.",
    email: "jesuscblazquez@gmail.com",
    irc: "rotten_egg on Libera.Chat",
    pgpFingerprint: "1BC8 3469 6F33 43B0 7B8C 260C 549B 97A5 8FB2 EBB4",
    pgpKeyUrl: "/jesus.pub",
    faq: [
      {
        q: "What are you looking for?",
        a: "Roles in systems engineering and security research, anywhere rigor in low-level code and mathematics both matter.",
      },
      {
        q: "How should I reach you securely?",
        a: "Email me and encrypt with the PGP key above; the fingerprint is listed so you can verify it out of band.",
      },
    ],
  },
};

export default portfolio;
