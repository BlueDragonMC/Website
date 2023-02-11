import Link from "next/link";
import ViewStats from "./components/ViewStats";
import { leaderboards } from "./leaderboards";

import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";

export default function Page() {
    return (
        <>
            <h1 className="text-3xl font-bold">Leaderboards</h1>

            <p>
                Click a leaderboard below to view the top ten players in a
                category.
            </p>

            {leaderboards.map((category) => {
                return (
                    <div
                        key={category.mode ?? category.name}
                        className="min-h-[3rem] py-3"
                    >
                        <span className="block text-2xl font-semibold lg:hidden">
                            {category.mode
                                ? `${category.name}: ${category.mode}`
                                : category.name}
                        </span>
                        <span className="mr-2 hidden text-2xl font-extrabold lg:inline">
                            {category.name}
                        </span>
                        {category.mode && (
                            <span className="mr-2 hidden text-2xl font-light text-blue-500 lg:inline">
                                {category.mode}
                            </span>
                        )}
                        <div className="inline">
                            {category.leaderboards.map((lb) => {
                                return (
                                    <div
                                        className="block lg:inline-block"
                                        key={lb.stat}
                                    >
                                        <Link
                                            key={lb.stat}
                                            className="rounded-md text-xl font-medium underline lg:mx-2 lg:bg-gray-400 lg:p-2 dark:lg:bg-gray-700"
                                            href={"/leaderboards/" + lb.stat}
                                        >
                                            {lb.name}
                                            <FontAwesomeIcon
                                                icon={faUpRightFromSquare}
                                                className="text-md inline-block h-4 w-4 px-1 align-middle"
                                            />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            <div className="my-4">
                <p>
                    Enter a player&apos;s username to view their individual
                    statistics.
                </p>
                <div className="my-2">
                    <ViewStats />
                </div>
            </div>
        </>
    );
}
