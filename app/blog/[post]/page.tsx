import "photoswipe/dist/photoswipe.css";
import React from "react";
import MDX from "@/components/mdx/MDX";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import {
    faChevronCircleLeft,
    faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getArticles, getFrontMatter } from "@/app/utils/articles";
import { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata({
    params: { post },
}: {
    params: { post: string };
}): Promise<Metadata> {
    const article = await getFrontMatter("articles", post);
    if (!article) return {};
    return {
        title: {
            absolute: article.data.title
                ? `${article.data.title} | BlueDragon Blog`
                : "BlueDragon Blog",
        },
        description: article.data.description,
        openGraph: {
            type: "article",
            authors: article.data.author,
            publishedTime: article.data.created.toISOString(),
            modifiedTime: article.data.modified.toISOString(),
            title: {
                absolute: article.data.title
                    ? `${article.data.title} | BlueDragon Blog`
                    : "BlueDragon Blog",
            },
            description: article.data.description,
        },
    };
}

export async function generateStaticParams() {
    return (await getArticles("articles")).map((article) => {
        return {
            post: article[0],
        };
    });
}

export default async function Page({
    params: { post },
}: {
    params: { post: string };
}) {
    const articles = await getArticles();
    const currentIndex = articles.findIndex((other) => other[0] === post);
    const next = articles[currentIndex + 1];
    const prev = articles[currentIndex - 1];

    return (
        <main className="prose mx-auto max-w-prose dark:prose-invert">
            {/* @ts-expect-error Server Component */}
            <MDX dirName="articles" slug={post} />
            <div className="not-prose mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
                {prev && (
                    <Link
                        href={"/blog/" + prev[0]}
                        className="block w-full rounded-md border border-gray-500 p-4 hover:border-2 hover:border-blue-800 hover:p-[calc(1rem-1px)]"
                    >
                        <p className="font-bold">
                            <FontAwesomeIcon
                                icon={faChevronCircleLeft}
                                className="mr-2 h-4 w-4"
                            />
                            Previous
                        </p>
                        <p className="font-medium">{prev?.[1]?.data?.title}</p>
                    </Link>
                )}
                {next && (
                    <Link
                        href={"/blog/" + next[0]}
                        className="block w-full justify-self-end rounded-md border border-gray-500 p-4 hover:border-2 hover:border-blue-800 hover:p-[calc(1rem-1px)] md:col-start-2 md:text-right"
                    >
                        <p className="flex flex-row-reverse items-center justify-end font-bold md:flex-row">
                            Next
                            <FontAwesomeIcon
                                icon={faChevronCircleRight}
                                className="mr-2 h-4 w-4 md:mr-0 md:ml-2"
                            />
                        </p>
                        <p className="font-medium">{next?.[1]?.data?.title}</p>
                    </Link>
                )}
            </div>
        </main>
    );
}
