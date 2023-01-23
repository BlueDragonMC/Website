import { default as ParentHead } from "@/app/head";
import { getFrontMatter } from "@/app/utils";
import BaseHead from "@/components/BaseHead";

export default async function Head({ params: { page } }: { params: { page: string } }) {

    const frontMatter = await getFrontMatter("static-pages", page);
    if (!frontMatter) return <ParentHead />;

    return (
        <>
            <BaseHead image={frontMatter.data.image} />
            <title>{frontMatter.data.title ? frontMatter.data.title + " | BlueDragon" : "BlueDragon"}</title>
            <meta name="og:title" content={frontMatter.data.title} />
            <meta name="og:description" content={frontMatter.data.description} />
            <meta name="og:type" content="article" />
        </>
    );
}