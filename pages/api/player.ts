import { getLeaderboard } from '@/app/leaderboards/leaderboards';
import { MONGO_HOSTNAME } from '@/app/vars';
import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export type PlayerResponse = {
    uuid: string,
    username: string,
    stats: { [key: string]: number },
    firstLogin: Date,
    lastLogin: Date
}

const client = new MongoClient(MONGO_HOSTNAME, {
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000
}).connect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PlayerResponse>
) {
    const username = req.query.username as string;

    if (!username) {
        return res.status(400).send({ message: "Bad Request" } as unknown as PlayerResponse);
    }

    const doc = await (await client).db("bluedragon")
        .collection("players")
        .findOne({ usernameLower: username.toLowerCase() })

    if (!doc) {
        return res.status(404).send({ message: "Not found" } as unknown as PlayerResponse);
    }

    const stats: { [key: string]: number } = {};
    Object.keys(doc["statistics"]).forEach((stat) => {
        if (getLeaderboard(stat) !== null) {
            stats[stat] = doc["statistics"][stat];
        }
    });

    return res.send({
        username: doc["username"],
        uuid: doc._id.toString(),
        stats: stats,
        firstLogin: doc["firstJoinDate"],
        lastLogin: doc["lastJoinDate"]
    });
}