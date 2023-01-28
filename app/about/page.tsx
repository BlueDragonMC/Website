import { GitHub } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";

import jukebox from "@/public/images/jukebox-1.png";
import leaderboard from "@/public/images/leaderboards-1.png";
import { PropsWithChildren, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGamepad,
    faShare,
    faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { leaderboards } from "../leaderboards/leaderboards";

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
        <main className="md:w-2/3 mx-auto">
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
                <div className="bg-neutral-800 p-4 my-4 rounded-md">
                    {games.map((game, i) => (
                        <Link
                            href={`/games/${game}`}
                            className="inline-block mr-2 text-2xl font-black text-neutral-500 hover:text-neutral-200 transition-colors"
                            key={game}
                        >
                            {game}
                            {i !== games.length - 1 && (
                                <span className="text-2xl ml-2 text-neutral-700">
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
                    className="rounded-lg my-4 row-start-2 lg:row-start-1"
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
                    className="rounded-lg my-4"
                />
            </Section>
            <section className="flex flex-col justify-center">
                <div>
                    <h1 className="text-3xl font-bold text-center">
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
                            <GitHub className="inline h-4 align-middle fill-white" />
                        }
                        text="View on GitHub"
                    />
                </div>
            </section>
        </main>
    );
}

const Section = ({ children }: PropsWithChildren<{}>) => (
    <section className="grid grid-cols-1 lg:grid-cols-2 my-10 gap-x-8">
        {children}
    </section>
);

const Button = ({
    className,
    icon,
    href,
    text,
}: {
    icon: ReactElement;
    href: string;
    text: string;
}) => (
    <Link href={href}>
        <button className="bg-blue-700 hover:bg-blue-800 focus:bg-blue-900 text-white rounded-md mt-2 px-4 py-2">
            <span className="fill-black dark:fill-white">{icon}</span>
            <span className="font-medium align-middle ml-2">{text}</span>
        </button>
    </Link>
);
