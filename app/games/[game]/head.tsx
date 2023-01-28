import BaseHead from "@/components/BaseHead";
import { notFound } from "next/navigation";
import { games } from "../games";

export default function Head({
    params: { game },
}: {
    params: { game: string };
}) {
    const title = decodeURIComponent(game).toLowerCase().replaceAll(/-/g, " ");
    const selected = games.find((g) => g.name.toLowerCase() === title);

    if (!selected) notFound();

    return (
        <>
            <BaseHead
                image={`/api/og?title=${
                    selected.name
                }&ogPreview=${encodeURIComponent(selected.description ?? "")}`}
            />
            <title>{selected.name + " | BlueDragon"}</title>
            <meta name="og:title" content={selected.name + " | BlueDragon"} />
            <meta
                name="og:description"
                content={selected.description ?? "A game on BlueDragon."}
            />
            <meta name="og:type" content="article" />
        </>
    );
}
