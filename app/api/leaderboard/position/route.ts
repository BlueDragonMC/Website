import { getLeaderboard } from "@/app/leaderboards/leaderboards";
import { NextRequest, NextResponse } from "next/server";
import { fetchPosition } from "../leaderboardUtils";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get("username")?.toLowerCase();
    const stat = req.nextUrl.searchParams.get("statistic")?.toLowerCase();
    const sortDirection =
        req.nextUrl.searchParams.get("sort")?.toLowerCase() == "1" ? 1 : -1;

    if (
        !username ||
        !stat ||
        (sortDirection !== 1 && sortDirection !== -1) ||
        getLeaderboard(stat) === null
    ) {
        return new Response("Bad request", { status: 400 });
    }

    const response = await fetchPosition(username, stat, sortDirection);
    if (response === undefined) {
        return new Response("Not found", { status: 404 });
    }
    return NextResponse.json(response, { status: 200 });
}
