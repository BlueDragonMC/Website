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
import RelativeDate from "./components/RelativeDate";

TimeAgo.addDefaultLocale(en);

export const dynamic = "force-dynamic";

export default async function Player({
    params: { username },
}: {
    params: { username: string };
}) {
    const res = await fetch(
        `${BASE_PATH}/api/player?username=${encodeURIComponent(username)}`
    );

    if (!res.ok) {
        if (res.status == 404) {
            notFound();
        } else {
            throw new Error("Internal server error");
        }
    }

    const info = (await res.json()) as PlayerResponse;

    const nonDashedUUID = info.uuid.replaceAll(/-/g, "");
    const timeAgo = new TimeAgo("en-US");

    return (
        <main>
            <h1 className="text-center text-3xl font-bold">
                <Image
                    src={`https://minotar.net/helm/${nonDashedUUID}/32`}
                    alt={"Minecraft player head"}
                    width={32}
                    height={32}
                    className="inline rounded-sm align-middle"
                />
                <span className="ml-2">{username}</span>
            </h1>

            <Link
                className="mx-auto my-4 block w-max rounded-md bg-black p-2 text-sm text-white dark:bg-white dark:text-black"
                href={`https://namemc.com/profile/${info.uuid}`}
                rel="noopener noreferrer"
                target="_blank"
            >
                <FontAwesomeIcon
                    width={14}
                    height={14}
                    className="inline"
                    icon={faUpRightFromSquare}
                />{" "}
                NameMC
            </Link>

            <Statistic
                name="First Login"
                value={
                    info.firstLogin
                        ? timeAgo.format(info.firstLogin)
                        : undefined
                }
            >
                <RelativeDate
                    date={info.firstLogin}
                    text={
                        info.firstLogin ? timeAgo.format(info.firstLogin) : "-"
                    }
                />
            </Statistic>
            <Statistic
                name="Last Login"
                value={
                    info.lastLogin ? timeAgo.format(info.lastLogin) : undefined
                }
            >
                <RelativeDate
                    date={info.lastLogin}
                    text={info.lastLogin ? timeAgo.format(info.lastLogin) : "-"}
                />
            </Statistic>
            {leaderboards.map((category) => (
                <div key={category.mode ?? category.name}>
                    <h1 className="mt-6 mb-2 text-center text-2xl font-bold">
                        {category.mode
                            ? `${category.name}: ${category.mode}`
                            : category.name}
                    </h1>
                    {category.leaderboards.map((lb) => (
                        <Statistic
                            name={lb.statName ?? lb.name}
                            stat={lb.stat}
                            key={lb.stat}
                            value={format(lb.format, info.stats[lb.stat])}
                        />
                    ))}
                </div>
            ))}
        </main>
    );
}

function Statistic({
    name,
    value,
    stat,
    children,
}: PropsWithChildren<{
    name: string;
    value?: string | number | undefined;
    stat?: string;
}>) {
    return (
        <p className="mx-auto flex w-72 justify-between lg:w-96">
            <span className="font-medium">
                {stat ? (
                    <Link href={`/leaderboards/${stat}`} className="underline">
                        {name}
                    </Link>
                ) : (
                    name
                )}
            </span>
            <span
                className={
                    value !== undefined ? "text-sky-600" : "text-gray-600"
                }
            >
                {children ?? value ?? "-"}
            </span>
        </p>
    );
}
