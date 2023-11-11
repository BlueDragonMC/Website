import { client } from "../mongo";

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

export async function fetchPosition(
    username: string,
    stat: string,
    sortDirection: 1 | -1 = -1
) {
    const filter: { [key: string]: { [key: string]: any } } = {};
    const sort: { [key: string]: number } = {};

    filter[`statistics.${stat}`] = {
        $exists: true,
    };

    sort[`statistics.${stat}`] = sortDirection;

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
        statistic: stat,
        position: doc.position,
    };
}
