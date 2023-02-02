import { getFrontMatter } from "@/app/utils";
import CustomMarkdown from "@/components/CustomMarkdown";
import { readdir } from "fs/promises";
import { notFound } from "next/navigation";
import { join } from "path";

export async function generateStaticParams() {
    const pages = await readdir(join(process.cwd(), "static-pages"));

    return pages.map((fileName) => {
        const slug = fileName.substring(0, fileName.lastIndexOf(".md"));
        return { page: slug };
    });
}

export default async function Page({
    params: { page },
}: {
    params: { page: string };
}) {
    const frontMatter =
        (await getFrontMatter("static-pages", page)) ?? notFound();

    return (
        <main className="lg:mx-auto lg:w-2/3">
            <CustomMarkdown children={frontMatter.content} />
        </main>
    );
}
