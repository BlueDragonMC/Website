import { GitHub } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";

import jukebox from "@/public/images/jukebox-1.png";
import leaderboard from "@/public/images/leaderboards-1.png";
import { PropsWithChildren, ReactElement } from "react";
import {
    faGamepad,
    faShare,
    faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { leaderboards } from "../leaderboards/leaderboards";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";

export default function About() {
    const games = [
        "Infinijump",
        "WackyMaze",
        "FastFall",
        "Infection",
        "BedWars",
        "SkyWars",
        "Skyfall",
        "PvPMaster",
        "ArenaPvP",
        "Lobby Parkour",
    ];

    const lbCount = leaderboards
        .map((category) => category.leaderboards.length)
        .reduce((acc, category) => acc + category, 0);

    return (
        <main className="mx-auto md:w-2/3">
            <Section>
                <div>
                    <h1 className="text-3xl font-bold">About</h1>
                    <p>
                        BlueDragon is an original Minecraft server featuring
                        minigames like WackyMaze, PvPMaster, FastFall,
                        Infinijump, and many&nbsp;more!
                    </p>
                    <Button
                        href="/join"
                        icon={
                            <FontAwesomeIcon
                                icon={faGamepad}
                                className="inline-block h-4 align-middle"
                            />
                        }
                        text="View Games"
                    />
                </div>
                <div className="my-4 rounded-md bg-neutral-800 p-4">
                    {games.map((game, i) => (
                        <Link
                            href={`/games/${game
                                .toLowerCase()
                                .replaceAll(/ /g, "-")}`}
                            className="mr-2 inline-block text-2xl font-black text-neutral-500 transition-colors hover:text-neutral-200"
                            key={game}
                        >
                            {game}
                            {i !== games.length - 1 && (
                                <span className="ml-2 text-2xl text-neutral-700">
                                    &middot;
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            </Section>
            <Section>
                <Image
                    src={jukebox}
                    placeholder="blur"
                    alt="Jukebox menu screenshot"
                    className="row-start-2 my-4 rounded-lg lg:row-start-1"
                />
                <div className="row-start-1">
                    <h1 className="text-3xl font-bold">Jukebox</h1>
                    <p>
                        Play a collection of note block songs in-game. Just type{" "}
                        <code>/play</code> and your music will play. You can
                        play music in any game, at any time, automatically
                        continuing between games.
                    </p>
                    <Button
                        href="/join"
                        icon={
                            <FontAwesomeIcon
                                icon={faShare}
                                className="inline h-4 align-middle"
                            />
                        }
                        text="Join Now"
                    />
                </div>
            </Section>
            <Section>
                <div>
                    <h1 className="text-3xl font-bold">Leaderboards</h1>
                    <p>
                        You can view{" "}
                        <span className="font-bold">
                            {lbCount} leaderboards
                        </span>{" "}
                        on the BlueDragon website and in-game. Get to the top by
                        being the best!
                    </p>
                    <Button
                        href="/leaderboards"
                        icon={
                            <FontAwesomeIcon
                                icon={faTrophy}
                                className="inline h-4 align-middle"
                            />
                        }
                        text="View Leaderboards"
                    />
                </div>
                <Image
                    src={leaderboard}
                    placeholder="blur"
                    alt="Lobby leaderboard screenshot"
                    className="my-4 rounded-lg"
                />
            </Section>
            <section className="flex flex-col justify-center">
                <div>
                    <h1 className="text-center text-3xl font-bold">
                        Open-Source
                    </h1>
                    <p className="text-center">
                        We ❤️ open source! Our core software, website, and
                        Jukebox are all open-sourced on GitHub.
                    </p>
                </div>
                <div className="text-center">
                    <Button
                        href="https://github.com/BlueDragonMC"
                        icon={
                            <GitHub className="inline h-4 fill-white align-middle" />
                        }
                        text="View on GitHub"
                    />
                </div>
            </section>
        </main>
    );
}

const Section = ({ children }: PropsWithChildren<{}>) => (
    <section className="my-10 grid grid-cols-1 gap-x-8 lg:grid-cols-2">
        {children}
    </section>
);

const Button = ({
    icon,
    href,
    text,
}: {
    icon: ReactElement;
    href: string;
    text: string;
}) => (
    <Link href={href}>
        <button className="mt-2 rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus:bg-blue-900">
            <span className="fill-black dark:fill-white">{icon}</span>
            <span className="ml-2 align-middle font-medium">{text}</span>
        </button>
    </Link>
);
