import OpenGraphImage from "@/components/OpenGraphImage";
import OpenGraphURL from "@/components/OpenGraphURL";
import { readFile } from "fs/promises";
import matter, { GrayMatterFile } from "gray-matter";
import { join } from "path";
import { default as ParentHead } from "@/app/head";

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
            <title>{frontMatter.data.title + " | BlueDragon Blog"}</title>
            <meta name="description" content={frontMatter.data.description} />
            <meta name="og:title" content={frontMatter.data.title} />
            <meta name="og:description" content={frontMatter.data.description} />
            <meta name="og:type" content="article" />
            <OpenGraphImage relative={frontMatter.data.image ?? "/favicon_hq.png"} />
            <OpenGraphURL />
        </>
    )
}