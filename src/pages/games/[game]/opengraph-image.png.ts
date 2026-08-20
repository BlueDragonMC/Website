import { generate } from "@/src/lib/og";
import { games } from "@/src/constants/games";
import type { GetStaticPaths } from "astro";

export const prerender = true;

export const getStaticPaths = (() => {
  return games.map((game) => ({
    params: { game: game.name.toLowerCase().replaceAll(/ /g, "-") },
  }));
}) satisfies GetStaticPaths;

export async function GET({ params }: { params: { game: string } }) {
  const title = decodeURIComponent(params.game).toLowerCase().replaceAll(/-/g, " ");
  const selected = games.find((g) => g.name.toLowerCase() === title);

  if (!selected) return new Response(null, { status: 404 });

  return generate({
    title: selected.name,
    subtitle: "A Minecraft minigame on BlueDragon",
    ogPreview: selected.description,
  });
}