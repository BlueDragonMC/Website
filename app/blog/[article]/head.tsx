import { readFile } from "fs/promises";
import matter, { GrayMatterFile } from "gray-matter";
import { join } from "path";
import { default as ParentHead } from "@/app/head";
import BaseHead from "@/components/BaseHead";
import { getOGImageURL } from "@/app/utils";

export default async function Head({ params: { article } }: { params: { article: string } }) {

    let frontMatter: GrayMatterFile<Buffer>;
    try {
        frontMatter = matter(await readFile(join(process.cwd(), "articles", article + ".md")));
    } catch (e) {
        // If the article couldn't be found, use the app's <Head> component.
        return (
            <ParentHead />
        )
    }

    return (
        <>
            <BaseHead image={getOGImageURL(frontMatter)} />
            <title>{frontMatter.data.title ? frontMatter.data.title + " | BlueDragon Blog" : "BlueDragon Blog"}</title>
            <meta name="og:title" content={frontMatter.data.title} />
            <meta name="og:description" content={frontMatter.data.description} />
            <meta name="og:type" content="article" />
        </>
    )
}