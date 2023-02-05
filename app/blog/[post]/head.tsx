import { default as ParentHead } from "@/app/head";
import BaseHead from "@/components/BaseHead";
import { getFrontMatter, getOGImageURL } from "@/app/utils";

export default async function Head({
    params: { post },
}: {
    params: { post: string };
}) {
    const frontMatter = await getFrontMatter("articles", post);

    if (!frontMatter) {
        return <ParentHead />;
    }

    return (
        <>
            <BaseHead image={getOGImageURL(frontMatter)} />
            <title>
                {frontMatter.data.title
                    ? frontMatter.data.title + " | BlueDragon Blog"
                    : "BlueDragon Blog"}
            </title>
            <meta name="og:title" content={frontMatter.data.title} />
            <meta
                name="og:description"
                content={frontMatter.data.description}
            />
            <meta name="og:type" content="article" />
            <meta name="og:author" content={frontMatter.data.author} />
            <meta
                name="og:article:published_time"
                content={frontMatter.data.created.toISOString()}
            />
            <meta
                name="og:article:modified_time"
                content={frontMatter.data.modified.toISOString()}
            />
        </>
    );
}
