import type { APIContext, ImageMetadata } from "astro";
import { getCollection } from "astro:content";
import { fromMarkdown } from "mdast-util-from-markdown";
import type { Img, SitemapItemLoose } from "sitemap";
import { EnumChangefreq, SitemapStream } from "sitemap";
import { Readable } from "stream";
import { games } from "../constants/games";
import { leaderboards } from "../constants/leaderboards";
import { client } from "../lib/mongo";

export const prerender = false;

/**
 * Maps asset filenames to their publicly served URLs,
 * e.g. "foo.png" -> "/_astro/foo.BOHXn1w4.jpg".
 * Used for image sitemap entries.
 */
const emittedUrlsByName = new Map<string, string>();

for (const [path, module] of Object.entries(
  import.meta.glob<{ default: ImageMetadata | string }>(
    "/assets/**/*.{png,jpg,jpeg,webp,gif,avif,svg}",
    { eager: true },
  ),
)) {
  const asset = module.default;
  const name = path.split("/").pop();
  if (name && asset) {
    emittedUrlsByName.set(name, typeof asset === "string" ? asset : asset.src);
  }
}

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
            url: article.data.image
              ? absoluteUrl(article.data.image.src, site)
              : undefined,
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
      changefreq: EnumChangefreq.MONTHLY,
    });
  });
  // Leaderboards
  leaderboards.forEach((category) => {
    category.leaderboards.forEach((lb) => {
      fields.push({
        url: `/leaderboards/${lb.stat.replace(/^statistics\./, "")}`,
        changefreq: EnumChangefreq.DAILY,
      });
    });
  });
  // Blog Posts
  articles.forEach((article) => {
    fields.push({
      url: `/blog/${article.id}`,
      lastmod: article.data.modified?.toISOString(),
      img: getImages(article.body ?? "", site),
    });
  });
  // Static Pages
  staticPages.forEach((page) => {
    fields.push({
      url: `/page/${page.id}`,
      changefreq: EnumChangefreq.DAILY,
      lastmodISO: page.data.modified?.toISOString(),
      img: getImages(page.body ?? "", site),
    });
  });
  // Players
  fields.push(
    ...((await getPlayers()).map((player) => {
      return {
        url: `/player/${player.username}`,
        changefreq: EnumChangefreq.DAILY,
        lastmodISO: player.lastJoinDate
          ? new Date(player.lastJoinDate).toISOString()
          : undefined,
      };
    }) as SitemapItemLoose[]),
  );

  const sitemap = new SitemapStream({ hostname: site?.href ?? "" });
  Readable.from(fields).pipe(sitemap);

  return new Response(Readable.toWeb(sitemap) as unknown as ReadableStream, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate",
    },
  });
}

type MarkdownNode = {
  type: string;
  children?: MarkdownNode[];
  url?: string;
  alt?: string;
};

function absoluteUrl(url: string, site?: URL): string {
  try {
    return new URL(url, site).href;
  } catch {
    return url;
  }
}

function getImages(content: string, site?: URL): Img[] {
  const images: Img[] = [];

  const visit = (node: MarkdownNode) => {
    for (const child of node.children ?? []) visit(child);
    if (node.type !== "image" || !node.url) return;

    // Relative file paths need to be resolved to their actual public paths,
    // e.g. "../../assets/image.png" -> "/_astro/image.BOHXn1w4.png"
    const isAbsolute =
      node.url.startsWith("/") || /^(https?:)?\/\//.test(node.url);
    const emitted = isAbsolute
      ? node.url
      : emittedUrlsByName.get(
          decodeURIComponent(node.url.split("/").pop() ?? ""),
        );
    if (!emitted) return;

    images.push({
      url: absoluteUrl(emitted, site),
      caption: node.alt,
    });
  };

  visit(fromMarkdown(content, "utf-8") as unknown as MarkdownNode);
  return images;
}

async function getPlayers(): Promise<
  Array<{ username: string; lastJoinDate?: Date }>
> {
  const docs = await (
    await client
  )
    .db("bluedragon")
    .collection("players")
    .find({}, { projection: { _id: 0, username: 1, lastJoinDate: 1 } })
    .toArray();
  return docs.map((doc) => ({
    username: doc.username as string,
    lastJoinDate: doc.lastJoinDate
      ? new Date(doc.lastJoinDate as string | number | Date)
      : undefined,
  }));
}
