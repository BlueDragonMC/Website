import { readdir, readFile } from "fs/promises";
import matter, { GrayMatterFile } from "gray-matter";
import { join } from "path";

const frontMatterCache: { [key: string]: GrayMatterFile<Buffer> } = {};

export async function getArticles() {
    const files = await readdir(join(process.cwd(), "articles"), {
        withFileTypes: true,
    });
    const tuples: Array<[string, GrayMatterFile<Buffer>]> = await Promise.all(
        files
            .filter((file) => file.name.includes(".md"))
            .map((file): Promise<[string, GrayMatterFile<Buffer>]> => {
                return new Promise((resolve, reject) => {
                    getFrontMatter(
                        "articles",
                        file.name.substring(0, file.name.lastIndexOf(".md"))
                    )
                        .then((data) => {
                            resolve([
                                file.name,
                                data as GrayMatterFile<Buffer>,
                            ]);
                        })
                        .catch((err) => reject(err));
                });
            })
    );

    return tuples.sort((a, b) => {
        return b[1].data.created?.getTime() - a[1].data.created?.getTime();
    });
}

export const getFrontMatter = async (parent: string, slug: string) => {
    const sanitized = slug.replace(/[^a-z0-9-]/gi, "_").toLowerCase() + ".md";
    const path = parent + "/" + sanitized;
    if (frontMatterCache.hasOwnProperty(path)) {
        return frontMatterCache[path];
    } else {
        try {
            const frontMatter = matter(
                await readFile(join(process.cwd(), parent, sanitized))
            );
            frontMatterCache[path] = frontMatter;
            return frontMatter;
        } catch (e) {
            return null;
        }
    }
};

export const getOGImageURL = (frontMatter: GrayMatterFile<any>): string => {
    const { title, author, ogPreview, description, created } = frontMatter.data;

    const wordCount = frontMatter.content.split(" ").length;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / 250))} min read`;

    const date = Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
    }).format(created);

    let params = [];

    if (title) params.push(`title=${encodeURIComponent(title)}`);
    if (author) params.push(`author=${encodeURIComponent(author)}`);
    if (date) params.push(`date=${encodeURIComponent(date)}`);
    if (readingTime) params.push(`readTime=${encodeURIComponent(readingTime)}`);
    if (ogPreview) params.push(`ogPreview=${encodeURIComponent(ogPreview)}`);
    else if (description)
        params.push(
            `ogPreview=${encodeURIComponent(
                description.substring(0, description.indexOf(".") + 1)
            )}`
        );

    return `/api/og?${params.join("&")}`;
};
