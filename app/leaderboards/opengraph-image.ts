import { generate } from "../utils/og";

export default async function ogImage() {
    return await generate({
        title: "Leaderboards",
        ogPreview:
            "View the top players for any leaderboard online, or join the server and climb the ranks yourself.",
    });
}
