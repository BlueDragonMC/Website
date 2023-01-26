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
        mode: "Versus",
        leaderboards: [
            {
                name: "Most Wins",
                statName: "Wins",
                stat: "game_infinijump_wins_versus",
            },
            {
                name: "Highest Score",
                stat: "game_infinijump_highest_score_versus",
            },
            {
                name: "Total Points",
                stat: "game_infinijump_total_points_versus",
            },
        ],
    },
    {
        name: "Infinijump",
        mode: "Race",
        leaderboards: [
            {
                name: "Most Wins",
                statName: "Wins",
                stat: "game_infinijump_wins_race",
            },
            {
                name: "Total Points",
                stat: "game_infinijump_total_points_race",
            },
        ],
    },
    {
        name: "Infinijump",
        mode: "Solo",
        leaderboards: [
            {
                name: "Highest Score",
                stat: "game_infinijump_highest_score_solo",
            },
            {
                name: "Total Points",
                stat: "game_infinijump_total_points_solo",
            },
        ],
    },
    {
        name: "Infinijump",
        mode: "All Modes",
        leaderboards: [
            {
                name: "Highest Score",
                stat: "game_infinijump_highest_score",
            },

            {
                name: "Total Points",
                stat: "game_infinijump_total_points",
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
        name: "Lobby",
        mode: "Cave Parkour",
        leaderboards: [
            {
                name: "Fastest Time",
                stat: "lobby_parkour_cave_best_time",
                format: "time",
                sort: 1,
            },
        ],
    },
    {
        name: "Lobby",
        mode: "World Tour Parkour",
        leaderboards: [
            {
                name: "Fastest Time",
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
    mode?: string;
    leaderboards: Array<Leaderboard>;
};

export type Leaderboard = {
    name: string;
    statName?: string;
    stat: string;
    format?: "time" | "whole_number";
    sort?: -1 | 1;
};
