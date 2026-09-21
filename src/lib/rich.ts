/**
 * Minimal inline markup for portfolio strings: **text** becomes a highlight
 * (<strong>) and `text` becomes <code>. Everything else is HTML-escaped, so
 * the result is safe for set:html.
 */
const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function rich(s: string): string {
  return escape(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

/** The same string with the markup removed (for plain-text outputs). */
export function plain(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`(.+?)`/g, "$1");
}
