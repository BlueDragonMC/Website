import Card from "@/components/Card";
import Link from "next/link";
import { Fragment } from "react";
import { games } from "../games/games";
import { leaderboards } from "./leaderboards";

export default function Page() {
    return (
        <>
            <h1 className="text-3xl font-bold">Leaderboards</h1>

            <p>
                Click a leaderboard below to view the top players in a category.
            </p>

            <main className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {leaderboards.map((category, i) => {
                    const game = games.find(
                        (game) => game.name === category.name
                    );
                    const modeIndex = leaderboards
                        .filter((cat) => cat.name === category.name)
                        .indexOf(category);
                    if (!game) return;
                    return (
                        <Card
                            key={category.name + category.mode}
                            imageAlt="Game screenshot"
                            imageSrc={
                                game.images?.[modeIndex % game.images?.length]
                            }
                        >
                            <h2 className="text-2xl font-bold">
                                {category.name}
                            </h2>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-neutral-400">
                                {category.mode ?? "All Modes"}
                            </h3>
                            {category.leaderboards.map((lb) => {
                                return (
                                    <Fragment key={lb.stat}>
                                        <Link
                                            href={`/leaderboards/${lb.stat}`}
                                            prefetch={false}
                                        >
                                            <p className="font-medium underline">
                                                {lb.name}
                                            </p>
                                        </Link>
                                    </Fragment>
                                );
                            })}
                        </Card>
                    );
                })}
            </main>
        </>
    );
}
