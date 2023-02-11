import { readdir, readFile } from "fs/promises";
import matter, { GrayMatterFile } from "gray-matter";
import { join } from "path";

const frontMatterCache: { [key: string]: GrayMatterFile<Buffer> } = {};

export async function getArticles(folder: string = "articles") {
    const files = await readdir(join(process.cwd(), folder), {
        withFileTypes: true,
    });
    const tuples: Array<[string, GrayMatterFile<Buffer>]> = await Promise.all(
        files
            .filter((file) => file.name.includes(".md"))
            .map((file): Promise<[string, GrayMatterFile<Buffer>]> => {
                return new Promise((resolve, reject) => {
                    const slug = file.name.substring(
                        0,
                        file.name.lastIndexOf(".md")
                    );
                    getFrontMatter(folder, slug)
                        .then((data) => {
                            resolve([slug, data as GrayMatterFile<Buffer>]);
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
