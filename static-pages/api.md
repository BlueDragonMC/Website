---
title: BlueDragon Public API Reference
description: BlueDragon's API endpoints, the data they provide, and how to access them.
author: Flux
created: 2023-02-18
modified: 2023-02-18
---

## Usage

### Base URL

`https://bluedragonmc.com/api/`

### Requests

All requests should be `GET` requests. Any other request methods may not be supported.

### Authentication

The API currently does **not** rely on any authentication. If we see an unsustainable number of requests, we may add an API key system for rate limiting.

## Player Information

### Path: `/player`

#### Sample URL:

```
https://bluedragonmc.com/api/player?username=wsad_
```

### Query Parameters

| Name       | Description                | Required |
| ---------- | -------------------------- | -------- |
| `username` | The username of the player | Yes      |

### Sample Response

```json
{
  "username": "wsad_",
  "uuid": "110429e8-197f-4446-8bec-5d66f17be4d5",
  "stats": {
    "game_infinijump_highest_score": 227,
    "game_wackymaze_wins": 82,
    "game_skywars_wins": 4,
    "lobby_parkour_cave_best_time": 20635,
    ...
  },
  "lastLogin": 1676755435986,
  "xp": 22183,
  "cosmeticCount": 39,
  "level": 18.24107289740401,
  "coins": 22133,
  "meta": {
    "prefix": "<dark_gray>[<#B72A2A>Owner<dark_gray>] ",
    "primaryGroup": "owner",
    "rankcolor": "#B72A2A"
  }
}
```

### Notes

- `firstLogin` may not be present on some users.
- `firstLogin` and `lastLogin` are measured as [Unix timestamps](https://en.wikipedia.org/wiki/Unix_time).
- A player's `level` is directly based on their `xp`. See the formula [here](https://github.com/BlueDragonMC/Website/blob/cd9645154f0c41bf3d92cbf237bb4affa830aa3c/pages/api/player.ts#L35-L38).
- The `meta.prefix` and `meta.rankcolor` may not be present on users without a rank.
- If a player has not logged in to BlueDragon yet, the API will return a `404` error with the text `"Not found"`.

## Leaderboard Information

### Path: `/leaderboard`

#### Sample URL:

```
https://bluedragonmc.com/api/leaderboard?statistic=game_wackymaze_wins&sort=-1
```

### Query Parameters

| Name        | Description                                                                                 | Required |
| ----------- | ------------------------------------------------------------------------------------------- | -------- |
| `statistic` | The name of the statistic to rank.                                                          | Yes      |
| `sort`      | The direction that the data is sorted. Must be either `-1` (descending) or `1` (ascending). | No       |

### Sample Response

```json
{
  "statistic": "game_wackymaze_wins",
  "sort": -1,
  "leaderboard": [
    {
      "uuid": "a0048143-460f-417e-9119-f30eb9674a7a",
      "username": "ex4",
      "value": 116
    },
    {
      "uuid": "110429e8-197f-4446-8bec-5d66f17be4d5",
      "username": "wsad_",
      "value": 82
    },
    ...
  ]
}
```

### Notes

- The `leaderboard` list contains a set of entries, each containing a `uuid`, `username`, and `value`.
- Any leaderboards involving time (namely Fastest Time) will be measured in milliseconds.
- Only the first 50 entries (if present) will be included in the response.

## List of Statistic Names

| Game          | Mode   | Name                                           | Type                    |
| ------------- | ------ | ---------------------------------------------- | ----------------------- |
| Paintbrawl    | All    | `game_paintbrawl_wins`                         | Integer                 |
| Paintbrawl    | All    | `game_paintbrawl_kills`                        | Integer                 |
| Paintbrawl    | All    | `game_paintbrawl_powerups_claimed`             | Integer                 |
| Paintbrawl    | All    | `game_paintbrawl_total_points`                 | Integer                 |
| Paintbrawl    | All    | `game_paintbrawl_kills_snowball_sniper_rifle`  | Integer                 |
| Paintbrawl    | All    | `game_paintbrawl_kills_snowball_machine_gun`   | Integer                 |
| Paintbrawl    | All    | `game_paintbrawl_kills_snowball_paintball_gun` | Integer                 |
| Paintbrawl    | All    | `game_paintbrawl_kills_snowball_paintbrush`    | Integer                 |
| Paintbrawl    | All    | `game_paintbrawl_kills_snowball_shotgun`       | Integer                 |
| WackyMaze     | All    | `game_wackymaze_wins`                          | Integer                 |
| WackyMaze     | All    | `game_wackymaze_whacks`                        | Integer                 |
| SkyWars       | All    | `game_skywars_wins`                            | Integer                 |
| SkyWars       | All    | `game_skywars_kills`                           | Integer                 |
| SkyWars       | All    | `game_skywars_deaths`                          | Integer                 |
| Skyfall       | All    | `game_skyfall_wins`                            | Integer                 |
| Skyfall       | All    | `game_skyfall_kills`                           | Integer                 |
| Skyfall       | All    | `game_skyfall_deaths`                          | Integer                 |
| BedWars       | All    | `game_bedwars_wins`                            | Integer                 |
| BedWars       | All    | `game_bedwars_kills`                           | Integer                 |
| BedWars       | All    | `game_bedwars_deaths`                          | Integer                 |
| BedWars       | All    | `game_bedwars_beds_broken`                     | Integer                 |
| Infinijump    | Versus | `game_infinijump_wins_versus`                  | Integer                 |
| Infinijump    | Versus | `game_infinijump_highest_score_versus`         | Integer                 |
| Infinijump    | Versus | `game_infinijump_total_points_versus`          | Integer                 |
| Infinijump    | Race   | `game_infinijump_wins_race`                    | Integer                 |
| Infinijump    | Race   | `game_infinijump_total_points_race`            | Integer                 |
| Infinijump    | Solo   | `game_infinijump_highest_score_solo`           | Integer                 |
| Infinijump    | Solo   | `game_infinijump_total_points_solo`            | Integer                 |
| Infinijump    | All    | `game_infinijump_highest_score`                | Integer                 |
| Infinijump    | All    | `game_infinijump_total_points`                 | Integer                 |
| FastFall      | All    | `game_fastfall_best_time`                      | Duration (milliseconds) |
| FastFall      | All    | `game_fastfall_wins`                           | Integer                 |
| PvPMaster     | All    | `game_pvpmaster_wins`                          | Integer                 |
| PvPMaster     | All    | `game_pvpmaster_kills`                         | Integer                 |
| PvPMaster     | All    | `game_pvpmaster_deaths`                        | Integer                 |
| Lobby Parkour | All    | `lobby_parkour_world_tour_best_time`           | Duration (milliseconds) |
| Lobby Parkour | All    | `lobby_parkour_cave_best_time`                 | Duration (milliseconds) |

Have an idea for a statistic we should track? Let us know in our [Discord server](https://discord.gg/3gvSPdW).
