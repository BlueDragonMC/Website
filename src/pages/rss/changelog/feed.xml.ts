import { generateRssFeed } from "../../../lib/feeds/changelog";
import type { APIContext } from "astro";

export async function GET({ site }: APIContext) {
  return new Response(
    (await generateRssFeed(site?.href.replace(/\/$/, "") ?? "")).rss2(),
    {
      headers: {
        "Content-Type": "application/rss+xml",
      },
    }
  );
}