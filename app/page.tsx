import hero1 from "@/public/hero/1.png";
import hero2 from "@/public/hero/2.png";
import hero3 from "@/public/hero/3.png";
import hero5 from "@/public/hero/5.png";
import lobby3 from "@/public/games/lobby/lobby-3.png";
import wackymaze1 from "@/public/games/wackymaze/wackymaze-1.png";
import wackymaze6 from "@/public/games/wackymaze/wackymaze-6.png";
import ImageCarousel from "@/components/ImageCarousel";
import { games } from "./games/games";
import { Button } from "@/components/Button";
import {
    faArrowDownLong,
    faArrowRight,
    faCodeFork,
    faGamepad,
    faShare,
    faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { Nosifer } from "next/font/google";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import jukeboxImage from "@/public/images/jukebox-1.png";
import leaderboardImage from "@/public/images/leaderboards-1.png";
import { PropsWithChildren } from "react";
import { leaderboards } from "./leaderboards/leaderboards";

const customFont = Nosifer({ weight: "400", subsets: ["latin"] });

export default function Home() {
    const images = [hero1, hero2, hero3, hero5, lobby3, wackymaze1, wackymaze6];
    const paintbrawlImages = games[0].images!;

    const lbCount = leaderboards
        .map((category) => category.leaderboards.length)
        .reduce((acc, category) => acc + category, 0);

    const gameModeCount = [
        "Paintbrawl",
        "Infinijump Solo",
        "Infinijump Versus",
        "Infinijump Race",
        "FastFall",
        "FastFall Solo",
        "WackyMaze",
        "Infection",
        "BedWars",
        "SkyWars",
        "Skyfall",
        "PvPMaster",
        "ArenaPvP",
        "Cave Parkour",
        "Works Tour Parkour",
    ].length;

    return (
        <main>
            <section className="relative -mx-2 -mt-4 h-screen min-h-[960px] w-screen md:-mx-10">
                <div className="absolute top-0 left-0 -z-20 h-full w-full overflow-hidden">
                    <ImageCarousel
                        images={paintbrawlImages}
                        altText="Gameplay Screenshot"
                        blurred={true}
                        imageWidth={512}
                    />
                </div>
                <div className="absolute top-0 left-0 mx-auto h-full w-full rounded-lg p-4 text-white">
                    <div className="mx-auto mt-48 max-w-4xl text-center">
                        <h1 className={`font-black drop-shadow-2xl`}>
                            <span
                                className={`my-4 block bg-gradient-to-tl from-pink-500 to-blue-500 bg-clip-text text-4xl font-black leading-[1.5] text-transparent md:text-6xl lg:text-7xl xl:text-8xl ${customFont.className}`}
                            >
                                Paintbrawl
                            </span>
                        </h1>
                        <p className="my-2 text-2xl">
                            Introducing BlueDragon&apos;s biggest minigame yet:
                            a fast-paced, action-packed multiplayer combat
                            experience with tons of maps, weapons, and powerups
                            to shake things up!
                        </p>
                        <Button text="Join" href="/join" />
                        <Button
                            text="Read the Blog Post"
                            icon={faArrowRight}
                            iconPosition="right"
                            intent="secondary"
                            href="/blog/2023-02-19-new-game-paintbrawl"
                        />
                    </div>
                </div>
                <div className="group absolute top-[80%] w-full">
                    <a href="#about">
                        <div className="mx-auto hidden w-min lg:block">
                            <FontAwesomeIcon
                                icon={faArrowDownLong}
                                className="h-8 w-8 animate-bounce text-white transition-colors group-hover:text-blue-500"
                            />
                        </div>
                    </a>
                </div>
            </section>
            <Section>
                <div id="about" className="mt-8">
                    <h2 className="text-3xl font-bold">About Us</h2>
                    <p>
                        BlueDragon is an original Minecraft server featuring
                        minigames like WackyMaze, PvPMaster, FastFall,
                        Infinijump, and many&nbsp;more!
                    </p>
                    <Button href="/join" icon={faShare} text="Join" />
                </div>
                <div className="my-4 h-72 overflow-hidden rounded-lg">
                    <ImageCarousel
                        images={images}
                        altText="Gameplay screenshot"
                        blurred={false}
                        imageWidth={540}
                        delay={4.0}
                    />
                </div>
            </Section>
            <Section>
                <div className="row-start-2 w-4/5 min-w-[24rem] rounded-lg bg-neutral-900 p-4 lg:row-start-1">
                    {games.map((game, i) => (
                        <Link
                            href={`/games/${game.name
                                .toLowerCase()
                                .replaceAll(/ /g, "-")}`}
                            className="mr-2 inline-block text-2xl font-black text-neutral-500 transition-colors hover:text-neutral-200"
                            key={game.name}
                        >
                            {game.name}
                            {i !== games.length - 1 && (
                                <span className="ml-2 text-2xl text-neutral-700">
                                    &middot;
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
                <div className="row-start-1">
                    <h2 className="text-3xl font-bold">Game Selection</h2>
                    <p>
                        BlueDragon has {games.length} Minecraft minigames and{" "}
                        {gameModeCount} total game modes, across all genres.
                        Parkour, combat, we have it all.
                    </p>
                    <Button href="/games" icon={faGamepad} text="View Games" />
                </div>
            </Section>
            <Section>
                <div>
                    <h2 className="text-3xl font-bold">Jukebox</h2>
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
                <Image
                    src={jukeboxImage}
                    placeholder="blur"
                    alt="Jukebox menu screenshot"
                    className="my-4 rounded-lg"
                />
            </Section>
            <Section>
                <Image
                    src={leaderboardImage}
                    placeholder="blur"
                    alt="Lobby leaderboard screenshot"
                    className="row-start-2 my-4 rounded-lg lg:row-start-1"
                />
                <div className="row-start-1">
                    <h2 className="text-3xl font-bold">Leaderboards</h2>
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
            </Section>
            <section className="flex flex-col justify-center">
                <div>
                    <h2 className="text-center text-3xl font-bold">
                        Open-Source
                    </h2>
                    <p className="text-center">
                        We ❤️ open source! Our core software, website, and
                        Jukebox are all open-sourced on GitHub.
                    </p>
                </div>
                <div className="text-center">
                    <Button
                        href="https://github.com/BlueDragonMC"
                        icon={faGithub}
                        text="View on GitHub"
                    />
                    <Button
                        href="/page/oss"
                        icon={faCodeFork}
                        text="View Open-Source Software"
                        intent="secondary"
                    />
                </div>
            </section>
        </main>
    );
}

const Section = ({ children }: PropsWithChildren<{}>) => (
    <section className="my-10 mx-auto grid grid-cols-1 gap-x-8 lg:max-w-[130ch] lg:grid-cols-2">
        {children}
    </section>
);
