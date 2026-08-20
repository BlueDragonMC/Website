import { leaderboards } from "../constants/leaderboards";
import { getNested } from "./leaderboardUtils";
import { client } from "./mongo";
import { LP_HOSTNAME } from "./vars";

export type LuckPermsUserMeta = {
  primaryGroup: string;
  prefix?: string;
  rankcolor?: string;
};

export async function fetchPlayer(username: string) {
  const doc = await (
    await client
  )
    .db("bluedragon")
    .collection("players")
    .findOne({ usernameLower: username.toLowerCase() });

  if (!doc) return null;

  const permissionInfo = await fetchMeta(doc._id.toString());

  const stats: { [key: string]: number } = {};

  for (const leaderboard of leaderboards.flatMap((it) => it.leaderboards)) {
    const value = getNested<number>(doc, leaderboard.stat);
    if (value !== undefined) {
      stats[leaderboard.stat] = value;
    }
  }

  const xp = doc["experience"] as number;
  const level = Math.sqrt(xp / 20);

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
