import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import { faCalendar, faRss, faUser } from "@fortawesome/free-solid-svg-icons";
import { readFile } from "fs/promises";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import { getPlaiceholder } from "plaiceholder";
import { getArticles, getFrontMatter } from "../utils/articles";

export const dynamic = "force-static";

export default async function Page() {
    const articles = (await getArticles()).map((article) => article[0]);

    return (
        <main className="mx-auto max-w-prose px-4">
            <h1 className="mb-3 text-3xl font-bold">Blog Posts</h1>
            <p className="my-4">
                <Link href="/rss/blog/feed.xml" target="_blank">
                    <FontAwesomeIcon icon={faRss} className="mr-1" />
                    RSS
                </Link>{" "}
                &middot;{" "}
                <Link href="/rss/blog/atom.xml" target="_blank">
                    Atom
                </Link>{" "}
                &middot;{" "}
                <Link href="/rss/blog/feed.json" target="_blank">
                    JSON
                </Link>
            </p>
            <div className="flex flex-col gap-10">
                {articles.map((article) => {
                    return <Article slug={article} key={article} />;
                })}
            </div>
        </main>
    );
}

async function Article({ slug }: { slug: string }) {
    const frontMatter = (await getFrontMatter("articles", slug)) ?? notFound();
    const data = frontMatter.data;

    let base64, metadata;
    if (data.image) {
        const placeholder = await getPlaiceholder(
            await readFile(path.join("./public", data.image))
        );
        base64 = placeholder.base64;
        metadata = placeholder.metadata;
    }

    const created = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: undefined,
    }).format(data.created);

    return (
        <Link href={"/blog/" + slug}>
            <div className="group rounded-lg bg-gray-200 shadow-lg transition-all hover:bg-gray-300 hover:shadow-2xl dark:bg-neutral-900 dark:hover:bg-neutral-800">
                {metadata && (
                    <Image
                        src={data.image}
                        blurDataURL={base64}
                        placeholder="blur"
                        loading="lazy"
                        alt={data["image-alt"] ?? data.title}
                        width={1024}
                        height={0}
                        className="h-24 w-full rounded-t-lg object-cover transition-all group-hover:brightness-75"
                    />
                )}
                <div className="p-3">
                    <h1 className="mb-auto text-2xl font-medium">
                        {data.title || "Untitled Post"}
                    </h1>
                    <div className="flex flex-wrap items-center py-3">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="mr-2 h-4 w-4 align-middle"
                        />
                        <span className="font-medium">{data.author}</span>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="mx-2 h-4 w-4 align-middle"
                        />
                        <span>{created}</span>
                    </div>
                    <p
                        className={`text-gray-800 dark:text-gray-300 ${
                            data.image ? "line-clamp-3" : "line-clamp-6"
                        }`}
                    >
                        {data.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
