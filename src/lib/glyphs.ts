/**
 * Marks, in four families:
 *   - Abstract: pure geometry (overlapping primitives, symmetry, negative space)
 *   - Greek:    letterforms as conceptual maths/physics marks
 *   - Pixel:    grid-of-squares / pixel-art motifs
 *   - Figures:  named geometric figures (fractal, isometric, topological, ...)
 *
 * Each entry is SVG inner markup on a 0..100 viewBox, monochrome (currentColor),
 * legible at 16px, and stroke-draw animatable. `pathLength="1"` normalizes
 * stroked shapes so one CSS rule draws them all; class "f" elements are filled
 * and pop in, class "d" strokes draw on.
 */

export const GLYPH_GROUPS: { title: string; names: GlyphName[] }[] = [
  {
    title: "Abstract",
    names: [
      "triad",
      "orbit",
      "vesica",
      "compass",
      "rhombus",
      "windmill",
      "triquetra",
      "arcs",
      "rings",
      "splitdisc",
      "slashes",
      "fold",
      "link",
      "module",
    ],
  },
  {
    title: "Greek",
    names: ["phi", "psi", "omega", "sigma", "lambda", "pi", "theta", "delta", "xi"],
  },
  {
    title: "Initials",
    names: ["j", "c", "b", "jb", "cb", "jcb"],
  },
  {
    title: "Monogram",
    names: ["jloop", "cinj", "cinb", "jloopcinb", "jbs"],
  },
  {
    title: "Pixel",
    names: ["glider", "invader", "checker", "ramp"],
  },
  {
    title: "Figures",
    names: ["sierpinski", "cube", "pentagon", "annulus", "spirograph"],
  },
  {
    title: "Systems",
    names: ["stack", "syscall", "pointer"],
  },
  {
    title: "Maths",
    names: ["integral", "infinity", "matrix"],
  },
  {
    title: "Experiments",
    names: ["laptop", "cb3"],
  },
];

export const GLYPHS = [
  "triad", "orbit", "vesica", "compass", "rhombus", "windmill", "triquetra",
  "arcs", "rings", "splitdisc", "slashes", "fold", "link", "module",
  "phi", "psi", "omega", "sigma", "lambda", "pi", "theta", "delta", "xi",
  "glider", "invader", "checker", "ramp",
  "sierpinski", "cube", "pentagon", "annulus", "spirograph",
  "stack", "syscall", "pointer",
  "integral", "infinity", "matrix",
  "j", "c", "b", "jb", "cb", "jcb",
  "jloop", "cinj", "cinb", "jloopcinb", "jbs",
  "laptop", "cb3",
] as const;

export type GlyphName = (typeof GLYPHS)[number];

export const GLYPH_LABELS: Record<GlyphName, string> = {
  // abstract
  triad: "Triad",
  orbit: "Orbit",
  vesica: "Vesica",
  compass: "Compass",
  rhombus: "Rhombus",
  windmill: "Windmill",
  triquetra: "Triquetra",
  arcs: "Arcs",
  rings: "Rings",
  splitdisc: "Split disc",
  slashes: "Slashes",
  fold: "Fold",
  link: "Link",
  module: "Module",
  // greek
  phi: "Phi  φ",
  psi: "Psi  ψ",
  omega: "Omega  Ω",
  sigma: "Sigma  Σ",
  lambda: "Lambda  λ",
  pi: "Pi  π",
  theta: "Theta  θ",
  delta: "Delta  Δ",
  xi: "Xi  Ξ",
  // pixel
  glider: "Glider",
  invader: "Invader",
  checker: "Checker",
  ramp: "Ramp",
  // figures
  sierpinski: "Sierpinski",
  cube: "Cube",
  pentagon: "Pentagon",
  annulus: "Annulus",
  spirograph: "Spirograph",
  // systems
  stack: "Call stack",
  syscall: "Syscall gate",
  pointer: "Pointer",
  // maths
  integral: "Integral  ∫",
  infinity: "Infinity  ∞",
  matrix: "Matrix  [·]",
  // monogram
  jloop: "J",
  cinj: "C in J",
  cinb: "C in B",
  jloopcinb: "J · C in B",
  jbs: "J/B (shared stem)",
  // initials
  j: "J",
  c: "C",
  b: "B",
  jb: "JB",
  cb: "CB",
  jcb: "JCB",
  // experiments
  laptop: "Laptop (fold 90°)",
  cb3: "C + 3  (CB)",
};

// A clean J: straight stem falling into a round hook whose tail curls back up,
// leaving a counter for the C to sit in.
const MONO_J = `<path class="d" pathLength="1" d="M43 22 H75"/><path class="d" pathLength="1" d="M65 22 V50 Q65 76 43 76 Q25 76 25 60"/>`;
// C inscribed inside the J's open counter (horizontal terminals, like C-in-B).
const MONO_CINJ = `${MONO_J}<path class="d" pathLength="1" d="M54 35 H41 A13 13 0 0 0 41 61 H54"/>`;
// A monoline B with a C inscribed inside its bowls.
const MONO_CINB = `<path class="d" pathLength="1" d="M46 24 H64 A13 13 0 0 1 64 50 H50"/><path class="d" pathLength="1" d="M50 50 H64 A13 13 0 0 1 64 76 H46"/><path class="d" pathLength="1" d="M62 37 H46 A13 13 0 0 0 46 63 H62"/>`;

export const GLYPH_PATHS: Record<GlyphName, string> = {
  // ---- abstract ----
  triad: `<rect class="f" x="46" y="16" width="8" height="28" rx="4" fill="currentColor" stroke="none" transform="rotate(0 50 50)"/><rect class="f" x="46" y="16" width="8" height="28" rx="4" fill="currentColor" stroke="none" transform="rotate(120 50 50)"/><rect class="f" x="46" y="16" width="8" height="28" rx="4" fill="currentColor" stroke="none" transform="rotate(240 50 50)"/>`,
  orbit: `<circle class="d" pathLength="1" cx="42" cy="50" r="22"/><circle class="d" pathLength="1" cx="63" cy="50" r="13"/>`,
  vesica: `<circle class="d" pathLength="1" cx="40" cy="50" r="20"/><circle class="d" pathLength="1" cx="60" cy="50" r="20"/>`,
  compass: `<rect class="d" pathLength="1" x="30" y="30" width="40" height="40" rx="4"/><path class="d" pathLength="1" d="M50 20 L80 50 L50 80 L20 50 Z"/>`,
  rhombus: `<path class="d" pathLength="1" d="M50 22 L78 50 L50 78 L22 50 Z"/><path class="d" pathLength="1" d="M50 38 L62 50 L50 62 L38 50 Z"/>`,
  windmill: `<path class="d" pathLength="1" d="M38 64 V38 H64" transform="rotate(0 50 50)"/><path class="d" pathLength="1" d="M38 64 V38 H64" transform="rotate(90 50 50)"/><path class="d" pathLength="1" d="M38 64 V38 H64" transform="rotate(180 50 50)"/><path class="d" pathLength="1" d="M38 64 V38 H64" transform="rotate(270 50 50)"/>`,
  triquetra: `<circle class="d" pathLength="1" cx="50" cy="35" r="17"/><circle class="d" pathLength="1" cx="37" cy="58" r="17"/><circle class="d" pathLength="1" cx="63" cy="58" r="17"/>`,
  arcs: `<path class="d" pathLength="1" d="M42 26 A28 28 0 0 0 42 74"/><path class="d" pathLength="1" d="M58 26 A28 28 0 0 1 58 74"/>`,
  rings: `<path class="d" pathLength="1" d="M50 24 A26 26 0 1 1 32 31"/><path class="d" pathLength="1" d="M50 38 A12 12 0 1 0 61 45"/>`,
  splitdisc: `<circle class="d" pathLength="1" cx="50" cy="50" r="24"/><path class="f" fill="currentColor" stroke="none" d="M33 33 A24 24 0 0 1 67 67 Z"/>`,
  slashes: `<path class="d" pathLength="1" d="M30 68 L46 32"/><path class="d" pathLength="1" d="M44 68 L60 32"/><path class="d" pathLength="1" d="M58 68 L74 32"/>`,
  fold: `<path class="d" pathLength="1" d="M28 34 L46 30 V66 L28 70 Z"/><path class="f" fill="currentColor" stroke="none" d="M54 30 L72 34 V70 L54 66 Z"/>`,
  link: `<rect class="d" pathLength="1" x="22" y="34" width="34" height="34" rx="11"/><rect class="d" pathLength="1" x="44" y="34" width="34" height="34" rx="11"/>`,
  module: `<rect class="d" pathLength="1" x="26" y="26" width="20" height="20" rx="3"/><rect class="d" pathLength="1" x="54" y="26" width="20" height="20" rx="3"/><rect class="d" pathLength="1" x="26" y="54" width="20" height="20" rx="3"/><path class="f" fill="currentColor" stroke="none" d="M64 50 L74 60 L64 70 L54 60 Z"/>`,

  // ---- greek ----
  phi: `<path class="d" pathLength="1" d="M50 18 V82"/><ellipse class="d" pathLength="1" cx="50" cy="50" rx="17" ry="21"/>`,
  psi: `<path class="d" pathLength="1" d="M50 20 V84"/><path class="d" pathLength="1" d="M32 34 V46 A18 14 0 0 0 68 46 V34"/>`,
  omega: `<path class="d" pathLength="1" d="M30 76 H46 A24 24 0 1 1 54 76 H70"/>`,
  sigma: `<path class="d" pathLength="1" d="M67 30 H35 L53 50 L35 70 H67"/>`,
  lambda: `<path class="d" pathLength="1" d="M28 30 H42 L68 74"/><path class="d" pathLength="1" d="M52 52 L34 74"/>`,
  pi: `<path class="d" pathLength="1" d="M26 34 H74"/><path class="d" pathLength="1" d="M40 34 V74"/><path class="d" pathLength="1" d="M62 34 V74"/>`,
  theta: `<ellipse class="d" pathLength="1" cx="50" cy="50" rx="18" ry="22"/><path class="d" pathLength="1" d="M34 50 H66"/>`,
  delta: `<path class="d" pathLength="1" d="M50 22 L78 76 H22 Z"/>`,
  xi: `<path class="d" pathLength="1" d="M34 28 H66"/><path class="d" pathLength="1" d="M32 50 H68"/><path class="d" pathLength="1" d="M30 72 H70"/>`,

  // ---- pixel (5x5 / 4x4 grids) ----
  glider: `<rect class="f" x="42" y="23" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="61" y="42" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="23" y="61" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="42" y="61" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="61" y="61" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/>`,
  invader: `<rect class="f" x="23" y="4" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="61" y="4" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="4" y="23" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="23" y="23" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="42" y="23" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="61" y="23" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="80" y="23" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="4" y="42" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="42" y="42" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="80" y="42" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="4" y="61" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="23" y="61" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="42" y="61" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="61" y="61" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="80" y="61" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="23" y="80" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="61" y="80" width="16" height="16" rx="1.5" fill="currentColor" stroke="none"/>`,
  checker: `<rect class="f" x="8" y="8" width="18" height="18" fill="currentColor" stroke="none"/><rect class="f" x="52" y="8" width="18" height="18" fill="currentColor" stroke="none"/><rect class="f" x="30" y="30" width="18" height="18" fill="currentColor" stroke="none"/><rect class="f" x="74" y="30" width="18" height="18" fill="currentColor" stroke="none"/><rect class="f" x="8" y="52" width="18" height="18" fill="currentColor" stroke="none"/><rect class="f" x="52" y="52" width="18" height="18" fill="currentColor" stroke="none"/><rect class="f" x="30" y="74" width="18" height="18" fill="currentColor" stroke="none"/><rect class="f" x="74" y="74" width="18" height="18" fill="currentColor" stroke="none"/>`,
  ramp: `<rect class="f" x="8" y="8" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="8" y="30" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="30" y="30" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="8" y="52" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="30" y="52" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="52" y="52" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="8" y="74" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="30" y="74" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="52" y="74" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="74" y="74" width="18" height="18" rx="1.5" fill="currentColor" stroke="none"/>`,

  // ---- figures ----
  sierpinski: `<path class="d" pathLength="1" d="M50 20 L80 74 H20 Z"/><path class="f" fill="currentColor" stroke="none" d="M50 47 L65 74 H35 Z"/>`,
  cube: `<path class="d" pathLength="1" d="M50 22 L76 37 V63 L50 78 L24 63 V37 Z"/><path class="d" pathLength="1" d="M50 50 V78"/><path class="d" pathLength="1" d="M50 50 L76 37"/><path class="d" pathLength="1" d="M50 50 L24 37"/>`,
  pentagon: `<path class="d" pathLength="1" d="M50 20 L79 41 L68 76 H32 L21 41 Z"/>`,
  annulus: `<circle class="d" pathLength="1" cx="50" cy="50" r="24"/><circle class="d" pathLength="1" cx="50" cy="50" r="11"/>`,
  spirograph: `<ellipse class="d" pathLength="1" cx="50" cy="50" rx="26" ry="11" transform="rotate(0 50 50)"/><ellipse class="d" pathLength="1" cx="50" cy="50" rx="26" ry="11" transform="rotate(60 50 50)"/><ellipse class="d" pathLength="1" cx="50" cy="50" rx="26" ry="11" transform="rotate(120 50 50)"/>`,

  // ---- systems (low-level / OS motifs) ----
  // call stack: frames pushed down, the active one filled, a stack-growth arrow
  stack: `<rect class="d" pathLength="1" x="18" y="18" width="54" height="16" rx="3"/><rect class="d" pathLength="1" x="18" y="39" width="54" height="16" rx="3"/><rect class="f" x="18" y="60" width="54" height="16" rx="3" fill="currentColor" stroke="none"/><path class="d" pathLength="1" d="M84 20 V78"/><path class="d" pathLength="1" d="M77 70 L84 81 L91 70"/>`,
  // user/kernel boundary: an open ring, a filled kernel core, a call crossing in
  syscall: `<path class="d" pathLength="1" d="M24 30 A34 34 0 0 1 86 50 A34 34 0 0 1 24 70"/><circle class="f" cx="54" cy="50" r="9" fill="currentColor" stroke="none"/><path class="d" pathLength="1" d="M8 50 H42"/><path class="d" pathLength="1" d="M31 42 L43 50 L31 58"/>`,
  // pointer chasing: a cell full of addresses, an arrow, a filled value cell
  pointer: `<rect class="d" pathLength="1" x="8" y="35" width="30" height="30" rx="3"/><rect class="f" x="15" y="42" width="6" height="6" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="25" y="42" width="6" height="6" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="15" y="52" width="6" height="6" rx="1.5" fill="currentColor" stroke="none"/><rect class="f" x="25" y="52" width="6" height="6" rx="1.5" fill="currentColor" stroke="none"/><path class="d" pathLength="1" d="M43 50 H53"/><path class="d" pathLength="1" d="M47 43 L57 50 L47 57"/><rect class="f" x="58" y="35" width="34" height="30" rx="3" fill="currentColor" stroke="none"/>`,

  // ---- maths (calculus / analysis glyphs) ----
  // the definite integral as the area under a curve
  integral: `<path class="d" pathLength="1" d="M14 22 V74 H86"/><path class="d" pathLength="1" d="M80 68 L89 74 L80 80"/><path class="f" fill="currentColor" stroke="none" d="M14 74 C30 74 30 24 50 24 C70 24 70 74 86 74 Z"/>`,
  // a lemniscate rendered as a ribbon: two nested contours around a solid node
  infinity: `<path class="d" pathLength="1" d="M20 52 C20 38 34 34 45 45 L55 59 C66 70 80 66 80 52 C80 38 66 34 55 45 L45 59 C34 70 20 66 20 52 Z"/><path class="d" pathLength="1" d="M32 52 C32 45 39 43 45 49 L55 55 C61 61 68 59 68 52 C68 45 61 43 55 49 L45 55 C39 61 32 59 32 52 Z"/><circle class="f" cx="50" cy="52" r="5" fill="currentColor" stroke="none"/>`,
  // a determinant: bracketing bars around a grid of entries
  matrix: `<path class="d" pathLength="1" d="M30 22 V78"/><path class="d" pathLength="1" d="M70 22 V78"/><rect class="f" x="39" y="32" width="6" height="6" rx="1" fill="currentColor" stroke="none"/><rect class="f" x="47" y="32" width="6" height="6" rx="1" fill="currentColor" stroke="none"/><rect class="f" x="55" y="32" width="6" height="6" rx="1" fill="currentColor" stroke="none"/><rect class="f" x="39" y="47" width="6" height="6" rx="1" fill="currentColor" stroke="none"/><rect class="f" x="47" y="47" width="6" height="6" rx="1" fill="currentColor" stroke="none"/><rect class="f" x="55" y="47" width="6" height="6" rx="1" fill="currentColor" stroke="none"/><rect class="f" x="39" y="62" width="6" height="6" rx="1" fill="currentColor" stroke="none"/><rect class="f" x="47" y="62" width="6" height="6" rx="1" fill="currentColor" stroke="none"/><rect class="f" x="55" y="62" width="6" height="6" rx="1" fill="currentColor" stroke="none"/>`,

  // ---- initials (geometric monoline letterforms) ----
  j: `<path class="d" pathLength="1" d="M34 30 H70"/><path class="d" pathLength="1" d="M58 30 V60 Q58 78 40 78 Q24 78 24 62"/>`,
  c: `<path class="d" pathLength="1" d="M72 34 A26 26 0 1 0 72 66"/>`,
  b: `<path class="d" pathLength="1" d="M34 28 V72"/><path class="d" pathLength="1" d="M34 28 H52 A11 11 0 0 1 52 50 H34"/><path class="d" pathLength="1" d="M34 50 H56 A11 11 0 0 1 56 72 H34"/>`,
  jb: `<path class="d" pathLength="1" d="M14 30 H40"/><path class="d" pathLength="1" d="M31 30 V56 Q31 70 20 70 Q10 70 10 59"/><path class="d" pathLength="1" d="M54 30 V72"/><path class="d" pathLength="1" d="M54 30 H70 A10 10 0 0 1 70 51 H54"/><path class="d" pathLength="1" d="M54 51 H72 A10 10 0 0 1 72 72 H54"/>`,
  cb: `<path class="d" pathLength="1" d="M42 32 A16 16 0 1 0 42 62"/><path class="d" pathLength="1" d="M56 30 V72"/><path class="d" pathLength="1" d="M56 30 H72 A10 10 0 0 1 72 51 H56"/><path class="d" pathLength="1" d="M56 51 H74 A10 10 0 0 1 74 72 H56"/>`,
  jcb: `<path stroke-width="6.5" class="d" pathLength="1" d="M12 34 H30"/><path stroke-width="6.5" class="d" pathLength="1" d="M25 34 V54 Q25 66 16 66 Q8 66 8 57"/><path stroke-width="6.5" class="d" pathLength="1" d="M61 39 A15 15 0 1 0 61 61"/><path stroke-width="6.5" class="d" pathLength="1" d="M70 34 V66"/><path stroke-width="6.5" class="d" pathLength="1" d="M70 34 H82 A8 8 0 0 1 82 50 H70"/><path stroke-width="6.5" class="d" pathLength="1" d="M70 50 H84 A8 8 0 0 1 84 66 H70"/>`,

  // ---- monogram (J, C-in-J, C-in-B lockups) ----
  jloop: MONO_J,
  cinj: MONO_CINJ,
  cinb: MONO_CINB,
  jloopcinb: `<g transform="translate(44 52) scale(0.82) translate(-50 -50)">${MONO_J}</g><g transform="translate(74 74) scale(0.38) translate(-50 -50)">${MONO_CINB}</g>`,
  // JB: the B's spine is the J's stem — the stem continues past the lower
  // bowl and curls left into the J's hook.
  jbs: `<path class="d" pathLength="1" d="M49 19 V67 Q49 81 33 81 Q19 81 19 67"/><path class="d" pathLength="1" d="M49 19 H65 A12 12 0 0 1 65 43 H49"/><path class="d" pathLength="1" d="M49 43 H69 A12 12 0 0 1 69 67 H49"/>`,

  // ---- experiments ----
  // fold rotated ~90deg into an open-laptop silhouette: screen (outlined) +
  // deck (filled) hinged along a shared back edge.
  laptop: `<path class="f" fill="currentColor" stroke="none" d="M28 56 L64 62 L56 76 L20 70 Z"/><path class="d" pathLength="1" d="M28 56 L36 28 L72 34 L64 62 Z"/>`,
  // C interleaved with a "3" (a B without its stem); the C cups the 3's nexus.
  cb3: `<path class="d" pathLength="1" d="M46 28 C66 28 66 50 46 50 C66 50 66 72 46 72"/><path class="d" pathLength="1" d="M50 36 A18 18 0 1 0 50 64"/>`,
};
