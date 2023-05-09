import { fetchPlayer } from "@/app/api/player/route";
import { generate } from "@/app/utils/og";
import { notFound } from "next/navigation";

export default async function OG({
    params: { username },
}: {
    params: { username: string };
}) {
    const info = await fetchPlayer(username);
    if (!info) {
        notFound();
    }
    const nonDashedUUID = info.uuid.replaceAll(/-/g, "");
    return generate({
        title: info.username,
        player: nonDashedUUID,
        ogPreview: `View ${info.username}'s BlueDragon profile and statistics online.`,
    });
}
