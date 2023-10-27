import { generate } from "@/app/utils/og";
import { notFound } from "next/navigation";
import { games } from "../games";

export default async function OG({
    params: { game },
}: {
    params: { game: string };
}) {
    const title = decodeURIComponent(game).toLowerCase().replace(/-/g, " ");
    const selected = games.find((g) => g.name.toLowerCase() === title);

    if (!selected) {
        notFound();
    }

    return generate({
        title: selected.name,
        subtitle: "A Minecraft minigame on BlueDragon",
        ogPreview: selected.description,
    });
}
