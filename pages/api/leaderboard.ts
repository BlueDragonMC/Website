import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    success: boolean,
    message?: string,
    statistic?: string,
    sort?: number,
    leaderboard?: Array<{
        username: string,
        uuid: string,
        value: number
    }>
}

const hostname = process.env.MONGO_HOSTNAME ?? "mongodb://localhost:27017";
const client = new MongoClient(hostname, {
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000
}).connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const stat = Array.isArray(req.query.statistic) ? req.query.statistic[0] : req.query.statistic;
    if (!stat) {
        return res.status(400).send({ success: false, message: "Bad Request" });
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
        success: true,
        statistic: stat,
        sort: sort,
        leaderboard: lb
    });
}