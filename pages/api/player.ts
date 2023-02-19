import { getLeaderboard } from "@/app/leaderboards/leaderboards";
import { LP_HOSTNAME, MONGO_HOSTNAME } from "@/app/vars";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export type PlayerResponse = {
    uuid: string;
    username: string;
    stats: { [key: string]: number };
    firstLogin: Date;
    lastLogin: Date;
};

export type LuckPermsUserMeta = {
    primaryGroup: string;
    prefix?: string;
    rankcolor?: string;
};

const client = new MongoClient(MONGO_HOSTNAME, {
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000,
}).connect();

export async function fetchPlayer(username: string) {
    const doc = await (await client)
        .db("bluedragon")
        .collection("players")
        .findOne({ usernameLower: username.toLowerCase() });

    if (!doc) return null;

    const permissionInfo = await fetchMeta(doc._id.toString());

    const stats: { [key: string]: number } = {};
    Object.keys(doc["statistics"]).forEach((stat) => {
        if (getLeaderboard(stat) !== null) {
            stats[stat] = doc["statistics"][stat];
        }
    });

    const xp = doc["experience"] as number;
    const level =
        xp < 45000
            ? Math.log(xp / 1000 + 1) / Math.log(1.2) + 1
            : xp / 10000 + 18;

    return {
        username: doc["username"],
        uuid: doc._id.toString(),
        stats: stats,
        firstLogin: doc["firstJoinDate"],
        lastLogin: doc["lastJoinDate"],
        xp: xp,
        cosmeticCount: doc["cosmetics"].length,
        level: level,
        coins: doc["coins"],
        meta: permissionInfo,
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PlayerResponse | string>
) {
    const username = req.query.username as string;

    if (!username) {
        return res.status(400).send("Bad request");
    }

    const info = await fetchPlayer(username);

    if (!info) {
        return res.status(404).send("Not found");
    }

    return res.send(info);
}

async function fetchMeta(uuid: string) {
    try {
        const res = await fetch(`${LP_HOSTNAME}/user/${uuid}/meta`);
        if (!res.ok) {
            return null;
        }
        const json = await res.json();
        return {
            // Only include these allowed keys
            prefix: json.prefix,
            primaryGroup: json.primaryGroup,
            rankcolor: json.meta.rankcolor,
        } as LuckPermsUserMeta;
    } catch {
        return null;
    }
}
