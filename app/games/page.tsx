"use client";

import Step from "@/components/Step";
import Image from "next/image";
import { useEffect, useState } from "react";

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
            images: [],
            steps: [
                "Each player spawns at a designated spawn point with 2 HP (one heart)",
                "Fall damage is applied when you fall 3 blocks or more",
                "Certain blocks, like slime blocks, break your fall",
                "Without taking over two points of fall damage, make your way to the bottom of the world",
                "The first player to break the glass at the bottom of the world and step on the an emerald block wins"
            ]
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
            images: ["/infinijump.png"]
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
            ]
        },
        {
            name: "BedWars"
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
            name: "Lobby Parkour"
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
                {game.images?.map((img) => {
                    return <Image key={img} src={img} className="max-h-48 rounded-md" alt="Gameplay screenshot" width={256} height={0} />
                })}
                {getSteps(game)}
            </div>
        </main>
    )
}