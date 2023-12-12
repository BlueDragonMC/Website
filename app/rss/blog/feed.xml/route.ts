import { generateRssFeed } from "../generate";

export const dynamic = "error";

export async function GET() {
    return new Response((await generateRssFeed()).rss2(), {
        headers: {
            "Content-Type": "application/rss+xml",
        },
    });
}
