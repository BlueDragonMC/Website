import { getLeaderboard } from "@/app/leaderboards/leaderboards";
import { NextRequest, NextResponse } from "next/server";
import { client } from "../mongo";

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

export async function fetchLeaderboard(
    stat: string,
    sort: 1 | -1,
    limit: number = 50
) {
    const filter: { [key: string]: { [key: string]: any } } = {};

    filter[`statistics.${stat}`] = {
        $exists: true,
    };

    return (
        // Get a list of MongoDB documents matching the selection
        (
            await (
                await client
            )
                .db("bluedragon")
                .collection("players")
                .find(filter)
                .sort("statistics." + stat, sort)
                .limit(limit)
                .toArray()
        ).map((row) => ({
            uuid: row._id.toString(),
            username: row["username"],
            value: row["statistics"][stat],
        }))
    );
}

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
