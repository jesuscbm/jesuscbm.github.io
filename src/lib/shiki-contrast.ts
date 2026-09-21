/**
 * Shiki transformer: swap the few token colours in our two code themes that
 * fall below WCAG AA (4.5:1) against their own background, mostly
 * tokyo-night's comment greys and github-light's orange. Each replacement is
 * the nearest lighter (dark theme) or darker (light theme) shade that passes.
 */
import type { ShikiTransformer } from "shiki";

const REPLACE: Record<string, string> = {
  // tokyo-night on #1a1b26
  "#4e5579": "#80859f",
  "#51597d": "#7e849f",
  "#5a638c": "#7d84a4",
  "#6183bb": "#6687bd",
  "#646e9c": "#7b84ab",
  "#747ca1": "#7c84a7",
  "#914c54": "#ab777d",
  "#ba3c97": "#c761ab",
  "#db4b4b": "#de5959",
  // github-light on #ffffff
  "#e36209": "#c15308",
};

const shikiContrast: ShikiTransformer = {
  name: "wcag-contrast",
  span(node) {
    const style = node.properties.style;
    if (typeof style !== "string") return;
    node.properties.style = style.replace(
      /#[0-9a-f]{6}/gi,
      (hex) => REPLACE[hex.toLowerCase()] ?? hex,
    );
  },
};

export default shikiContrast;
