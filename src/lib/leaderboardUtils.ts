import type { Document, WithId } from "mongodb";
import { client } from "./mongo";

export async function fetchLeaderboard(
  key: string,
  sort: 1 | -1,
  limit: number = 50,
) {
  const filter: { [key: string]: { [key: string]: any } } = {};

  filter[key] = {
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
        .sort(key, sort)
        .limit(limit)
        .toArray()
    ).map((row) => ({
      uuid: row._id.toString(),
      username: row["username"],
      value: getNested<number>(row, key),
    }))
  );
}

export function getNested<T>(row: WithId<Document>, key: string): T {
  const split = key.split(".");
  let value = row;
  for (const part of split) {
    value = value[part];
  }
  return value as unknown as T;
}

export async function fetchPosition(
  username: string,
  key: string,
  sortDirection: 1 | -1 = -1,
) {
  const filter: { [key: string]: { [key: string]: any } } = {};
  const sort: { [key: string]: number } = {};

  filter[key] = {
    $exists: true,
  };

  sort[key] = sortDirection;

  const pos = await (
    await client
  )
    .db("bluedragon")
    .collection("players")
    .aggregate([
      {
        $match: filter,
      },
      {
        $setWindowFields: {
          sortBy: sort,
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
    statistic: key,
    position: doc.position,
  };
}
