"use client"; // Required for PhotoSwipe

import Step from "@/components/Step";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Game, games } from "../games";
import { notFound } from "next/navigation";
import Link from "next/link";

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
                        <h1 className="text-xl font-bold">{mode}</h1>
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

            <div className="mt-5">
                <p>{selected.description}</p>
                <Gallery>
                    {selected.images?.map((img) => {
                        return (
                            <Item
                                key={img.src}
                                original={img.src}
                                thumbnail={img.src}
                                width={1920}
                                height={1080}
                            >
                                {({ ref, open }) => (
                                    <Image
                                        src={img}
                                        placeholder="blur"
                                        loading="lazy"
                                        className="mr-4 mb-4 inline cursor-pointer rounded-md"
                                        alt="Gameplay screenshot"
                                        width={1920 / 4}
                                        height={1080 / 4}
                                        ref={
                                            ref as React.MutableRefObject<HTMLImageElement>
                                        }
                                        onClick={open}
                                    />
                                )}
                            </Item>
                        );
                    })}
                </Gallery>
                {getSteps(selected)}
            </div>
        </main>
    );
}
