import { Metadata } from "next";
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
    },
};

export default function Games() {
    return <Page params={{ game: encodeURIComponent(games[0].name) }} />;
}
