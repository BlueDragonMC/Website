import { generateRssFeed } from "../generate";

export const dynamic = "error";

export async function GET() {
    return new Response((await generateRssFeed()).json1(), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
