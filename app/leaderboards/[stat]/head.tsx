import BaseHead from "@/components/BaseHead";
import { Category, Leaderboard, leaderboards } from "../leaderboards";
import ParentHead from "../../head";

export default function Head({ params: { stat } }: { params: { stat: string } }) {

    let lb: Leaderboard | undefined;
    let cat: Category | undefined;
    out: for (const category of leaderboards) {
        for (const leaderboard of category.leaderboards) {
            if (leaderboard.stat === stat) {
                lb = leaderboard;
                cat = category;
                break out;
            }
        }
    }

    if (!lb || !cat) return <ParentHead />

    return <>
        <title>{`${cat.name}: ${lb.name} | BlueDragon`}</title>
        <BaseHead image={`/api/og?title=${encodeURIComponent(cat.name + ": " + lb.name)}&ogPreview=${encodeURIComponent("View the top 10 players for this leaderboard on bluedragonmc.com, or join the server and climb the ranks yourself.")}`} />
        <meta name="og:type" content="article" />
        <meta name="og:title" content={`${cat.name}: ${lb.name} | BlueDragon`} />
    </>
}