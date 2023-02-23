import { games } from "@/app/games/games";
import { leaderboards } from "@/app/leaderboards/leaderboards";
import { getArticles } from "@/app/utils/articles";
import { BASE_PATH, MONGO_HOSTNAME } from "@/app/vars";
import { GrayMatterFile } from "gray-matter";
import { fromMarkdown } from "mdast-util-from-markdown";
import { Node } from "mdast-util-from-markdown/lib";
import { Document, MongoClient, WithId } from "mongodb";
import { EnumChangefreq, Img, SitemapItemLoose, SitemapStream } from "sitemap";
import { Readable } from "stream";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const client = new MongoClient(MONGO_HOSTNAME, {
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000,
});

const articles = getArticles("articles");
const staticPages = getArticles("static-pages");

export async function GET() {
    // Static pages
    const fields: SitemapItemLoose[] = [
        {
            url: `/`,
            changefreq: EnumChangefreq.WEEKLY,
        },
        {
            url: `/blog`,
            changefreq: EnumChangefreq.DAILY,
            img: (await articles)
                .map((article) => {
                    return {
                        url: article[1].data.image,
                        title: article[1].data.title,
                    };
                })
                .filter((entry) => entry.url !== undefined),
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
    games.map((game) => {
        fields.push({
            url: `/games/${game.name.replaceAll(/ /g, "-").toLowerCase()}`,
            changefreq: EnumChangefreq.WEEKLY,
        });
    });
    // Leaderboards
    leaderboards.map((category) => {
        category.leaderboards.map((lb) => {
            fields.push({
                url: `/leaderboards/${lb.stat}`,
                changefreq: EnumChangefreq.ALWAYS,
            });
        });
    });
    // Blog Posts
    (await articles).map((article) => {
        fields.push({
            url: `/blog/${article[0]}`,
            lastmod: article[1].data.modified?.toISOString(),
            img: getImages(article[1]),
        });
    });
    // Static Pages
    (await staticPages).map((page) => {
        fields.push({
            url: `/page/${page[0]}`,
            changefreq: EnumChangefreq.DAILY,
            lastmodISO: page[1].data.modified?.toISOString(),
            img: getImages(page[1]),
        });
    });
    // Players
    (await getPlayers()).map((player) => {
        fields.push({
            url: `/player/${player.username}`,
            changefreq: EnumChangefreq.ALWAYS,
            lastmodISO: player.lastJoinDate
                ? new Date(player.lastJoinDate).toISOString()
                : undefined,
        });
    });

    const stream = new SitemapStream({ hostname: BASE_PATH });
    const piped = Readable.from(fields).pipe(
        stream
    ) as unknown as ReadableStream;

    return new Response(piped, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate",
        },
    });
}

function getImages(file: GrayMatterFile<Buffer>): Img[] {
    const ast = fromMarkdown(file.content, "utf-8");
    return traverse(ast);
}

function traverse(node: Node): Img[] {
    const images: Img[] = [];
    if ("children" in node) {
        for (const child of node.children) {
            for (const img of traverse(child)) {
                images.push(img);
            }
        }
    } else if (node.type === "image") {
        images.push({
            url: node.url,
            caption: node.alt ? node.alt : undefined,
        });
    }
    return images;
}

async function getPlayers(): Promise<WithId<Document>[]> {
    return client
        .db("bluedragon")
        .collection("players")
        .find({}, { projection: { _id: 0, username: 1, lastJoinDate: 1 } })
        .toArray();
}

export default function Sitemap() {}
