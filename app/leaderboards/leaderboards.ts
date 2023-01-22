export const leaderboards: Array<Category> = [
    {
        name: "WackyMaze",
        leaderboards: [
            {
                name: "Most Wins",
                stat: "game_wackymaze_wins",
            },
            {
                name: "Most Whacks",
                stat: "game_wackymaze_whacks",
            },
            {
                name: "Most Kills",
                stat: "game_wackymaze_kills"
            }
        ]
    },
    {
        name: "SkyWars",
        leaderboards: [
            {
                name: "Most Wins",
                stat: "game_skywars_wins"
            },
            {
                name: "Most Kills",
                stat: "game_skywars_kills"
            },
            {
                name: "Most Deaths",
                stat: "game_skywars_deaths"
            }
        ]
    },
    {
        name: "Skyfall",
        leaderboards: [
            {
                name: "Most Wins",
                stat: "game_skyfall_wins"
            },
            {
                name: "Most Kills",
                stat: "game_skyfall_kills"
            },
            {
                name: "Most Deaths",
                stat: "game_skyfall_deaths"
            }
        ]
    },
    {
        name: "BedWars",
        leaderboards: [
            {
                name: "Most Wins",
                stat: "game_bedwars_wins"
            },
            {
                name: "Most Kills",
                stat: "game_bedwars_kills"
            },
            {
                name: "Most Deaths",
                stat: "game_bedwars_deaths"
            },
            {
                name: "Most Beds Broken",
                stat: "game_bedwars_beds_brokwn"
            }
        ]
    },
    {
        name: "Infinijump",
        leaderboards: [
            {
                name: "Most Wins (Versus)",
                stat: "game_infinijump_wins_versus"
            },
            {
                name: "Most Wins (Race)",
                stat: "game_infinijump_wins_race"
            },
            {
                name: "Highest Score (All Modes)",
                stat: "game_infinijump_highest_score"
            },
            {
                name: "Highest Score (Solo)",
                stat: "game_infinijump_highest_score_solo"
            },
            {
                name: "Highest Score (Versus)",
                stat: "game_infinijump_highest_score_versus"
            },
            {
                name: "Total Points (All Modes)",
                stat: "game_infinijump_total_points"
            },
            {
                name: "Total Points (Solo)",
                stat: "game_infinijump_total_points_solo"
            },
            {
                name: "Total Points (Race)",
                stat: "game_infinijump_total_points_race"
            },
            {
                name: "Total Points (Versus)",
                stat: "game_infinijump_total_points_versus"
            }
        ]
    },
    {
        name: "FastFall",
        leaderboards: [
            {
                name: "Fastest Time",
                stat: "game_fastfall_best_time",
                format: "time",
                sort: 1
            },
            {
                name: "Most Wins",
                stat: "game_fastfall_wins"
            }
        ]
    },
    {
        name: "PvPMaster",
        leaderboards: [
            {
                name: "Most Wins",
                stat: "game_pvpmaster_wins"
            },
            {
                name: "Most Kills",
                stat: "game_pvpmaster_kills"
            },
            {
                name: "Most Deaths",
                stat: "game_pvpmaster_deaths"
            },
        ]
    }
]

export type Category = {
    name: string;
    leaderboards: Array<Leaderboard>
}

export type Leaderboard = { name: string, stat: string, format?: "time" | "whole_number", sort?: -1 | 1 }