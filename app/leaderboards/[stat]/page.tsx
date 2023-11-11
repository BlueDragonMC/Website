import { fetchLeaderboard } from "@/app/api/leaderboard/leaderboardUtils";
import Step from "@/components/Step";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format, getLeaderboard } from "../leaderboards";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params: { stat },
}: {
    params: { stat: string };
}): Promise<Metadata> {
    const lbInfo = getLeaderboard(stat);

    if (!lbInfo) return {};

    const { leaderboard: lb, category: cat } = lbInfo;

    return {
        title: `${cat.name}: ${lb.name}`,
        description: `View the top players for the ${cat.name} ${lb.name} leaderboard online, or join the server and climb the ranks yourself.`,
        openGraph: {
            type: "article",
            title: {
                absolute: `${cat.name}: ${lb.name} | BlueDragon`,
            },
            description: `View the top players for the ${cat.name} ${lb.name} leaderboard online, or join the server and climb the ranks yourself.`,
        },
    };
}

export default async function Page({
    params: { stat },
}: {
    params: { stat: string };
}) {
    const lb = getLeaderboard(stat);

    if (!lb) {
        notFound();
    }
    const { leaderboard: obj, category } = lb;

    const result = await fetchLeaderboard(stat, lb.leaderboard.sort ?? -1);

    return (
        <main>
            <h1 className="text-center text-3xl font-bold">{obj.name}</h1>
            <h2 className="text-center text-xl">
                {category?.mode
                    ? `${category?.name}: ${category?.mode}`
                    : category?.name}
            </h2>
            <div className="mx-auto w-max">
                {result?.map((item, i) => {
                    return (
                        <Step key={i} number={i + 1}>
                            <div className="inline-flex w-72 justify-between md:w-96">
                                <span>
                                    <Link
                                        href={`/player/${item.username}`}
                                        className="font-medium underline"
                                    >
                                        {item.username}
                                    </Link>
                                </span>
                                <span>{format(obj?.format, item.value)}</span>
                            </div>
                        </Step>
                    );
                })}
            </div>
        </main>
    );
}
