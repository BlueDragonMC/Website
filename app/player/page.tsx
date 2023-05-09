import { Metadata } from "next";
import ViewStats from "../leaderboards/components/ViewStats";

export const metadata: Metadata = {
    title: "Statistics",
    description:
        "Enter a player's username to view their individual statistics.",
    openGraph: {
        title: {
            template: "%s",
            default: "Statistics",
        },
        description:
            "Enter a player's username to view their individual statistics.",
    },
};

export default function Player() {
    return (
        <main className="px-auto mx-auto flex h-[80vh] w-full justify-center">
            <div className="flex flex-col justify-center">
                <h1 className="text-center text-3xl font-bold">Statistics</h1>
                <p className="mb-8 text-center">
                    Enter a player&apos;s username to view their individual
                    statistics.
                </p>
                <ViewStats />
            </div>
        </main>
    );
}
