// @ts-check
import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { rehypeGalleryImages, rehypeResponsiveTables } from "./rehype.mjs";

// https://astro.build/config
export default defineConfig({
  site:
    process.env.NODE_ENV === "production"
      ? "https://bluedragonmc.com"
      : `http://localhost:${process.env.PORT ?? 4321}`,
  adapter: node({ mode: "standalone" }),

  image: {
    layout: "constrained",
    breakpoints: [828],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), mdx()],

  markdown: {
    processor: satteri({
      hastPlugins: [rehypeResponsiveTables, rehypeGalleryImages],
    }),
  },

  redirects: {
    "/d/9-rules": "/page/rules",
    "/d/8-games": "/games",
    "/t/announcements": "/blog",
    "/t/information": "/about",
    "/t/blog": "/blog",
    "/d/16-20220902-leaderboard-update": "/blog/2022-09-02-leaderboard-update",
    "/d/11-new-game-infinijump": "/blog/new-game-infinijump",
    "/d/14-acknowledgements": "/page/oss",
    "/d/17-20220917-stability-improvements":
      "/blog/2022-09-17-stability-improvements",
    "/d/15-20220828-fastfall-update": "/blog/2022-08-28-fastfall-update",
    "/d/18-20220924-lobby-update": "/blog/2022-09-24-lobby-update",
    "/d/19-20221003-cosmetics-update": "/blog/2022-10-03-cosmetics-update",
    "/d/20-20221028-infinijump-cosmetics":
      "/blog/2022-10-28-infinijump-cosmetics",
    "/d/22-20221230-new-infinijump-mode":
      "/blog/2022-12-30-new-infinijump-mode",
    "/d/12-bluedragon-update-20220823": "/blog/2022-08-23-bluedragon-update",
    "/p/3-about": "/about",
    "/p/about": "/about",
    "/discord": "https://discord.gg/3gvSPdW",
    "/twitter": "https://twitter.com/BDMCNetwork",
    "/github": "https://github.com/BlueDragonMC",
  },
});
