import { getLeaderboard } from "@/src/constants/leaderboards";
import { fetchLeaderboard } from "@/src/lib/leaderboardUtils";

export const prerender = false;

export type LeaderboardResponse = {
  statistic?: string;
  sort?: number;
  leaderboard?: Array<{
    username: string;
    uuid: string;
    value: number;
  }>;
};

export async function GET({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;
  const stat = searchParams.get("statistic");
  const lbEntry = stat
    ? (getLeaderboard(stat) ?? getLeaderboard("statistics." + stat))
    : null;
  if (!stat || !lbEntry) {
    return new Response("Bad request", { status: 400 });
  }

  const sort = searchParams.get("sort") == "1" ? 1 : -1;

  const lb = await fetchLeaderboard(lbEntry.leaderboard.stat, sort);

  return Response.json(
    {
      statistic: stat,
      sort: sort,
      leaderboard: lb,
    },
    { status: 200 },
  );
}
