import { getArticles } from "@/app/utils";
import MDX from "@/components/mdx/MDX";

export const dynamic = "force-static";

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
