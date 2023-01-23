import { getFrontMatter } from "@/app/utils";
import { notFound } from "next/navigation";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../blog/[article]/article.module.css";

export default async function Page({ params: { page } }: { params: { page: string } }) {

    const frontMatter = await getFrontMatter("pages", page) ?? notFound();

    return (
        <main className={`${styles.markdown} lg:w-2/3 lg:mx-auto`}>
            <ReactMarkdown children={frontMatter.content} remarkPlugins={[remarkGfm]} />
        </main>
    );
}