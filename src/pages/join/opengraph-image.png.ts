import { generate } from "@/src/lib/og";

export async function GET() {
  return generate({
    title: "How To Join BlueDragon",
    ogPreview:
      "Join the BlueDragon Minecraft server in minutes: just add bluedragonmc.com as a server in Minecraft and start playing!",
  });
}
