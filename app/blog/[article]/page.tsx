import CustomMarkdown from "@/components/CustomMarkdown";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import Image from "next/image";
import { notFound } from "next/navigation";
import { join } from "path";

export async function generateStaticParams() {
    const pages = await readdir(join(process.cwd(), "articles"));

    return pages.map((fileName) => {
        const slug = fileName.substring(0, fileName.lastIndexOf(".md"));
        return { article: slug };
    });
}

export default async function Page({
    params: { article },
}: {
    params: { article: string };
}) {
    let markdown;
    let frontMatter;
    try {
        frontMatter = matter(
            await readFile(join(process.cwd(), "articles", article + ".md"))
        );
        markdown = frontMatter.content;
    } catch (e) {
        notFound();
    }

    return (
        <main className="lg:mx-auto lg:w-2/3">
            <h1 className="text-3xl font-bold">{frontMatter.data.title}</h1>
            <Image
                src="/favicon_hq.png"
                height={48}
                width={48}
                className="inline rounded-full"
                alt="Profile image"
            />
            <span className="font-bold">{frontMatter.data.author}</span>
            <span className="font-medium">
                {" "}
                on {frontMatter.data.created?.toLocaleString()}
            </span>

            <CustomMarkdown children={markdown} />
        </main>
    );
}
