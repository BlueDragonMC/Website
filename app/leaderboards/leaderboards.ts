export const leaderboards: Array<Category> = [
    {
        name: "WackyMaze",
        leaderboards: [
            {
                name: "Most Wins",
                statName: "Wins",
                stat: "game_wackymaze_wins",
            },
            {
                name: "Most Whacks",
                statName: "Whacks",
                stat: "game_wackymaze_whacks",
            },
            {
                name: "Most Kills",
                statName: "Kills",
                stat: "game_wackymaze_kills",
            },
        ],
    },
    {
        name: "SkyWars",
        leaderboards: [
            {
                name: "Most Wins",
                statName: "Wins",
                stat: "game_skywars_wins",
            },
            {
                name: "Most Kills",
                statName: "Kills",
                stat: "game_skywars_kills",
            },
            {
                name: "Most Deaths",
                statName: "Deaths",
                stat: "game_skywars_deaths",
            },
        ],
    },
    {
        name: "Skyfall",
        leaderboards: [
            {
                name: "Most Wins",
                statName: "Wins",
                stat: "game_skyfall_wins",
            },
            {
                name: "Most Kills",
                statName: "Kills",
                stat: "game_skyfall_kills",
            },
            {
                name: "Most Deaths",
                statName: "Deaths",
                stat: "game_skyfall_deaths",
            },
        ],
    },
    {
        name: "BedWars",
        leaderboards: [
            {
                name: "Most Wins",
                statName: "Wins",
                stat: "game_bedwars_wins",
            },
            {
                name: "Most Kills",
                statName: "Kills",
                stat: "game_bedwars_kills",
            },
            {
                name: "Most Deaths",
                statName: "Deaths",
                stat: "game_bedwars_deaths",
            },
            {
                name: "Most Beds Broken",
                statName: "Beds Broken",
                stat: "game_bedwars_beds_brokwn",
            },
        ],
    },
    {
        name: "Infinijump",
        leaderboards: [
            {
                name: "Most Wins (Versus)",
                statName: "Wins (Versus)",
                stat: "game_infinijump_wins_versus",
            },
            {
                name: "Most Wins (Race)",
                statName: "Wins (Race)",
                stat: "game_infinijump_wins_race",
            },
            {
                name: "Highest Score (All Modes)",
                stat: "game_infinijump_highest_score",
            },
            {
                name: "Highest Score (Solo)",
                stat: "game_infinijump_highest_score_solo",
            },
            {
                name: "Highest Score (Versus)",
                stat: "game_infinijump_highest_score_versus",
            },
            {
                name: "Total Points (All Modes)",
                stat: "game_infinijump_total_points",
            },
            {
                name: "Total Points (Solo)",
                stat: "game_infinijump_total_points_solo",
            },
            {
                name: "Total Points (Race)",
                stat: "game_infinijump_total_points_race",
            },
            {
                name: "Total Points (Versus)",
                stat: "game_infinijump_total_points_versus",
            },
        ],
    },
    {
        name: "FastFall",
        leaderboards: [
            {
                name: "Fastest Time",
                stat: "game_fastfall_best_time",
                format: "time",
                sort: 1,
            },
            {
                name: "Most Wins",
                statName: "Wins",
                stat: "game_fastfall_wins",
            },
        ],
    },
    {
        name: "PvPMaster",
        leaderboards: [
            {
                name: "Most Wins",
                statName: "Wins",
                stat: "game_pvpmaster_wins",
            },
            {
                name: "Most Kills",
                statName: "Kills",
                stat: "game_pvpmaster_kills",
            },
            {
                name: "Most Deaths",
                statName: "Deaths",
                stat: "game_pvpmaster_deaths",
            },
        ],
    },
    {
        name: "Lobby Parkour",
        leaderboards: [
            {
                name: "Fastest Time (Cave Parkour)",
                stat: "lobby_parkour_cave_best_time",
                format: "time",
                sort: 1,
            },
            {
                name: "Fastest Time (World Tour Parkour)",
                stat: "lobby_parkour_world_tour_best_time",
                format: "time",
                sort: 1,
            },
        ],
    },
];

export const getLeaderboard = (stat: string) => {
    for (const cat of leaderboards) {
        for (const lb of cat.leaderboards) {
            if (lb.stat == stat) {
                return {
                    leaderboard: lb,
                    category: cat,
                };
            }
        }
    }
    return null;
};

export const format = (
    format: string | undefined,
    value: number | undefined
) => {
    if (value === undefined || value === null) return undefined;
    if (!format || format == "whole_number") {
        return value;
    } else if (format == "time") {
        const date = new Date(value);

        return (
            date.getUTCHours().toString().padStart(2, "0") +
            ":" +
            date.getUTCMinutes().toString().padStart(2, "0") +
            ":" +
            date.getUTCSeconds().toString().padStart(2, "0") +
            "." +
            date.getUTCMilliseconds().toString().padStart(3, "0")
        );
    }
};

export type Category = {
    name: string;
    leaderboards: Array<Leaderboard>;
};

export type Leaderboard = {
    name: string;
    statName?: string;
    stat: string;
    format?: "time" | "whole_number";
    sort?: -1 | 1;
};
