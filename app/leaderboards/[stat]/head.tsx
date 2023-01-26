import BaseHead from "@/components/BaseHead";
import { getLeaderboard } from "../leaderboards";
import ParentHead from "../../head";

export default function Head({
    params: { stat },
}: {
    params: { stat: string };
}) {
    const info = getLeaderboard(stat);

    if (!info) return <ParentHead />;

    const { leaderboard: lb, category: cat } = info;

    return (
        <>
            <title>{`${cat.name}: ${lb.name} | BlueDragon`}</title>
            <BaseHead
                image={`/api/og?title=${encodeURIComponent(
                    cat.name + ": " + lb.name
                )}&ogPreview=${encodeURIComponent(
                    "View the top 10 players for this leaderboard on bluedragonmc.com, or join the server and climb the ranks yourself."
                )}`}
            />
            <meta name="og:type" content="article" />
            <meta
                name="og:title"
                content={`${cat.name}: ${lb.name} | BlueDragon`}
            />
            <meta
                name="og:description"
                content={`View the top 10 players for the ${cat.name} ${lb.name} leaderboard online, or join the server and climb the ranks yourself.`}
            />
        </>
    );
}
