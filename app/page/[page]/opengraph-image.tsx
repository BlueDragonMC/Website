import { getFrontMatter } from "@/app/utils/articles";
import { generate } from "@/app/utils/og";
import { BASE_PATH } from "@/app/vars";
import { notFound, redirect } from "next/navigation";

export default async function OG({
    params: { page: slug },
}: {
    params: { page: string };
}) {
    const page = await getFrontMatter("static-pages", slug);

    if (!page) {
        notFound();
    }

    if (page?.data.image) {
        redirect(BASE_PATH + page?.data.image);
    }

    const { title, author, ogPreview, description, created, modified } =
        page.data;

    const wordCount = page.content.split(" ").length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 250))} min read`;

    const fmt = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
    });

    const createdStr = created ? fmt.format(created) : undefined;
    const modifiedStr = modified ? fmt.format(modified) : undefined;

    return generate({
        title,
        author,
        ogPreview:
            ogPreview ?? description.substring(0, description.indexOf(".") + 1),
        date: createdStr ?? modifiedStr,
        readTime,
    });
}
