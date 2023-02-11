import { Metadata } from "next";
import { getOGImageURL } from "../utils/og";
import { games } from "./games";
import Page from "./[game]/page";

export const metadata: Metadata = {
    title: games[0].name,
    openGraph: {
        type: "article",
        title: {
            default: "Games",
            template: "%s",
        },
        images: [
            getOGImageURL({
                title: "Games",
                ogPreview:
                    "All of the minigames on the BlueDragon Minecraft server.",
            }),
        ],
    },
};

export default function Games() {
    return <Page params={{ game: encodeURIComponent(games[0].name) }} />;
}
