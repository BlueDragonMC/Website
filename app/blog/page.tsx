import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";
import { getArticles, getFrontMatter } from "../utils";

export const dynamic = "force-static";

export default async function Page() {
    const articles = (await getArticles()).map((article) => article[0]);

    return (
        <main>
            <h1 className="mb-3 text-3xl font-bold">Blog Posts</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {articles.map((article) => {
                    return (
                        <div key={article}>
                            {/* @ts-expect-error Server Component */}
                            <Article
                                slug={article.substring(
                                    0,
                                    article.indexOf(".md")
                                )}
                            ></Article>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

async function Article({ slug }: { slug: string }) {
    const frontMatter = (await getFrontMatter("articles", slug)) ?? notFound();
    const data = frontMatter.data;

    let base64, img;
    if (data.image) {
        const placeholder = await getPlaiceholder(data.image);
        base64 = placeholder.base64;
        img = placeholder.img;
    }

    const created = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: undefined,
    }).format(data.created);

    return (
        <Link href={"/blog/" + slug}>
            <div
                className={`group rounded-lg bg-gray-200 shadow-lg transition-all hover:bg-gray-300 hover:shadow-2xl dark:bg-neutral-900 dark:hover:bg-neutral-800 md:h-[26rem] ${
                    data.image ? "" : "flex flex-col justify-center"
                }`}
            >
                {img && (
                    <Image
                        src={img}
                        blurDataURL={base64}
                        placeholder="blur"
                        loading="lazy"
                        alt={data["image-alt"] ?? data.title}
                        width={1024}
                        height={0}
                        className="h-48 w-full rounded-t-lg object-cover transition-all group-hover:brightness-75"
                    ></Image>
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
