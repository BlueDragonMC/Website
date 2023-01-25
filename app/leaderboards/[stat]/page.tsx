import { BASE_PATH } from "@/app/vars";
import Step from "@/components/Step";
import { LeaderboardResponse } from "@/pages/api/leaderboard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Category, format, Leaderboard, leaderboards } from "../leaderboards"

export default async function Page({ params: { stat } }: { params: { stat: string } }) {

    let obj: Leaderboard | undefined, category: Category | undefined;
    for (const cat of leaderboards) {
        for (const lb of cat.leaderboards) {
            if (lb.stat == stat) {
                obj = lb;
                category = cat;
            }
        }
    }

    if (!obj) {
        notFound();
    }

    const res = await fetch(`${BASE_PATH}/api/leaderboard?statistic=${stat}&sort=${obj.sort ?? -1}`);
    if (res.ok) {
        const json = await res.json() as LeaderboardResponse;
        return <main>
            <h1 className="text-3xl font-bold">{obj.name}</h1>
            <h2 className="text-reg font-medium">{category?.name}</h2>
            <div>
                {json.leaderboard?.map((item, i) => {
                    return <Step key={i} number={i + 1}>
                        <div className="inline-flex justify-between w-72 md:w-96">
                            <span><Link href={`/player/${item.username}`} className="underline font-medium">{item.username}</Link></span>
                            <span>{format(obj?.format, item.value)}</span>
                        </div>
                    </Step>
                })}
            </div>
        </main>
    }

    return <main>
        <h1 className="text-3xl font-bold">Leaderboard Failed to Load</h1>
        <p>
            Please try again later, or <Link href="/leaderboards" className="underline font-medium">click here</Link> to go back.
        </p>
    </main>
}