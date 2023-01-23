"use client";

import Step from "@/components/Step";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

type Game = {
    name: string,
    description?: string,
    images?: Array<string>,
    steps?: Array<string> | { [key: string]: Array<string> }
}

export default function Page() {

    const games: Array<Game> = [
        {
            name: "Infinijump",
            description: "Get the highest score or be the first to complete a parkour course in the void.",
            images: ["/infinijump.png"],
            steps: {
                "Solo Mode": [
                    "Start the game by moving in any direction",
                    "As you jump from one block to another, more blocks will form ahead of you",
                    "Blocks behind you will start to disappear",
                    "Every block you reach adds one point to your score",
                    "Falling into the void ends the game"
                ],
                "Versus Mode": [
                    "Each player spawns in their own world",
                    "When the game starts, start jumping from block to block",
                    "Blocks behind you will start to disappear",
                    "The last player to fall into the void wins the game"
                ],
                "Race Mode": [
                    "Each player spawns in their own world",
                    "When the game starts, start jumping from block to block",
                    "Blocks behind you will start to disappear",
                    "Every block you reach adds one point to your score",
                    "The first player to 200 points wins"
                ]
            }
        },
        {
            name: "FastFall",
            description: "Get from the top to the bottom of a randomly-generated world as fast as possible!",
            images: ["/fastfall-1.png", "/fastfall-2.png", "/fastfall-3.png", "/fastfall-4.png"],
            steps: [
                "Each player spawns at a designated spawn point with 2 HP (one heart)",
                "Fall damage is applied when you fall 3 blocks or more",
                "Certain blocks, like slime blocks, break your fall",
                "Without taking over two points of fall damage, make your way to the bottom of the world",
                "The first player to break the glass at the bottom of the world and step on the an emerald block wins"
            ],
        },
        {
            name: "WackyMaze",
            description: "Each player receives a knockback stick. Use it to wack your enemies off the map! The last player alive wins!",
            steps: [
                "Each player spawns in a random location on the map",
                "When the game starts, everyone receives a knockback stick",
                "Hit other players with the stick to knock them back",
                "Falling in the void eliminates you from the game",
                "The last player standing wins!"
            ],
            images: ["/wackymaze-1.png", "/wackymaze-2.png", "/wackymaze-6.png", "/wackymaze-8.png"]
        },
        {
            name: "Infection",
            description: "Be the last survivor alive in a world of zombies!",
            steps: [
                "Each player spawns in a random location on the map",
                "20 seconds after the game starts, a random player is chosen as the \"Alpha zombie\"",
                "The alpha zombie is able to infect other players by attacking them",
                "Infected players can spread the infection in the same way (attacking) until there is only one survivor left",
                "The final survivor wins the game"
            ],
            images: ["/infection-1.png", "/infection-2.png", "/infection-3.png", "/infection-4.png", "/infection-5.png", "/infection-6.png"]
        },
        {
            name: "BedWars",
            description: "Defend your bed while attacking the beds of other players!",
            steps: [
                "Each player or team spawns on their own island.",
                "Purchase blocks to protect your bed.",
                "Visit other islands to collect resources and attack other teams.",
                "Break another team's bed to prevent them from respawning.",
                "The last team standing wins!"
            ],
            images: ["/bedwars-2.png", "/bedwars-3.png", "/bedwars-4.png", "/bedwars-5.png", "/bedwars-7.png"]
        },
        {
            name: "SkyWars"
        },
        {
            name: "Skyfall"
        },
        {
            name: "PvPMaster"
        },
        {
            name: "ArenaPvP"
        },
        {
            name: "Lobby Parkour",
            description: "Finish multiple parkour courses, race your friends, and climb the leaderboards, all without leaving the lobby!",
            steps: [
                "Step on a silver pressure plate to start a course.",
                "Hit checkpoints along the way so you never need to start over.",
                "After you finish, visit the leaderboard to see how you stack up against the competition."
            ],
            images: ["/lobby-5.png", "/lobby-6.png", "/lobby-3.png", "/lobby-7.png", "/lobby-8.png"]
        }
    ]

    const [selectedGame, setSelectedGame] = useState(0);
    const [game, setGame] = useState(games[selectedGame]);
    useEffect(() => {
        setGame(games[selectedGame]);
    }, [selectedGame]);

    const getSteps = (game: Game) => {
        if (!game.steps) return <></>;
        if (Array.isArray(game.steps)) {
            return game.steps?.map((step, i) => {
                return <Step key={step} number={i + 1}>{step}</Step>
            })
        } else {
            return Object.keys(game.steps).map((mode) => {
                if (!game.steps) return <></>;
                const steps = (game.steps as { [key: string]: Array<string> })[mode] as Array<string>;
                return <div key={mode}>
                    <h1 className="text-xl font-bold">{mode}</h1>
                    {steps.map((step, i) => {
                        return <Step key={step} number={i + 1}>{step}</Step>
                    })}
                </div>
            });
        }
    }

    return (
        <main>
            <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
            {games.map((game, i) => {
                return <div key={game.name} className={`${i == selectedGame ? "bg-blue-700 text-white" : "bg-slate-200 text-black mb-2"} rounded-md p-2 mr-2 inline-block transition-colors font-medium cursor-pointer`} onClick={() => setSelectedGame(i)}>
                    {game.name}
                </div>
            })}

            <div className="mt-5">
                <p>{game.description}</p>
                <Gallery>
                    {game.images?.map((img) => {
                        return <Item key={img} original={img} thumbnail={img} width={1920} height={1080}>
                            {({ ref, open }) => (
                                <Image
                                    src={img}
                                    className="inline rounded-md cursor-pointer mr-4 mb-4"
                                    alt="Gameplay screenshot"
                                    width={1920/4}
                                    height={1080/4}
                                    ref={ref as React.MutableRefObject<HTMLImageElement>}
                                    onClick={open}
                                />
                            )}
                        </Item>
                    })}
                </Gallery>
                {getSteps(game)}
            </div>
        </main>
    )
}