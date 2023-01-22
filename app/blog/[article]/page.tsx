import { readFile } from "fs/promises";
import matter from "gray-matter";
import Image from "next/image";
import { notFound } from "next/navigation";
import { join } from "path";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./article.module.css";

export default async function Page({ params: { article } }: { params: { article: string } }) {

    let markdown;
    let frontMatter;
    try {
        frontMatter = matter(await readFile(join(process.cwd(), "articles", article + ".md")));
        markdown = frontMatter.content;
    } catch (e) {
        notFound();
    }

    return (
        <main className="lg:w-2/3 lg:mx-auto">
            <h1 className="text-3xl font-bold">{frontMatter.data.title}</h1>
            <Image src="/favicon_hq.png" height={48} width={48} className="inline rounded-full" alt="Profile image" />
            <span className="font-bold">{frontMatter.data.author}</span>
            <span className="font-medium">{" "}on {frontMatter.data.created?.toLocaleString()}</span>

            <ReactMarkdown children={markdown ?? ""} remarkPlugins={[remarkGfm]} className={styles.markdown}></ReactMarkdown>
        </main>
    )
}