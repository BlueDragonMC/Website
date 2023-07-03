import { StaticImageData } from "next/image";

// Images are statically imported so that they can have automatically-generated blur data URLs during the loading phase.
// For more info: https://nextjs.org/docs/api-reference/next/image#blurdataurl
import dominate1 from "@/public/games/dominate/dominate-1.png";
import dominate2 from "@/public/games/dominate/dominate-2.png";
import dominate3 from "@/public/games/dominate/dominate-3.png";
import dominate4 from "@/public/games/dominate/dominate-4.png";
import dominate5 from "@/public/games/dominate/dominate-5.png";
import dominate6 from "@/public/games/dominate/dominate-6.png";


import paintbrawl1 from "@/public/games/paintbrawl/paintbrawl-1.png";
import paintbrawl2 from "@/public/games/paintbrawl/paintbrawl-2.png";
import paintbrawl3 from "@/public/games/paintbrawl/paintbrawl-3.png";
import paintbrawl4 from "@/public/games/paintbrawl/paintbrawl-4.png";
import paintbrawl5 from "@/public/games/paintbrawl/paintbrawl-5.png";

import infinijump1 from "@/public/games/infinijump/infinijump-1.png";
import infinijump2 from "@/public/games/infinijump/infinijump-2.png";
import infinijump3 from "@/public/games/infinijump/infinijump-3.png";
import infinijump4 from "@/public/games/infinijump/infinijump-4.png";

import fastfall1 from "@/public/games/fastfall/fastfall-1.png";
import fastfall2 from "@/public/games/fastfall/fastfall-2.png";
import fastfall3 from "@/public/games/fastfall/fastfall-3.png";
import fastfall4 from "@/public/games/fastfall/fastfall-4.png";

import wackymaze1 from "@/public/games/wackymaze/wackymaze-1.png";
import wackymaze2 from "@/public/games/wackymaze/wackymaze-2.png";
import wackymaze6 from "@/public/games/wackymaze/wackymaze-6.png";
import wackymaze8 from "@/public/games/wackymaze/wackymaze-8.png";

import infection1 from "@/public/games/infection/infection-1.png";
import infection2 from "@/public/games/infection/infection-2.png";
import infection3 from "@/public/games/infection/infection-3.png";
import infection4 from "@/public/games/infection/infection-4.png";
import infection5 from "@/public/games/infection/infection-5.png";
import infection6 from "@/public/games/infection/infection-6.png";

import bedwars2 from "@/public/games/bedwars/bedwars-2.png";
import bedwars3 from "@/public/games/bedwars/bedwars-3.png";
import bedwars4 from "@/public/games/bedwars/bedwars-4.png";
import bedwars5 from "@/public/games/bedwars/bedwars-5.png";
import bedwars7 from "@/public/games/bedwars/bedwars-7.png";

import skywars1 from "@/public/games/skywars/skywars-1.png";
import skywars2 from "@/public/games/skywars/skywars-2.png";
import skywars3 from "@/public/games/skywars/skywars-3.png";
import skywars4 from "@/public/games/skywars/skywars-4.png";
import skywars5 from "@/public/games/skywars/skywars-5.png";

import skyfall1 from "@/public/games/skyfall/skyfall-1.png";
import skyfall2 from "@/public/games/skyfall/skyfall-2.png";
import skyfall3 from "@/public/games/skyfall/skyfall-3.png";
import skyfall4 from "@/public/games/skyfall/skyfall-4.png";
import skyfall5 from "@/public/games/skyfall/skyfall-5.png";

import pvpmaster1 from "@/public/games/pvpmaster/pvpmaster-1.png";
import pvpmaster2 from "@/public/games/pvpmaster/pvpmaster-2.png";
import pvpmaster3 from "@/public/games/pvpmaster/pvpmaster-3.png";
import pvpmaster4 from "@/public/games/pvpmaster/pvpmaster-4.png";
import pvpmaster5 from "@/public/games/pvpmaster/pvpmaster-5.png";

import lobby5 from "@/public/games/lobby/lobby-5.png";
import lobby6 from "@/public/games/lobby/lobby-6.png";
import lobby3 from "@/public/games/lobby/lobby-3.png";
import lobby7 from "@/public/games/lobby/lobby-7.png";
import lobby8 from "@/public/games/lobby/lobby-8.png";

export type Game = {
    name: string;
    description?: string;
    images?: Array<StaticImageData>;
    steps?: Array<string> | { [key: string]: Array<string> };
};

export const games: Array<Game> = [
    {
        name: "Dominate",
        images: [dominate1, dominate3, dominate4, dominate5, dominate6],
        description:
            "A new spin on an old classic: rally your friends, plan your strategy, and win the battle to capture the most points!",
        steps: [
            "Spawn with your teammates and select a kit.",
            "Stand on a control point to capture it and start earning points for your team.",
            "Stand on opponents' points to retake them.",
            "The first team to reach 1000 points wins!"
        ]
    },
    {
        name: "Paintbrawl",
        description:
            "A fast-paced, action-packed multiplayer combat experience with tons of maps, weapons, and powerups to shake things up!",
        images: [
            paintbrawl1,
            paintbrawl2,
            paintbrawl3,
            paintbrawl4,
            paintbrawl5,
        ],
        steps: [
            "Receive a random weapon at the beginning of the game.",
            "Hit your enemies to earn points, or hit the ground to paint it your color.",
            "Avoid stepping in another team's paint - this will damage you.",
            "Earn one point for every heart of damage dealt, and a bonus five points for each kill.",
            "The first player to reach 60 points is the winner!"
        ]
    },
    {
        name: "Infinijump",
        description:
            "Get the highest score or be the first to complete a parkour course in the void.",
        images: [infinijump1, infinijump2, infinijump3, infinijump4],
        steps: {
            "Solo Mode": [
                "Start the game by moving in any direction",
                "As you jump from one block to another, more blocks will form ahead of you",
                "Blocks behind you will start to disappear",
                "Every block you reach adds one point to your score",
                "Falling into the void ends the game",
            ],
            "Versus Mode": [
                "Each player spawns in their own world",
                "When the game starts, start jumping from block to block",
                "Blocks behind you will start to disappear",
                "The last player to fall into the void wins the game",
            ],
            "Race Mode": [
                "Each player spawns in their own world",
                "When the game starts, start jumping from block to block",
                "Blocks behind you will start to disappear",
                "Every block you reach adds one point to your score",
                "The first player to 200 points wins",
            ],
        },
    },
    {
        name: "FastFall",
        description:
            "Get from the top to the bottom of a randomly-generated world as fast as possible!",
        images: [fastfall1, fastfall2, fastfall3, fastfall4],
        steps: [
            "Each player spawns at a designated spawn point with 2 HP (one heart)",
            "Fall damage is applied when you fall 3 blocks or more",
            "Certain blocks, like slime blocks, break your fall",
            "Without taking over two points of fall damage, make your way to the bottom of the world",
            "The first player to break the glass at the bottom of the world and step on the an emerald block wins",
        ],
    },
    {
        name: "WackyMaze",
        description:
            "Each player receives a knockback stick. Use it to wack your enemies off the map! The last player alive wins!",
        steps: [
            "Each player spawns in a random location on the map",
            "When the game starts, everyone receives a knockback stick",
            "Hit other players with the stick to knock them back",
            "Falling in the void eliminates you from the game",
            "The last player standing wins!",
        ],
        images: [wackymaze1, wackymaze2, wackymaze6, wackymaze8],
    },
    {
        name: "Infection",
        description: "Be the last survivor alive in a world of zombies!",
        steps: [
            "Each player spawns in a random location on the map",
            '20 seconds after the game starts, a random player is chosen as the "Alpha zombie"',
            "The alpha zombie is able to infect other players by attacking them",
            "Infected players can spread the infection in the same way (attacking) until there is only one survivor left",
            "The final survivor wins the game",
        ],
        images: [
            infection1,
            infection2,
            infection3,
            infection4,
            infection5,
            infection6,
        ],
    },
    {
        name: "BedWars",
        description:
            "Defend your bed while attacking the beds of other players!",
        steps: [
            "Each player or team spawns on their own island.",
            "Purchase blocks to protect your bed.",
            "Visit other islands to collect resources and attack other teams.",
            "Break another team's bed to prevent them from respawning.",
            "The last team standing wins!",
        ],
        images: [bedwars2, bedwars3, bedwars4, bedwars5, bedwars7],
    },
    {
        name: "SkyWars",
        description: "Be the last player standing in a fast-paced combat game!",
        steps: [
            "Each player spawns on their own island.",
            "Collect loot from your island's chests.",
            "Venture to the middle island to be the player with the best gear.",
            "Fight the other players with a combination of 1.8-style combat mechanics and newer items.",
            "The last player standing wins!",
        ],
        images: [skywars1, skywars2, skywars3, skywars4, skywars5],
    },
    {
        name: "Skyfall",
        description:
            "Fly around, loot islands, and fight in the sky in a 1.8-style combat game with modern Minecraft elements.",
        steps: [
            "Each player spawns on their own island.",
            "Collect loot from your island's chests.",
            "Use your elytra to fly to other islands.",
            "Punching a chicken while flying gives a similar boost to using a Firework Rocket.",
            "Islands near the middle and bottom of the map have more powerful loot, but also fiercer competition.",
            "The last player standing wins!",
        ],
        images: [skyfall1, skyfall2, skyfall3, skyfall4, skyfall5],
    },
    {
        name: "PvPMaster",
        description: "A PvP strategy game with 1.8-style combat.",
        steps: [
            "Each player spawns in a random location on the map with netherite armor.",
            "Killing a player reduces the quality of your armor by one level.",
            "Armor quality decreases from netherite → diamond → iron → chainmail → gold → leather.",
            "The first player to get a kill while wearing leather armor wins!",
        ],
        images: [pvpmaster1, pvpmaster2, pvpmaster3, pvpmaster4, pvpmaster5],
    },
    {
        name: "ArenaPvP",
        description:
            "An endless, open-ended combat game with a small arena and varied kits.",
        steps: [
            "Each player spawns at the top of the map.",
            "Choose from a selection of kits.",
            "Jump down and fight enemies.",
            "Fight endlessly! There are no winners or objectives in ArenaPvP.",
        ],
    },
    {
        name: "Lobby Parkour",
        description:
            "Finish multiple parkour courses, race your friends, and climb the leaderboards, all without leaving the lobby!",
        steps: [
            "Step on a silver pressure plate to start a course.",
            "Hit checkpoints along the way so you never need to start over.",
            "After you finish, visit the leaderboard to see how you stack up against the competition.",
        ],
        images: [lobby3, lobby5, lobby6, lobby7, lobby8],
    },
];
