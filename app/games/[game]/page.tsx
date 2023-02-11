import Step from "@/components/Step";
import "photoswipe/dist/photoswipe.css";
import { Game, games } from "../games";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getOGImageURL } from "@/app/utils/og";
import GalleryComponent from "./GalleryComponent";

export function generateMetadata({
    params: { game },
}: {
    params: { game: string };
}): Metadata {
    const title = decodeURIComponent(game).toLowerCase().replaceAll(/-/g, " ");
    const selected = games.find((g) => g.name.toLowerCase() === title);

    if (!selected) return {};

    return {
        title: selected.name,
        description: selected.description,
        openGraph: {
            type: "article",
            title: {
                absolute: `${selected.name} | BlueDragon`,
            },
            description: selected.description,
            images: [
                getOGImageURL({
                    title: selected.name,
                    subtitle: "BlueDragon Minecraft minigame",
                    ogPreview: selected.description,
                }),
                // ...(selected.images?.map(
                //     (img) => new URL(img.src, BASE_PATH)
                // ) ?? []),
            ],
        },
    };
}

export default function Page({
    params: { game },
}: {
    params: { game: string };
}) {
    const title = decodeURIComponent(game).toLowerCase().replaceAll(/-/g, " ");
    const selected = games.find((g) => g.name.toLowerCase() === title);

    if (!selected) notFound();

    const getSteps = (game: Game) => {
        if (!game.steps) return <></>;
        if (Array.isArray(game.steps)) {
            return game.steps?.map((step, i) => {
                return (
                    <Step key={step} number={i + 1}>
                        {step}
                    </Step>
                );
            });
        } else {
            return Object.keys(game.steps).map((mode) => {
                if (!game.steps) return <></>;
                const steps = (game.steps as { [key: string]: Array<string> })[
                    mode
                ] as Array<string>;
                return (
                    <div key={mode}>
                        <h3 className="text-xl font-bold">{mode}</h3>
                        {steps.map((step, i) => {
                            return (
                                <Step key={step} number={i + 1}>
                                    {step}
                                </Step>
                            );
                        })}
                    </div>
                );
            });
        }
    };

    return (
        <main>
            <h1 className="mb-2 text-3xl font-bold">{selected.name}</h1>
            {games.map((game, i) => {
                return (
                    <Link
                        href={`/games/${game.name
                            .toLowerCase()
                            .replaceAll(/ /g, "-")}`}
                        key={game.name}
                        className={`${
                            game.name == selected.name
                                ? "bg-blue-700 text-white"
                                : "mb-2 bg-slate-200 text-black"
                        } mr-2 inline-block cursor-pointer rounded-md p-2 font-medium transition-colors`}
                    >
                        {game.name}
                    </Link>
                );
            })}

            <p className="my-5">{selected.description}</p>
            <GalleryComponent selected={selected} />
            {selected.steps && (
                <h2 className="mb-4 text-2xl font-bold">How to Play</h2>
            )}
            {getSteps(selected)}
        </main>
    );
}
