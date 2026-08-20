import { getLeaderboard, leaderboards } from "@/src/constants/leaderboards";
import { generate } from "@/src/lib/og";
import type { GetStaticPaths } from "astro";

export const prerender = true;

export const getStaticPaths = (() => {
  return leaderboards.flatMap((category) =>
    category.leaderboards.map((lb) => ({
      params: { stat: lb.stat.replace(/^statistics\./, "") },
    })),
  );
}) satisfies GetStaticPaths;

export async function GET({ params }: { params: { stat: string } }) {
  const lbInfo =
    getLeaderboard(params.stat) ?? getLeaderboard("statistics." + params.stat);

  if (!lbInfo) return new Response(null, { status: 404 });

  const { leaderboard: lb, category } = lbInfo;

  return generate({
    title: `${category.name}: ${lb.name}`,
    subtitle: category.mode ?? "All modes",
    ogPreview:
      "View the top players for this leaderboard on bluedragonmc.com, or join the server and climb the ranks yourself.",
  });
}
