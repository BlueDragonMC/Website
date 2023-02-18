import { format, leaderboards } from "@/app/leaderboards/leaderboards";
import { fetchPlayer } from "@/pages/api/player";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "javascript-time-ago";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import en from "javascript-time-ago/locale/en";
import { PropsWithChildren } from "react";
import RelativeDate from "./components/RelativeDate";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import { Metadata } from "next";
import { getOGImageURL } from "@/app/utils/og";

TimeAgo.addDefaultLocale(en);

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params: { username },
}: {
    params: { username: string };
}): Promise<Metadata> {
    const info = await fetchPlayer(username);
    if (!info) return {};
    const nonDashedUUID = info.uuid.replaceAll(/-/g, "");
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
            images: [
                getOGImageURL({
                    title: info.username,
                    player: nonDashedUUID,
                    ogPreview: `View ${info.username}'s BlueDragon profile and statistics online.`,
                }),
            ],
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
            <Statistic
                name="Network Level"
                value={Math.round(info.level * 100) / 100}
            />
            <Statistic name="Total Experience" value={info.xp} />
            <Statistic name="Coins" value={info.coins} />
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
                    value !== undefined
                        ? "font-medium text-blue-600"
                        : "text-gray-600"
                }
            >
                {children ?? value ?? "-"}
            </span>
        </p>
    );
}
