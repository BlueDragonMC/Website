import { getLeaderboard } from "@/app/leaderboards/leaderboards";
import { NextRequest, NextResponse } from "next/server";
import { fetchLeaderboard } from "./leaderboardUtils";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export type LeaderboardResponse = {
    statistic?: string;
    sort?: number;
    leaderboard?: Array<{
        username: string;
        uuid: string;
        value: number;
    }>;
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const stat = searchParams.get("statistic");
    if (!stat || getLeaderboard(stat) === null) {
        return new Response("Bad request", { status: 400 });
    }

    const sort = searchParams.get("sort") == "1" ? 1 : -1;

    const lb = await fetchLeaderboard(stat, sort);

    return NextResponse.json(
        {
            statistic: stat,
            sort: sort,
            leaderboard: lb,
        },
        { status: 200 }
    );
}
