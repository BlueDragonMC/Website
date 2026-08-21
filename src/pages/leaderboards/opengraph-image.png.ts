import { generate } from "@/src/lib/og";

export async function GET() {
  return generate({
    title: "Leaderboards",
    ogPreview:
      "View the top players for any leaderboard online, or join the server and climb the ranks yourself.",
  });
}
