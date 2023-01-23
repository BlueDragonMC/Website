import OpenGraphImage from "@/components/OpenGraphImage";
import OpenGraphURL from "@/components/OpenGraphURL";
import { default as ParentHead } from "@/app/head";
import { getFrontMatter } from "@/app/utils";

export default async function Head({ params: { page } }: { params: { page: string } }) {

    const frontMatter = await getFrontMatter("pages", page);
    if (!frontMatter) return <ParentHead />;

    return (
        <>
            <title>{frontMatter.data.title ? frontMatter.data.title + " | BlueDragon" : "BlueDragon"}</title>
            <meta name="description" content={frontMatter.data.description} />
            <meta name="og:title" content={frontMatter.data.title} />
            <meta name="og:description" content={frontMatter.data.description} />
            <meta name="og:type" content="article" />
            <OpenGraphImage relative={frontMatter.data.image ?? "/favicon_hq.png"} />
            <OpenGraphURL />
        </>
    )
}