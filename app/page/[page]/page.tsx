import { readFile } from "fs/promises";
import matter, { GrayMatterFile } from "gray-matter";
import { notFound } from "next/navigation";
import { join } from "path";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../blog/[article]/article.module.css";

export async function getFrontMatter(slug: string): Promise<GrayMatterFile<Buffer> | null> {
    try {
        const sanitized = slug.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const frontMatter = matter(await readFile(join(process.cwd(), "pages", sanitized + ".md")));
        return frontMatter;
    } catch (e) {
        return null;
    }
}

export default async function Page({ params: { page } }: { params: { page: string } }) {

    const frontMatter = await getFrontMatter(page) ?? notFound();

    return (
        <main className={`${styles.markdown} lg:w-2/3 lg:mx-auto`}>
            <ReactMarkdown children={frontMatter.content} remarkPlugins={[remarkGfm]} />
        </main>
    );
}