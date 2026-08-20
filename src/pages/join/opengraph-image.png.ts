import { generate } from "@/src/lib/og";

export async function GET() {
  return generate({
    title: "How To Join BlueDragon",
    ogPreview: "Get started in four simple steps.",
  });
}