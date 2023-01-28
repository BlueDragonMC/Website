import { games } from "./games";
import Page from "./[game]/page";

export default function Games() {
    return <Page params={{ game: encodeURIComponent(games[0].name) }} />;
}
