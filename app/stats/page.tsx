import { client } from "../api/mongo";

export const revalidate = 60; // Update every minute

const format = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "long",
});

export default async function Page() {
    const uniquePlayers = await (await client)
        .db("bluedragon")
        .collection("players")
        .countDocuments();

    const cosmeticsBought = await (
        await client
    )
        .db("bluedragon")
        .collection("players")
        .aggregate([
            {
                $unwind: {
                    path: "$cosmetics",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $count: "count",
            },
        ])
        .toArray();

    const coins = await (
        await client
    )
        .db("bluedragon")
        .collection("players")
        .aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$coins",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ])
        .toArray();

    const statsRecorded = await (
        await client
    )
        .db("bluedragon")
        .collection("players")
        .aggregate([
            {
                $addFields: {
                    numStats: {
                        $size: {
                            $objectToArray: "$statistics",
                        },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$numStats",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ])
        .toArray();

    return (
        <main className="prose mx-auto dark:prose-invert">
            <h1>Stats</h1>
            <p>Last updated: {format.format(new Date())}</p>
            <ul>
                <li>Unique players: {uniquePlayers}</li>
                <li>Cosmetics bought: {cosmeticsBought[0].count}</li>
                <li>Statistic data points: {statsRecorded[0].total}</li>
                <li>Coins: {coins[0].total}</li>
            </ul>
        </main>
    );
}
