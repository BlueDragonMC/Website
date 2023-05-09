import {
    format,
    getLeaderboard,
    leaderboards,
} from "@/app/leaderboards/leaderboards";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "javascript-time-ago";
import Link from "next/link";
import { notFound } from "next/navigation";
import en from "javascript-time-ago/locale/en";
import { PropsWithChildren } from "react";
import RelativeDate from "./components/RelativeDate";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import { Metadata } from "next";
import { fetchPlayer } from "@/app/api/player/route";
import { fetchPosition } from "@/app/api/leaderboard/position/route";
import Image from "next/image";

TimeAgo.addDefaultLocale(en);

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params: { username },
}: {
    params: { username: string };
}): Promise<Metadata> {
    const info = await fetchPlayer(username);
    if (!info) return {};

    return {
        title: `${info.username}'s Stats`,
        description: `View ${info.username}'s BlueDragon profile and statistics online.`,
        openGraph: {
            type: "profile",
            username: info.username,
            title: {
                template: "%s",
                default: `${info.username}'s Statistics`,
            },
            description: `View ${info.username}'s BlueDragon profile and statistics online.`,
        },
    };
}

export default async function Player({
    params: { username },
}: {
    params: { username: string };
}) {
    const info = await fetchPlayer(username);
    if (!info) notFound();

    const nonDashedUUID = info.uuid.replaceAll(/-/g, "");
    const timeAgo = new TimeAgo("en-US");

    const rank = info.meta?.primaryGroup
        ? info.meta.primaryGroup.charAt(0)?.toUpperCase() +
          info.meta.primaryGroup.substring(1)
        : undefined;

    let darkRankText = false;

    if (info.meta?.rankcolor) {
        const rankColorValue = Number("0x" + info.meta.rankcolor.substring(1));
        const r = (rankColorValue >> 16) & 0xff;
        const g = (rankColorValue >> 8) & 0xff;
        const b = rankColorValue & 0xff;
        const luminance = 0.289 * r + 0.587 * g + 0.114 * b;
        if (luminance > 100) darkRankText = true;
    }

    const ranks: { [key: string]: number } = {};

    await Promise.all(
        Object.keys(info.stats).map((stat) => {
            return fetchPosition(
                info.username,
                stat,
                getLeaderboard(stat)?.leaderboard.sort ?? -1
            ).then((info) => {
                if (info !== undefined) {
                    ranks[info.statistic] = info.position;
                }
            });
        })
    );

    return (
        <main>
            <h1 className="text-center text-3xl font-bold">
                <Image
                    src={`https://minotar.net/helm/${nonDashedUUID}/16`}
                    alt={`${username}'s Minecraft player head`}
                    width={32}
                    height={32}
                    className="inline rounded-sm align-middle [image-rendering:pixelated]"
                    unoptimized
                    priority
                />
                <span className="ml-2">{username}</span>
                {rank && info.meta?.rankcolor && (
                    <span
                        className={`mx-4 rounded-full p-2 align-middle text-xs font-medium uppercase ${
                            darkRankText ? "text-black" : "text-white"
                        }`}
                        style={{ backgroundColor: info.meta?.rankcolor }}
                    >
                        {rank}
                    </span>
                )}
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
            <Statistic
                name="Network Level"
                value={Math.round(info.level * 100) / 100}
            />
            <Statistic name="Total Experience" value={info.xp} />
            <Statistic name="Coins" value={info.coins} />
            <Statistic name="Owned Cosmetics" value={info.cosmeticCount} />
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
                            position={ranks[lb.stat]}
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
    position,
}: PropsWithChildren<{
    name: string;
    value?: string | number | undefined;
    stat?: string;
    position?: number;
}>) {
    return (
        <p className="mx-auto flex w-72 justify-between lg:w-96">
            <span className="font-medium">
                {stat ? (
                    <Link
                        href={`/leaderboards/${stat}`}
                        className="underline"
                        prefetch={false}
                    >
                        {name}
                    </Link>
                ) : (
                    name
                )}
            </span>
            <span
                className={
                    value !== undefined
                        ? "font-medium text-blue-600"
                        : "text-gray-600"
                }
            >
                {children ?? value ?? "-"}
                {position ? (
                    <span className={getColor(position)}> (#{position})</span>
                ) : (
                    <></>
                )}
            </span>
        </p>
    );
}

function getColor(position: number): string {
    if (position === 1)
        return "font-medium text-yellow-600 dark:text-yellow-500";
    if (position === 2)
        return "font-medium text-orange-600 dark:text-orange-500";
    if (position === 3) return "font-medium text-red-600 dark:text-red-500";

    return "font-normal text-gray-600 dark:text-gray-300";
}
