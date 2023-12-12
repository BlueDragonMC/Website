import { metadata } from "@/app/layout";
import { getArticles } from "@/app/utils/articles";
import { Feed } from "feed";
import { fromMarkdown } from "mdast-util-from-markdown";
import { Heading } from "mdast-util-from-markdown/lib";
import showdown from "showdown";

const dateRegex = /^([\d]{4})-([\d]{2})-([\d]{2})$/;

/**
 * Parses the changelog markdown file and produces an RSS feed using
 * the content in between headings formatted as dates.
 */
export const generateRssFeed = async () => {
    const changelog = await getArticles("static-pages").then((pages) =>
        pages.find((page) => page[0] === "changelog")
    );

    const content = changelog![1].content;
    const ast = fromMarkdown(content, "utf-8");

    const siteURL = metadata.metadataBase!.toString().slice(0, -1);

    const headings = ast.children.filter(
        (it) => it.type === "heading"
    ) as Heading[];

    let items = [];

    let lastHeaderText: string | null = null;
    let lastHeaderOffset: number | null = null;

    for (const heading of headings) {
        const child = heading.children[0];
        if (child.type === "text") {
            if (dateRegex.test(child.value)) {
                if (lastHeaderOffset !== null) {
                    const item = content.substring(
                        lastHeaderOffset,
                        child.position!.start.offset! -
                            child.position!.start.column
                    );
                    items.push({
                        date: lastHeaderText,
                        description: item,
                    });
                }
                lastHeaderText = child.value;
                lastHeaderOffset = child.position!.end.offset!;
            }
        }
    }

    items.push({
        date: lastHeaderText,
        description: content.substring(lastHeaderOffset!),
    });

    const date = new Date();

    const feed = new Feed({
        title: "BlueDragon Changelog",
        description: "",
        id: siteURL,
        link: siteURL,
        image: `${siteURL}/logo_wordmark.png`,
        favicon: `${siteURL}/favicon_hq.png`,
        copyright: `All rights reserved ${date.getFullYear()}, BlueDragonMC`,
        updated: date,
        generator: "Feed for Node.js",
        feedLinks: {
            rss2: `${siteURL}/rss/changelog/feed.xml`,
            json: `${siteURL}/rss/changelog/feed.json`,
            atom: `${siteURL}/rss/changelog/atom.xml`,
        },
    });

    const converter = new showdown.Converter();
    converter.setFlavor("github");

    items.forEach(({ date, description }) => {
        if (date === null) {
            return;
        }

        feed.addItem({
            title: date,
            id: date,
            link: `${siteURL}/page/changelog`,
            description: description,
            content: converter.makeHtml(description),
            author: [
                {
                    name: "BlueDragon Staff",
                    link: "https://bluedragonmc.com/page/changelog",
                },
            ],
            date: new Date(new Date(date).getTime() + 43_200_000), // Add half a day to dates to align better with EST
        });
    });

    return feed;
};
