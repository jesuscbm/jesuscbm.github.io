/**
 * Wrap every <table> in <div class="table-scroll"> so wide tables scroll
 * horizontally inside the article instead of forcing page-level scroll on
 * mobile. Written without unist-util-visit to avoid an extra dependency.
 */
export default function rehypeTableWrap() {
  return (tree: any) => {
    const walk = (node: any) => {
      if (!node || !Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child?.type === "element" && child.tagName === "table") {
          node.children[i] = {
            type: "element",
            tagName: "div",
            properties: { className: ["table-scroll"] },
            children: [child],
          };
          walk(child);
        } else {
          walk(child);
        }
      }
    };
    walk(tree);
  };
}
