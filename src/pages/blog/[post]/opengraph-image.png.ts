import { generate } from "@/src/lib/og";
import { getCollection } from "astro:content";
import type { APIContext, GetStaticPaths } from "astro";

export const prerender = true;

export const getStaticPaths = (async () => {
  const articles = await getCollection("blog");
  return articles.map((article) => ({
    params: { post: article.id },
  }));
}) satisfies GetStaticPaths;

export async function GET({ params, site }: APIContext) {
  const article = (await getCollection("blog")).find((a) => a.id === params.post);

  if (!article) return new Response(null, { status: 404 });

  if (article.data.image) {
    return Response.redirect(
      new URL((article.data.image as any).src, site).href,
      307
    );
  }

  const description = article.data.description;
  const wordCount = (article.body ?? "").split(" ").length;

  const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

  return generate({
    title: article.data.title,
    author: article.data.author,
    ogPreview: description.substring(0, description.indexOf(".") + 1),
    date: article.data.created
      ? fmt.format(article.data.created)
      : article.data.modified
        ? fmt.format(article.data.modified)
        : undefined,
    readTime: `${Math.max(1, Math.ceil(wordCount / 250))} min read`,
  });
}