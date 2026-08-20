import { icons } from "@iconify-json/fa7-solid/icons.json";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { cwd } from "node:process";
import satori, { type SatoriOptions } from "satori";

const require = createRequire(import.meta.url);
await initWasm(readFile(require.resolve("@resvg/resvg-wasm/index_bg.wasm")));

// Bold - font weight: 700
const boldFont = readFile(join(cwd(), "assets/Inter-ExtraBold.ttf"));

// Medium - font weight: 500
const mediumFont = readFile(join(cwd(), "assets/Inter-Medium.ttf"));

// Regular - font weight: 400
const regularFont = readFile(join(cwd(), "assets/Inter-Regular.ttf"));

const favicon = readFile(join(cwd(), "public/favicon_hq.png"));

export type GenerateOptions = {
  title: string;
  ogPreview?: string;
  subtitle?: string;
  author?: string;
  date?: string;
  readTime?: string;
  player?: string;
};

const h = (type: string, props: any = {}, ...children: any[]) => ({
  type,
  props: { ...props, children },
});

function iconDataUri(
  icon: keyof typeof icons,
  height: number,
  fill: string,
): string {
  const vbW = 640;
  const vbH = 640;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="${Math.round((vbW / vbH) * height)}" height="${height}">${icons[icon].body.replaceAll("currentColor", fill)}</svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

export async function generate({
  title,
  ogPreview,
  subtitle,
  author,
  date,
  readTime,
  player,
}: GenerateOptions): Promise<Response> {
  const b64 = (await favicon).toString("base64");

  let image = h("img", {
    src: "data:image/png;base64," + b64,
    width: 256,
    height: 256,
  });

  if (player) {
    image = h("img", {
      src: player,
      width: 180,
      height: 180,
      style: { margin: "36px" },
    });
  }

  if (!title && !ogPreview) {
    title = "BlueDragon";
    ogPreview =
      "BlueDragon is a Minecraft server that strives to produce high-quality, original content. Join for free to explore unique minigames like Paintbrawl, WackyMaze, and more!";
  }

  const footerItem = (show: boolean, icon: keyof typeof icons, text?: string) =>
    h(
      "div",
      { style: { display: show ? "flex" : "none" } },
      ...[
        h("img", {
          src: iconDataUri(icon, 32, "#9ca3af"),
          width: 32,
          height: 32,
        }),
        h("span", { style: { marginLeft: 8 } }, text),
      ],
    );

  const fonts: SatoriOptions["fonts"] = [
    {
      name: "Inter",
      data: await boldFont,
      style: "normal",
      weight: 700,
    },
    {
      name: "Inter",
      data: await mediumFont,
      style: "normal",
      weight: 500,
    },
    {
      name: "Inter",
      data: await regularFont,
      style: "normal",
      weight: 400,
    },
  ];

  const svg = await satori(
    h(
      "div",
      { style: { display: "flex", height: "100%", width: "100%" } },
      h(
        "div",
        {
          style: {
            display: "flex",
            height: "100%",
            width: "100%",
            padding: "32px",
            gap: "32px",
            backgroundColor: "#111827",
          },
        },
        h(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              height: "80%",
              justifyContent: "center",
            },
          },
          h(
            "div",
            {
              style: {
                display: "flex",
                borderRadius: 9999,
                padding: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            image,
          ),
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              height: "80%",
              width: "825px",
              justifyContent: "center",
            },
          },
          h(
            "span",
            { style: { fontSize: 72, color: "white", fontWeight: 700 } },
            title,
          ),
          h(
            "span",
            {
              style: {
                fontSize: 42,
                color: "#d1d5db",
                fontWeight: 500,
                marginBottom: subtitle ? "36px" : "",
              },
            },
            subtitle,
          ),
          h("span", { style: { fontSize: 36, color: "#9ca3af" } }, ogPreview),
        ),
      ),
      h(
        "div",
        {
          style: {
            position: "absolute",
            display: "flex",
            justifyContent: "space-around",
            width: "90%",
            left: 60,
            bottom: 64,
            fontSize: 32,
            fontWeight: 500,
            color: "#9ca3af",
          },
        },
        ...[
          footerItem(!!author, "user", author),
          footerItem(!!date, "calendar", date),
          footerItem(!!readTime, "clock", readTime),
          footerItem(true, "bookmark", "bluedragonmc.com"),
        ],
      ),
      h("div", {
        style: {
          display: "flex",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 32,
          backgroundImage: "linear-gradient(90deg, #38bdf8, #1d4ed8)",
        },
      }),
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    },
  );

  const png = new Resvg(svg, {
    fitTo: { mode: "original" },
    font: { loadSystemFonts: false },
  })
    .render()
    .asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "text/svg",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate",
    },
  });
}
