import { readdir, readFile } from "fs/promises";
import matter, { GrayMatterFile } from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { join } from "path";

const frontMatterCache: { [key: string]: GrayMatterFile<Buffer> } = {};

const getFrontMatter = async (article: string) => {
    if (frontMatterCache.hasOwnProperty(article)) {
        return frontMatterCache[article];
    } else {
        const frontMatter = matter(await readFile(join(process.cwd(), "articles", article)));
        frontMatterCache[article] = frontMatter;
        return frontMatter;
    }
}

export default async function Page() {

    const files = await readdir(join(process.cwd(), "articles"), { withFileTypes: true });
    const tuples: Array<[string, GrayMatterFile<Buffer>]> = (await Promise.all(
        files
            .filter((file) => file.name.includes(".md"))
            .map((file): Promise<[string, GrayMatterFile<Buffer>]> => {
                return new Promise((resolve, reject) => {
                    getFrontMatter(file.name).then((data) => {
                        resolve([file.name, data]);
                    })
                });
            })
    ));

    const articles = tuples
        .sort((a, b) => {
            return b[1].data.created?.getTime() - a[1].data.created?.getTime()
        })
        .map((article) => article[0]);

    return (
        <main>
            <h1 className="text-3xl font-bold mb-3">Blog Posts</h1>
            <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {articles.map((article) => {
                    {/* @ts-expect-error Server Component */}
                    return <Article key={article} slug={article.substring(0, article.indexOf(".md"))}></Article>
                })}
            </div>
        </main>
    )
}

async function Article({ slug }: { slug: string }) {

    const frontMatter = await getFrontMatter(slug + ".md");
    const data = frontMatter.data;

    return (
        <Link href={"/blog/" + slug}>
            <div className={`rounded-lg bg-gray-400 dark:bg-neutral-800 h-96 hover:scale-105 transition-transform ${data.image ? "" : "flex justify-center flex-col"}`}>
                {data.image ? <Image src={data.image} alt={data["image-alt"] ?? data.title} width={1024} height={0} className="object-cover w-full h-48 rounded-t-lg"></Image> : <></>}
                <div className="p-3">
                    <h1 className="text-2xl font-medium mb-auto">{data.title || "Untitled Post"}</h1>
                    <Image src="/favicon_hq.png" height={32} width={32} className="inline rounded-full" alt="Profile image" />
                    <span className="font-medium">{data.author}</span>
                    <p className={`${data.image ? "line-clamp-3" : "line-clamp-6"}`}>{data.description}</p>
                </div>
            </div>
        </Link>
    );
}