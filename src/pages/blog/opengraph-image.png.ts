import { generate } from "@/src/lib/og";

export async function GET() {
  return generate({
    title: "Blog",
    ogPreview: "Check out all the latest updates from the BlueDragon team.",
  });
}