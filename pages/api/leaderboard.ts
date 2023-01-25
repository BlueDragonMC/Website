import { getLeaderboard } from '@/app/leaderboards/leaderboards'
import { MONGO_HOSTNAME } from '@/app/vars'
import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export type LeaderboardResponse = {
    statistic?: string,
    sort?: number,
    leaderboard?: Array<{
        username: string,
        uuid: string,
        value: number
    }>
}

const client = new MongoClient(MONGO_HOSTNAME, {
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000
}).connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LeaderboardResponse>
) {
    const stat = Array.isArray(req.query.statistic) ? req.query.statistic[0] : req.query.statistic;
    if (!stat || getLeaderboard(stat) === null) {
        return res.status(400).send({ message: "Bad request" } as unknown as LeaderboardResponse);
    }
    const filter: { [key: string]: { [key: string]: any } } = {};
    const sort = req.query.sort == "1" ? 1 : -1;
    filter["statistics." + stat] = { "$exists": true };
    const documents = await (await client).db("bluedragon")
        .collection("players")
        .find(filter)
        .sort("statistics." + stat, sort)
        .limit(10)
        .toArray();
    const lb = documents
        .map((row) => {
            return {
                uuid: row._id.toString(),
                username: row["username"],
                value: row["statistics"][stat]
            };
        });
    return res.send({
        statistic: stat,
        sort: sort,
        leaderboard: lb
    });
}