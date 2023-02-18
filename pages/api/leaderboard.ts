import { getLeaderboard } from "@/app/leaderboards/leaderboards";
import { MONGO_HOSTNAME } from "@/app/vars";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export type LeaderboardResponse = {
    statistic?: string;
    sort?: number;
    leaderboard?: Array<{
        username: string;
        uuid: string;
        value: number;
    }>;
};

const client = new MongoClient(MONGO_HOSTNAME, {
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000,
}).connect();

export async function fetchLeaderboard(
    stat: string,
    sort: 1 | -1,
    limit: number = 50
) {
    const filter: { [key: string]: { [key: string]: any } } = {};

    filter[`statistics.${stat}`] = {
        $exists: true,
    };

    const _client = await client;
    return (
        // Get a list of MongoDB documents matching the selection
        (
            await _client
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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LeaderboardResponse | string>
) {
    const stat = Array.isArray(req.query.statistic)
        ? req.query.statistic[0]
        : req.query.statistic;
    if (!stat || getLeaderboard(stat) === null) {
        return res.status(400).send("Bad request");
    }

    const sort = req.query.sort == "1" ? 1 : -1;

    const lb = await fetchLeaderboard(stat, sort);

    return res.send({
        statistic: stat,
        sort: sort,
        leaderboard: lb,
    });
}
