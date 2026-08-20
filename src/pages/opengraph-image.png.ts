import { generate } from "@/src/lib/og";

export async function GET() {
  return generate({
    title: "BlueDragon",
    ogPreview:
      "BlueDragon is a Minecraft server that strives to produce high-quality, original content. Join for free to explore unique minigames like Paintbrawl, WackyMaze, and more!",
  });
}
