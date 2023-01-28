import BaseHead from "@/components/BaseHead";
import { notFound } from "next/navigation";
import { games } from "../games";

export default function Head({
    params: { game },
}: {
    params: { game: string };
}) {
    const selected = games.find((g) => g.name === decodeURIComponent(game));

    if (!selected) notFound();

    return (
        <>
            <BaseHead
                image={`/api/og?title=${game}&ogPreview=${encodeURIComponent(
                    selected.description ?? ""
                )}`}
            />
            <title>{game + " | BlueDragon"}</title>
            <meta
                name="og:title"
                content={decodeURIComponent(game) + " | BlueDragon"}
            />
            <meta name="og:description" content={selected.description} />
            <meta name="og:type" content="article" />
        </>
    );
}
