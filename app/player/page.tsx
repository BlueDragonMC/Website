import ViewStats from "../leaderboards/components/ViewStats";

export default function Player() {
    return (
        <main className="px-auto mx-auto flex h-[80vh] w-full justify-center">
            <div className="flex flex-col justify-center">
                <h1 className="text-center text-3xl font-bold">Statistics</h1>
                <p className="mb-8 text-center">
                    Enter a player's username to view their individual
                    statistics.
                </p>
                <ViewStats />
            </div>
        </main>
    );
}
