import { imageSize } from "image-size";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const isElement = (node) =>
  node && node.type === "element" && typeof node.tagName === "string";

const isTableCell = (node) =>
  isElement(node) && (node.tagName === "th" || node.tagName === "td");

const getClasses = (node) => {
  const c = node.properties?.class;
  if (!c) return [];
  return Array.isArray(c) ? c : [c];
};

const childText = (node) => {
  let out = "";
  const stack = node.children ? [...node.children] : [];
  while (stack.length) {
    const n = stack.pop();
    if (n.type === "text" || n.type === "raw") out = n.value + out;
    if (n.children) for (const c of n.children) stack.push(c);
  }
  return out;
};

/**
 * Makes tables responsive on mobile by converting each row into a mini table
 * with the header on the left and the row's content on the right.
 */
export const rehypeResponsiveTables = {
  name: "rehypeResponsiveTables",
  element: [
    {
      filter: ["table"],
      visit(table, ctx) {
        const headerRows = [];
        const bodyRows = [];
        for (const child of table.children || []) {
          if (!isElement(child)) continue;
          if (child.tagName === "thead") {
            for (const c of child.children || [])
              if (isElement(c) && c.tagName === "tr") headerRows.push(c);
          } else if (child.tagName === "tbody") {
            for (const c of child.children || [])
              if (isElement(c) && c.tagName === "tr") bodyRows.push(c);
          } else if (child.tagName === "tr") {
            bodyRows.push(child);
          }
        }

        if (headerRows[0] && getClasses(headerRows[0]).includes("md:table-row"))
          return;
        if (headerRows.length === 0 && bodyRows.length === 0) return;

        const headerTexts = headerRows[0]
          ? (headerRows[0].children || []).filter(isTableCell).map(childText)
          : [];

        if (headerRows[0]) {
          ctx.setProperty(headerRows[0], "class", ["hidden", "md:table-row"]);
        }

        for (const row of bodyRows) {
          const cells = (row.children || []).filter(isTableCell);
          if (cells.length === 0) continue;

          if (cells[0]) ctx.setProperty(cells[0], "class", ["md:pl-0"]);
          cells.forEach((_cell, i) => {
            if (headerTexts[i] === undefined) return;
            ctx.insertChildAt(row, i * 2, {
              type: "element",
              tagName: "td",
              properties: {
                class: ["table-cell", "pl-0", "font-bold", "md:hidden"],
                "aria-hidden": "true",
              },
              children: [{ type: "text", value: headerTexts[i] }],
            });
          });
          ctx.setProperty(row, "class", [
            "row",
            "grid",
            "grid-cols-2",
            "md:table-row",
          ]);
        }
      },
    },
  ],
};

/**
 * Wraps each image in the rendered Markdown with a PhotoSwipe item
 * (`<a>` with `data-pswp-*`).
 */
export const rehypeGalleryImages = {
  name: "rehypeGalleryImages",
  element: [
    {
      filter: ["img"],
      visit(img, ctx) {
        const parent = ctx.parent(img);
        if (isElement(parent) && parent.tagName === "a") return;
        // ctx.data is scoped to the document being rendered, so this is
        // true only for the first transformed image of each post.
        const priority = !ctx.data.__gallerySawImage;
        ctx.data.__gallerySawImage = true;
        return transformImage(img, ctx, priority);
      },
    },
  ],
};

async function transformImage(node, ctx, priority) {
  const props = node.properties || {};
  const src = props.src;
  if (typeof src !== "string") return;

  let filePath;
  if (src.startsWith("/")) {
    filePath = join(process.cwd(), "public", src);
  } else if (ctx.fileURL) {
    const resolved = new URL(src, ctx.fileURL);
    if (resolved.protocol !== "file:") return;
    filePath = fileURLToPath(resolved);
  } else {
    return;
  }

  let dimensions;
  try {
    dimensions = imageSize(await readFile(filePath));
  } catch {
    return;
  }
  if (!dimensions || !dimensions.width || !dimensions.height) return;

  const { width, height } = dimensions;

  // The image is emitted in multiple build-time variants (image.layout:
  // "constrained"). The sizes hint matches the prose column width so
  // browsers pick a small variant inline; the gallery script points the
  // lightbox at the largest variant for full-size viewing.
  ctx.replaceNode(node, {
    type: "element",
    tagName: "a",
    properties: {
      "data-pswp-width": width,
      "data-pswp-height": height,
    },
    children: [
      {
        type: "element",
        tagName: "img",
        properties: {
          src,
          alt: props.alt ?? "Image",
          width,
          height,
          sizes: "(min-width: 768px) 720px, 100vw",
          // Mirror what the `priority` prop does on Astro's <Image>:
          loading: priority ? "eager" : "lazy",
          decoding: priority ? "sync" : "async",
          fetchpriority: priority ? "high" : undefined,
          class: "cursor-pointer rounded-md",
        },
        children: [],
      },
    ],
  });
}
