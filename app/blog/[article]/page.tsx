import CustomMarkdown from "@/components/CustomMarkdown";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import {
    faCalendar,
    faUser,
    faChevronCircleLeft,
    faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getFrontMatter } from "../../utils";

export const dynamic = "force-static";

export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((article) => {
        return {
            article: article[0],
        };
    });
}

export default async function Page({
    params: { article },
}: {
    params: { article: string };
}) {
    const frontMatter =
        (await getFrontMatter("articles", article)) ?? notFound();

    const created = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: undefined,
    }).format(frontMatter.data.created);

    const articles = await getArticles();
    const currentIndex = articles.findIndex((other) => other[0] === article);
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
            <CustomMarkdown children={frontMatter.content} />
            <div className="mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
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
