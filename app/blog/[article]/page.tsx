import CustomMarkdown from "@/components/CustomMarkdown";
import {
    faCalendar,
    faUser,
    faChevronCircleLeft,
    faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { basename, join } from "path";
import { getArticles } from "../../utils";

export const dynamic = "force-static";

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
    const fileName = join(process.cwd(), "articles", article + ".md");
    let markdown;
    let frontMatter;
    try {
        frontMatter = matter(await readFile(fileName));
        markdown = frontMatter.content;
    } catch (e) {
        notFound();
    }

    const created = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: undefined,
    }).format(frontMatter.data.created);

    const articles = await getArticles();
    const currentIndex = articles.findIndex(
        (article) => article[0] === basename(fileName)
    );
    const next = articles[currentIndex + 1];
    const prev = articles[currentIndex - 1];

    return (
        <main className="lg:mx-auto lg:w-2/3">
            <h1 className="text-3xl font-bold">{frontMatter.data.title}</h1>
            <div className="flex flex-wrap items-center pt-3">
                <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 h-4 w-4 align-middle"
                />
                <span className="font-medium">{frontMatter.data.author}</span>
                <FontAwesomeIcon
                    icon={faCalendar}
                    className="mx-2 h-4 w-4 align-middle"
                />
                <span>{created}</span>
            </div>
            <CustomMarkdown children={markdown} />
            <div className="mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
                {prev && (
                    <Link
                        href={
                            "/blog/" +
                            prev[0].substring(0, prev[0].lastIndexOf(".md"))
                        }
                        className="block w-full rounded-md border border-gray-500 p-4 hover:border-2 hover:border-blue-800 hover:p-[calc(1rem-1px)]"
                    >
                        <p className="font-bold">
                            <FontAwesomeIcon
                                icon={faChevronCircleLeft}
                                className="mr-2"
                            />
                            Previous
                        </p>
                        <p className="font-medium">{prev?.[1]?.data?.title}</p>
                    </Link>
                )}
                {next && (
                    <Link
                        href={
                            "/blog/" +
                            next[0].substring(0, next[0].lastIndexOf(".md"))
                        }
                        className="block w-full justify-self-end rounded-md border border-gray-500 p-4 hover:border-2 hover:border-blue-800 hover:p-[calc(1rem-1px)] md:col-start-2 md:text-right"
                    >
                        <p className="flex flex-row-reverse items-center justify-end font-bold md:flex-row">
                            Next
                            <FontAwesomeIcon
                                icon={faChevronCircleRight}
                                className="mr-2 md:mr-0 md:ml-2"
                            />
                        </p>
                        <p className="font-medium">{next?.[1]?.data?.title}</p>
                    </Link>
                )}
            </div>
        </main>
    );
}
