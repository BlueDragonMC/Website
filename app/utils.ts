import { readFile } from "fs/promises";
import matter, { GrayMatterFile } from "gray-matter";
import { join } from "path";

const frontMatterCache: { [key: string]: GrayMatterFile<Buffer> } = {};

export const getFrontMatter = async (parent: string, slug: string) => {
    const sanitized = slug.replace(/[^a-z0-9-]/gi, '_').toLowerCase() + ".md";
    const path = parent + "/" + sanitized;
    if (frontMatterCache.hasOwnProperty(path)) {
        return frontMatterCache[path];
    } else {
        try {
            const frontMatter = matter(await readFile(join(process.cwd(), parent, sanitized)));
            frontMatterCache[path] = frontMatter;
            return frontMatter;
        } catch (e) {
            return null;
        }
    }
}