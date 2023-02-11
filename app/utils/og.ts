import { GrayMatterFile } from "gray-matter";
import { BASE_PATH } from "../vars";

export const getArticleOGImageURL = (frontMatter: GrayMatterFile<any>): URL => {
    const { title, author, ogPreview, description, created, modified } =
        frontMatter.data;

    const wordCount = frontMatter.content.split(" ").length;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / 250))} min read`;

    const fmt = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
    });

    const createdStr = created ? fmt.format(created) : undefined;
    const modifiedStr = modified ? fmt.format(modified) : undefined;

    return getOGImageURL({
        title,
        ogPreview:
            ogPreview ?? description.substring(0, description.indexOf(".") + 1),
        author,
        date: createdStr ?? modifiedStr,
        readTime: readingTime,
    });
};

export function getOGImageURL({
    title,
    ogPreview,
    subtitle,
    author,
    date,
    readTime,
    player,
}: {
    title?: string;
    ogPreview?: string;
    subtitle?: string;
    author?: string;
    date?: string;
    readTime?: string;
    player?: string;
}): URL {
    let params = [];

    if (title) params.push(`title=${encodeURIComponent(title)}`);
    if (ogPreview) params.push(`ogPreview=${encodeURIComponent(ogPreview)}`);
    if (subtitle) params.push(`subtitle=${encodeURIComponent(subtitle)}`);
    if (author) params.push(`author=${encodeURIComponent(author)}`);
    if (date) params.push(`date=${encodeURIComponent(date)}`);
    if (readTime) params.push(`readTime=${encodeURIComponent(readTime)}`);
    if (player) params.push(`player=${encodeURIComponent(player)}`);

    return new URL(`/api/og?${params.join("&")}`, BASE_PATH);
}
