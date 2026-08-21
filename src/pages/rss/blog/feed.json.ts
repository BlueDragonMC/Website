import { generateRssFeed } from "../../../lib/feeds/blog";
import type { APIContext } from "astro";

export async function GET({ site }: APIContext) {
  return new Response(
    (await generateRssFeed(site?.href.replace(/\/$/, "") ?? "")).json1(),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
