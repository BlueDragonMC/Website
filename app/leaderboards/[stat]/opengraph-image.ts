import { generate } from "@/app/utils/og";
import { notFound } from "next/navigation";
import { getLeaderboard } from "../leaderboards";

export default function OG({ params: { stat } }: { params: { stat: string } }) {
    const lbInfo = getLeaderboard(stat);

    if (!lbInfo) {
        notFound();
    }

    const { leaderboard: lb, category: cat } = lbInfo;
    return generate({
        title: `${cat.name}: ${lb.name}`,
        subtitle: cat.mode ?? "All modes",
        ogPreview:
            "View the top players for this leaderboard on bluedragonmc.com, or join the server and climb the ranks yourself.",
    });
}
