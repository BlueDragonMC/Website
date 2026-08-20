import { getLeaderboard } from "@/src/constants/leaderboards";
import { fetchPosition } from "@/src/lib/leaderboardUtils";

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const search = new URL(request.url).searchParams;
  const username = search.get("username")?.toLowerCase();
  const stat = search.get("statistic")?.toLowerCase();
  const sortDirection = search.get("sort")?.toLowerCase() == "1" ? 1 : -1;

  const lbEntry = stat
    ? (getLeaderboard(stat) ?? getLeaderboard("statistics." + stat))
    : null;

  if (
    !username ||
    !stat ||
    (sortDirection !== 1 && sortDirection !== -1) ||
    lbEntry === null
  ) {
    return new Response("Bad request", { status: 400 });
  }

  const response = await fetchPosition(
    username,
    lbEntry.leaderboard.stat,
    sortDirection,
  );
  if (response === undefined) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json(response, { status: 200 });
}
