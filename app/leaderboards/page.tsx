import Link from "next/link";
import ViewStats from "./components/ViewStats";
import { leaderboards } from "./leaderboards";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

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
                    <div key={category.mode ?? category.name} className="h-12">
                        <span className="text-2xl font-extrabold mr-2">
                            {category.name}
                        </span>
                        {category.mode ? (
                            <span className="text-2xl font-light text-blue-500 mr-2">
                                {category.mode}
                            </span>
                        ) : (
                            ""
                        )}
                        <div className="inline">
                            {category.leaderboards.map((lb) => {
                                return (
                                    <Link
                                        key={lb.stat}
                                        className="text-xl underline font-medium mx-2 bg-gray-700 rounded-md p-2"
                                        href={"/leaderboards/" + lb.stat}
                                    >
                                        {lb.name}
                                        <FontAwesomeIcon
                                            icon={faUpRightFromSquare}
                                            width={14}
                                            height={14}
                                            className="inline align-middle px-1"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            <div className="my-4">
                <p>
                    Enter a player's username to view their individual
                    statistics.
                </p>
                <div className="my-2">
                    <ViewStats />
                </div>
            </div>
        </>
    );
}
