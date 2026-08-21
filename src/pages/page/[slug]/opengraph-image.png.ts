import { generate } from "@/src/lib/og";
import { getCollection } from "astro:content";
import type { GetStaticPaths } from "astro";

export const prerender = true;

export const getStaticPaths = (async () => {
  const pages = await getCollection("staticPages");
  return pages.map((page) => ({
    params: { slug: page.id },
  }));
}) satisfies GetStaticPaths;

export async function GET({ params }: { params: { slug: string } }) {
  const page = (await getCollection("staticPages")).find(
    (p) => p.id === params.slug,
  );

  if (!page) return new Response(null, { status: 404 });

  const description = page.data.description;
  const wordCount = (page.body ?? "").split(" ").length;

  const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

  return generate({
    title: page.data.title,
    author: page.data.author,
    ogPreview:
      page.data.ogPreview ??
      description?.substring(0, description.indexOf(".") + 1),
    date: page.data.created
      ? fmt.format(page.data.created)
      : page.data.modified
        ? fmt.format(page.data.modified)
        : undefined,
    readTime: `${Math.max(1, Math.ceil(wordCount / 250))} min read`,
  });
}
