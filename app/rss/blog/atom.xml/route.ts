import { generateRssFeed } from "../generate";

export const dynamic = "error";

export async function GET() {
    return new Response((await generateRssFeed()).atom1(), {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
