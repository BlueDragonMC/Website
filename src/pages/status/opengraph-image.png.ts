import { generate } from "@/src/lib/og";

export async function GET() {
  return generate({
    title: "Server Status",
    ogPreview:
      "Check if the Minecraft server is up, and view player counts and network latency.",
  });
}
