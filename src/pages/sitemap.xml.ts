import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { once } from "events";
import { fromMarkdown } from "mdast-util-from-markdown";
import type { Img, SitemapItemLoose } from "sitemap";
import { EnumChangefreq, SitemapStream } from "sitemap";
import { Readable, Writable } from "stream";
import { games } from "../constants/games";
import { leaderboards } from "../constants/leaderboards";
import { client } from "../lib/mongo";

export const prerender = false;

export async function GET({ site }: APIContext) {
  const articles = await getCollection("blog");
  const staticPages = await getCollection("staticPages");

  // Static pages
  const fields: SitemapItemLoose[] = [
    {
      url: `/`,
      changefreq: EnumChangefreq.WEEKLY,
    },
    {
      url: `/blog`,
      changefreq: EnumChangefreq.DAILY,
      img: articles
        .map((article) => {
          return {
            url: article.data.image?.src,
            title: article.data.title,
          };
        })
        .filter(
          (entry): entry is { url: string; title: string } =>
            entry.url !== undefined,
        ),
    },
    {
      url: `/leaderboards`,
      changefreq: EnumChangefreq.DAILY,
    },
    {
      url: "/games",
      changefreq: EnumChangefreq.WEEKLY,
    },
    {
      url: "/join",
      changefreq: EnumChangefreq.WEEKLY,
    },
    {
      url: "/status",
      changefreq: EnumChangefreq.ALWAYS,
    },
  ];
  // Games
  games.forEach((game) => {
    fields.push({
      url: `/games/${game.name.replaceAll(/ /g, "-").toLowerCase()}`,
      changefreq: EnumChangefreq.WEEKLY,
    });
  });
  // Leaderboards
  leaderboards.forEach((category) => {
    category.leaderboards.forEach((lb) => {
      fields.push({
        url: `/leaderboards/${lb.stat}`,
        changefreq: EnumChangefreq.ALWAYS,
      });
    });
  });
  // Blog Posts
  articles.forEach((article) => {
    fields.push({
      url: `/blog/${article.id}`,
      lastmod: article.data.modified?.toISOString(),
      img: getImages({
        content: article.body ?? "",
      }),
    });
  });
  // Static Pages
  staticPages.forEach((page) => {
    fields.push({
      url: `/page/${page.id}`,
      changefreq: EnumChangefreq.DAILY,
      lastmodISO: page.data.modified?.toISOString(),
      img: getImages({
        content: page.body ?? "",
      }),
    });
  });
  // Players
  fields.push(
    ...((await getPlayers()).map((player) => {
      return {
        url: `/player/${player.username}`,
        changefreq: EnumChangefreq.ALWAYS,
        lastmodISO: player.lastJoinDate
          ? new Date(player.lastJoinDate).toISOString()
          : undefined,
      };
    }) as SitemapItemLoose[]),
  );

  const stream = new SitemapStream({ hostname: site?.href ?? "" });
  const readable = Readable.from(fields);
  const chunks: Buffer[] = [];
  const writable = new Writable({
    write(chunk, _enc, cb) {
      chunks.push(chunk as Buffer);
      cb();
    },
  });
  readable.pipe(stream).pipe(writable);
  await once(writable, "finish");

  return new Response(Buffer.concat(chunks).toString(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate",
    },
  });
}

function getImages(file: { content: string }): Img[] {
  const ast = fromMarkdown(file.content, "utf-8");
  return traverse(ast as unknown as MarkdownNode);
}

type MarkdownNode = {
  type: string;
  children?: MarkdownNode[];
  url?: string;
  alt?: string;
};

function traverse(node: MarkdownNode): Img[] {
  const images: Img[] = [];
  if (node.children) {
    for (const child of node.children) {
      for (const img of traverse(child)) {
        images.push(img);
      }
    }
  } else if (node.type === "image" && node.url) {
    images.push({
      url: node.url,
      caption: node.alt ? node.alt : undefined,
    });
  }
  return images;
}

async function getPlayers() {
  return (await client)
    .db("bluedragon")
    .collection("players")
    .find({}, { projection: { _id: 0, username: 1, lastJoinDate: 1 } })
    .toArray();
}
