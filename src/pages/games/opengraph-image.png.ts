import { generate } from "@/src/lib/og";

export async function GET() {
  return generate({
    title: "Games",
    ogPreview: "All of the minigames on the BlueDragon Minecraft server.",
  });
}
