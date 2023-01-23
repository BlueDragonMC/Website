import { getFrontMatter } from "@/app/utils";
import { readdir } from "fs/promises";
import { notFound } from "next/navigation";
import { join } from "path";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../blog/[article]/article.module.css";

export async function generateStaticParams() {
    const pages = await readdir(join(process.cwd(), "static-pages"));

    return pages.map((fileName) => {
        const slug = fileName.substring(0, fileName.lastIndexOf(".md"));
        return { page: slug };
    });
}

export default async function Page({ params: { page } }: { params: { page: string } }) {

    const frontMatter = await getFrontMatter("static-pages", page) ?? notFound();

    return (
        <main className={`${styles.markdown} lg:w-2/3 lg:mx-auto`}>
            <ReactMarkdown children={frontMatter.content} remarkPlugins={[remarkGfm]} />
        </main>
    );
}