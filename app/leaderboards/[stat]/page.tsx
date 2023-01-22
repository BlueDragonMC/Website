import { BASE_PATH } from "@/app/vars";
import Step from "@/components/Step";
import { notFound } from "next/navigation";
import { Category, Leaderboard, leaderboards } from "../leaderboards"

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

    const response = await fetch(`${BASE_PATH}/api/leaderboard?statistic=${stat}&sort=${obj.sort ?? -1}`).then((response) => response.json());

    if (!response.success) {
        return <main>
            <h1 className="text-3xl font-bold">Leaderboard Failed to Load</h1>
            <pre>
                Statistic: {stat}
                {"\n"}Sort: {obj.sort ?? -1}
            </pre>
        </main>
    }

    const players = response.leaderboard as Array<{ uuid: string, username: string, value: number }>;

    const format = (value: number) => {
        if (!obj?.format || obj.format == "whole_number") {
            return value;
        } else if (obj.format == "time") {
            const date = new Date(value);

            return date.getUTCHours().toString().padStart(2, "0") + ":" +
                date.getUTCMinutes().toString().padStart(2, "0") + ":" +
                date.getUTCSeconds().toString().padStart(2, "0") + "." +
                date.getUTCMilliseconds().toString().padStart(3, "0");
        }
    }

    return <main>
        <h1 className="text-3xl font-bold">{obj.name}</h1>
        <h2 className="text-reg font-medium">{category?.name}</h2>
        <div>
            {players.map((item, i) => {
                return <Step key={i} number={i + 1}>
                    <div className="inline-flex justify-between w-72 md:w-96">
                        <span>{item.username}</span>
                        <span>{format(item.value)}</span>
                    </div>
                </Step>
            })}
        </div>
    </main>
}