import { generateRssFeed } from "../../../lib/feeds/changelog";
import type { APIContext } from "astro";

export async function GET({ site }: APIContext) {
  return new Response(
    (await generateRssFeed(site?.href.replace(/\/$/, "") ?? "")).atom1(),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
}
