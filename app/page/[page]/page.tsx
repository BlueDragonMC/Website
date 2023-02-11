import { getArticles, getFrontMatter } from "@/app/utils/articles";
import { getArticleOGImageURL } from "@/app/utils/og";
import { BASE_PATH } from "@/app/vars";
import MDX from "@/components/mdx/MDX";
import { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata({
    params: { page },
}: {
    params: { page: string };
}): Promise<Metadata> {
    const article = await getFrontMatter("static-pages", page);
    if (!article) return {};

    return {
        title: article.data.title,
        description: article.data.description,
        openGraph: {
            type: "article",
            authors: article.data.author,
            publishedTime: article.data.created?.toISOString(),
            modifiedTime: article.data.modified?.toISOString(),
            title: {
                absolute: article.data.title
                    ? `${article.data.title} | BlueDragon`
                    : "BlueDragon",
            },
            description: article.data.description,
            images: [
                article.data.image
                    ? new URL(article.data.image, BASE_PATH)
                    : getArticleOGImageURL(article),
            ],
        },
    };
}

export async function generateStaticParams() {
    return (await getArticles("static-pages")).map((article) => {
        return {
            page: article[0],
        };
    });
}

export default async function Page({
    params: { page },
}: {
    params: { page: string };
}) {
    return (
        <main className="prose mx-auto max-w-prose dark:prose-invert">
            {/* @ts-expect-error Server Component */}
            <MDX dirName="static-pages" slug={page} />
        </main>
    );
}
