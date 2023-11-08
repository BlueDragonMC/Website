import { getLeaderboard } from "@/app/leaderboards/leaderboards";
import { NextRequest, NextResponse } from "next/server";
import { client } from "../../mongo";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export async function fetchPosition(
    username: string,
    stat: string,
    sortDirection: 1 | -1 = -1
) {
    const pos = await (
        await client
    )
        .db("bluedragon")
        .collection("players")
        .aggregate([
            {
                $match: {
                    [`statistics.${stat}`]: {
                        $exists: true,
                    },
                },
            },
            {
                $setWindowFields: {
                    sortBy: {
                        [`statistics.${stat}`]: sortDirection,
                    },
                    output: {
                        position: {
                            $documentNumber: {},
                        },
                    },
                },
            },
            {
                $match: {
                    username: username,
                },
            },
            {
                $project: {
                    position: 1,
                    uuid: 1,
                    username: 1,
                },
            },
        ])
        .toArray();

    if (pos.length !== 1) {
        return undefined;
    }

    const doc = pos[0];

    return {
        uuid: doc._id,
        username: doc.username,
        statistic: stat,
        position: doc.position,
    };
}

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
