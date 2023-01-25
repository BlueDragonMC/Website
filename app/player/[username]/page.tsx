import { format, leaderboards } from "@/app/leaderboards/leaderboards";
import { BASE_PATH } from "@/app/vars";
import { PlayerResponse } from "@/pages/api/player";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeAgo from "javascript-time-ago";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import en from "javascript-time-ago/locale/en";
import { PropsWithChildren } from "react";

TimeAgo.addDefaultLocale(en);

export default async function Player({ params: { username } }: { params: { username: string } }) {
    const res = await fetch(`${BASE_PATH}/api/player?username=${encodeURIComponent(username)}`);

    if (!res.ok) {
        if (res.status == 404) {
            notFound();
        } else {
            throw new Error("Internal server error");
        }
    }

    const info = (await res.json()) as PlayerResponse;

    const formatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "long",
        timeStyle: "long"
    });

    const nonDashedUUID = info.uuid.replaceAll(/-/g, "");
    const timeAgo = new TimeAgo("en-US");

    return (
        <main>
            <h1 className="text-3xl font-bold">
                <Image src={`https://minotar.net/helm/${nonDashedUUID}/32`} alt={"Minecraft player head"} width={32} height={32} className="inline rounded-sm align-middle" />
                <span className="ml-2">{username}</span>
            </h1>

            <Link className="inline-block bg-black text-white dark:bg-white dark:text-black rounded-md my-4 p-2 text-sm" href={`https://namemc.com/profile/${info.uuid}`} rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon width={14} height={14} className="inline" icon={faUpRightFromSquare} /> NameMC
            </Link>

            <Statistic name="First Login" value={info.firstLogin ? timeAgo.format(info.firstLogin) : undefined}>
                <span title={info.firstLogin ? formatter.format(info.firstLogin) : "Unknown"}>{info.firstLogin ? timeAgo.format(info.firstLogin) : "-"}</span>
            </Statistic>
            <Statistic name="Last Login" value={info.lastLogin ? timeAgo.format(info.lastLogin) : undefined}>
                <span title={info.lastLogin ? formatter.format(info.lastLogin) : "Unknown"}>{info.lastLogin ? timeAgo.format(info.lastLogin) : "-"}</span>
            </Statistic>
            {leaderboards.map((category) => (
                <div key={category.name}>
                    <h1 className="text-2xl font-bold">{category.name}</h1>
                    {category.leaderboards.map((lb) => (
                        <Statistic name={lb.statName ?? lb.name} stat={lb.stat} key={lb.stat} value={format(lb.format, info.stats[lb.stat])} />
                    ))}
                </div>
            ))}
        </main>
    )
}

function Statistic({ name, value, stat, children }: PropsWithChildren<{ name: string, value?: string | number | undefined, stat?: string }>) {
    return (
        <p className="flex w-72 lg:w-96 justify-between">
            <span className="font-medium">{stat ? <Link href={`/leaderboards/${stat}`} className="underline">{name}</Link> : name}</span>
            <span className={value !== undefined ? "text-sky-600" : "text-gray-600"}>
                {children ?? value ?? "-"}
            </span>
        </p>
    )
}