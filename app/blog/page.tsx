import { readdir } from "fs/promises";
import { GrayMatterFile } from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { join } from "path";
import { getPlaiceholder } from "plaiceholder";
import { getFrontMatter } from "../utils";

export default async function Page() {
    const files = await readdir(join(process.cwd(), "articles"), {
        withFileTypes: true,
    });
    const tuples: Array<[string, GrayMatterFile<Buffer>]> = await Promise.all(
        files
            .filter((file) => file.name.includes(".md"))
            .map((file): Promise<[string, GrayMatterFile<Buffer>]> => {
                return new Promise((resolve, reject) => {
                    getFrontMatter(
                        "articles",
                        file.name.substring(0, file.name.lastIndexOf(".md"))
                    )
                        .then((data) => {
                            resolve([
                                file.name,
                                data as GrayMatterFile<Buffer>,
                            ]);
                        })
                        .catch((err) => reject(err));
                });
            })
    );

    const articles = tuples
        .sort((a, b) => {
            return b[1].data.created?.getTime() - a[1].data.created?.getTime();
        })
        .map((article) => article[0]);

    return (
        <main>
            <h1 className="mb-3 text-3xl font-bold">Blog Posts</h1>
            <div className="grid grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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

    return (
        <Link href={"/blog/" + slug}>
            <div
                className={`h-96 rounded-lg bg-gray-400 transition-transform hover:scale-105 dark:bg-neutral-800 ${
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
                        className="h-48 w-full rounded-t-lg object-cover"
                    ></Image>
                )}
                <div className="p-3">
                    <h1 className="mb-auto text-2xl font-medium">
                        {data.title || "Untitled Post"}
                    </h1>
                    <Image
                        src="/favicon_hq.png"
                        height={32}
                        width={32}
                        className="inline rounded-full"
                        alt="Profile image"
                    />
                    <span className="font-medium">{data.author}</span>
                    <p
                        className={`${
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
