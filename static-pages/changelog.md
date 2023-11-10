---
title: Changelog
description: A list of everything new on the server, all in one place.
author: BlueDragon Team
created: 2022-06-27
modified: 2023-11-09
---

## 2023-11-09

#### Server

- Added a new WackyMaze map: Orbit

## 2023-11-08

#### Server

- Reworked our internal configuration system to make it easier to add more customization to specific maps
- Rewrote our internal module resolution/dependency system to make it more robust
- Added a new Burst Gun to Paintbrawl
- Fixed an issue in Paintbrawl where paintballs would be stopped by powerups

## 2023-11-07

#### Server

- Added clickable links to the `/version` command
- Added some status information to the sidebar in most games ("Waiting for players...", "Starting soon...", etc.)
- Fixed an issue where players were automatically re-routed to a different server instead of being kicked

## 2023-09-23

#### Server

- Made BedWars wool appear in the shop as your team's color instead of changing its color when placed in the world

## 2023-07-26

#### Server

- Added three new block sets to FastFall: Desert, Cave, and Taiga

## 2023-07-03

#### Server

- Added [Dominate](/blog/2023-07-03-dominate-1-20)
- Added tic-tac-toe minigame to the lobby
- Updated to 1.20.1

#### Website

- Created a new homepage design featuring Dominate.
- Added Dominate game and leaderboards.

### 2023-06-12

#### Server

- Fixed bug where fall damage wasn't always working
- Fixed bug where chat was not confined to one instance

### 2023-02-26

#### Website

- Added leaderboard positions to player pages where applicable ([example](/player/wsad_)).
- Added a [new API endpoint](/page/api) to get leaderboard positions.

### 2023-02-23

#### Website

- Created a new homepage design featuring Paintbrawl.
- Moved contents from the About page to the homepage.

### 2023-02-20

#### Server

- Added new Paintbrawl statistics:
  - Total points
  - Kills (per-weapon)
  - Powerups claimed
  - Blocks vacuumed

### 2023-02-19

#### Server

- Added [**Paintbrawl**](/blog/2023-02-19-new-game-paintbrawl), a fast-paced, action-packed multiplayer combat experience with tons of maps, weapons, and powerups to shake things up!

#### Website

- Added **Paintbrawl** leaderboards and statistics.

### 2023-02-18

#### Website

- Redesigned the [leaderboards page](/leaderboards).
- Added more information to player [statistic pages](/player/wsad_), including:
  - Rank name and color
  - Network level
  - Total experience
  - Coins
  - Owned cosmetics
- Added [API documentation](/page/api) for players and leaderboards.

### 2023-01-28

#### Website

- Added a new status page: [bluedragonmc.com/status](/status)
  - This page displays connected players and latency, and is updated whenever the page is refreshed

### 2023-01-27

#### Server

- Fixed an issue where players could be declared the winner of a game before it started
- Fixed an issue where players would be invisible to each other due to a problem with player info packets not being sent
- Fixed an issue where blocks would be duplicated upon joining, leaving, and rejoining the same multiplayer Infinijump game
- Fixed an issue where the "total points" Infinijump statistic was not recorded in Race mode

### 2023-01-26

#### Server

- Added a new WackyMaze map: Canopy! (see the blog post [here](/blog/2023-01-27-new-wackymaze-map))
- Made lava lethal in WackyMaze - _this change is only applicable to Canopy as it is the only map with lava_
- Started recording kill and death statistics in PvPMaster
- Fixed an issue where the countdown would go down faster than the intended rate
- Fixed an issue where games would not start when the last required player had to switch game servers to join the game

#### Website

- Redesigned leaderboards page

### 2023-01-23

#### Server

- Added a Jukebox menu! To play a song, type `/play` and click the song that you want to play. Other new commands include `/pause`, and `/resume`

### 2023-01-14

#### Server

- Changed the style of the `"bluedragonmc.com"` text on the sidebar
- Added diagnostic information to the sidebar

#### Website

- Created a new website for BlueDragon!

### 2023-01-09

#### Games

- Made the FastFall sidebar stop updating when the game ends
- Added a sidebar to WackyMaze displaying the currently alive players
- Fixed a bug with Infinijump that caused blocks to spawn in sparratic directions when in multiplayer modes

#### Server

- Started recording first- and last-joined dates for each player

### 2023-01-07

#### Server

- Internally changed the way that worlds are chosen when a player joins a server
- Fixed many bugs where players would spawn in the wrong locations
- Improved support for Minecraft 1.19.2

### 2023-01-06

#### Server

- Fix an issue causing some players to not show up on Lobby leaderboard displays

### 2023-01-01

#### Server

- Added a Race mode to Infinijump

### 2022-12-31

#### Server

- Started recording mode-specific "highest-score" statistics in Infinijump

### 2022-12-30

#### Server

- Added a game mode selector

### 2022-12-28

#### Server

- Added a Versus mode to Infinijump!

### 2022-12-27

#### Server

- Added levelling information to Lobby sidebar
- Fix a bug preventing Infection from initializing
- Added sidebar displays in the Lobby and in Infinijump
- Improved the FastFall sidebar

### 2022-12-20

#### Server

- Added a way to change configuration without rollout out a game update

### 2022-12-18

#### Server

- Switched to LuckPerms for permissions and group handling

### 2022-11-28

#### Server

- Fixed randomization of chest loot

### 2022-11-22

#### Server

- Fixed an issue where a statistic was recorded multiple times instead of only once on login
- Fixed an issue with creating a game with a random map

### 2022-11-19

#### Server

- Modified the structure of the codebase to allow externally-made games to be loaded like plugins

### 2022-11-13

#### Server

- Refactored database and messaging logic to be more easily maintainable

### 2022-11-09

#### Server

- Fixed the total player count in server list responses

### 2022-11-08

#### Server

- Fixed a bug that could prevent BedWars from initializing properly

### 2022-11-07

#### Server

- Added network-wide private messages using the `/msg` command

### 2022-11-06

#### Server

- Started work on switching our internal messaging system from RabbitMQ to gRPC

### 2022-11-02

#### Server

- Fixed a bug that prevented SkyWars from initializing properly

### 2022-11-01

#### Server

- Added a `/version` command that allows players to see the server's version, commit date, and uptime

### 2022-10-28

#### Server

- Added cosmetics to Infinijump
- Added coin awards to Infinijump
- Fixed glowing effect on Infinijump 3x3 platforms

### 2022-10-23

#### Server

- Add options to replay or return to the Lobby after completing Infinijump

### 2022-10-08

#### Server

- Added a rainbow Lobby hat
- Converted text in cosmetic items into a translatable format

### 2022-10-07

#### Server

- Fixed an issue that prevented BedWars from initializing properly

### 2022-10-01

#### Server

- Added lobby hats

### 2022-09-30

#### Server

- Added Skyfall
- Fixed Lobby leaderboard map rendering with longer usernames
- Added FastFall cosmetics

### 2022-09-29

#### Server

- Added menus for cosmetics and some working cosmetics

### 2022-09-27

#### Server

- Added GUIs for map selection, game information, and random game
- Added ender pearls and golden apples to the BedWars shop
- Added projectile sounds and ender pearl support

### 2022-09-24

#### Server

- Greatly reduce the number of unnecessary packets sent by leaderboard displays
- Made the player teleport to spawn if they are already in the lobby while typing /lobby

### 2022-09-23

#### Server

- Added lobby parkour
- Added hotbar buttons to teleport to a checkpoint and to reset the parkour course
- Fixed bugs relating to double jumping in the lobby

### 2022-09-20

#### Server

- Added a combat area in the Lobby

### 2022-09-19

#### Server

- Added a notification message and sound when the player gets a new record time in FastFall
- Added a boss bar display to the lobby

### 2022-09-16

#### Server

- Eliminated an unnecessary delay of up to 2 seconds when creating a new game

### 2022-09-12

#### Server

- Changed player data loading to before players are able to complete the login phase
- Fixed many stability and concurrency issues with the login process

### 2022-09-05

#### Server

- Fixed bow placement in the BedWars shop
- Added ViaVersion support to allow newer clients to connect

### 2022-09-04

#### Server

- Added projectiles to BedWars shop
- Added fireball projectiles

### 2022-09-03

#### Server

- Added bow/arrow, snowball, and egg projectile support
- Improved Infinijump sounds
- Removed Infinijump game start countdown
- Changed Infinijump blocks so they reappear when the player dies
- Randomized SkyWars loot item positions and fixed a few SkyWars bugs

### 2022-09-02

#### Server

- Improved the stability of the queue and party systems
- Make lobby compass clickable in the player inventory
- Made item names and descriptions, action bars, titles, holograms, and menu names translatable
- Added a jukebox to the lobby with all the standard Minecraft music discs
- Made Infinijump dark
- Improved Infinijump failed jump detection
- Fixed an issue with FastFall statistics

### 2022-09-01

#### Server

- Fixed fall damage applying when it was not supposed to
- Added a leaderboard browser
- Added a few new statistics for FastFall and Infinijump

### 2022-08-31

#### Server

- Added statistics to all games
- Added a basic leaderboard layout and dummy leaderboard with automatic text sizing

### 2022-08-30

#### Server

- Started work on Lobby leaderboard displays
- Added `/leaderboard` command for viewing the top-ranked players for any tracked statistic

### 2022-08-28

#### Server

- Fixed Infinijump blocks not appearing ahead of the player after the game starts
- Resolved issues relating to fall damage
- Added firework win effect

### 2022-08-27

#### Server

- Fixed an issue preventing players from running certain subcommands of `/party`
- Fixed purchasing items in BedWars shop
- Fixed the `/list` command with more than 2 players in one instance

### 2022-08-25

#### Server

- Added themes to FastFall
- Added a "\<player\> is in the lead!" alert in FastFall
- Added a glowing effect to the lead player in FastFall
- Fixed an issue when there were multiple FastFall spawnpoints
- Added a `/list` command for viewing the players in a player's current game

### 2022-08-23

#### Server

- Added `/msg` and `/party list` commands
- Fixed FastFall only creating one block ahead
- Decreased the waiting period between falling and the game ending in Infinijump

### 2022-08-18

#### Server

- Added ArenaPvP

### 2022-08-17

#### Server

- Fixed MOTD centering on an invalid client version

### 2022-08-09

#### Server

- Added a few items to SkyWars loot
- Fixed a bug that allowed players to swap items into their offhand when not allowed to move items in their inventory
- Started work on making the server easily translatable into other languages

### 2022-08-08

#### Server

- Added block breaking animation to the entire platform in Infinijump
- Increased average Infinijump jump distance

### 2022-08-07

#### Server

- Replaced slime blocks with platforms in Infinijump
- Fixed the downward trend of parkour jumps in Infinijump
- Nerfed the Fast Feet BedWars upgrade
- Added PvPMaster

### 2022-08-06

#### Server

- Added a compass to player hotbars in the Lobby

### 2022-08-04

#### Server

- Fixed the total player count in server list pings
- Fixed a bug where players were queued twice
- Improved Infinijump block collision detection
- Reduced Infinijump countdown timer to 3 seconds

### 2022-07-31

#### Server

- Added Infinijump
- Fixed an issue with spectator invisibility where spectators could be seen as floating heads

### 2022-07-25

#### Server

- Implemented various formatting changes
- Added rank prefixes and colors

### 2022-07-24

#### Server

- Added a game selector
- Added lobby NPCs and random game support

### 2022-07-23

#### Server

- Added custom death messages for all games
- Added `/ping` command which tells a player their current (approximate) connection latency
- Added golden apples and regeneration and absorption potion effects
- Fixed an issue allowing friendly fire in Infection
- Fixed an issue allowing spectators to pick up items in the world
- Nerfed the Fast Feet BedWars team upgrade
- Added a sidebar to Infection

### 2022-07-21

#### Server

- Fixed smooth (non-rotating) teleportation in CountdownModule
- Added Infection
- Added a database-backed punishment system
- Fixed a few minor bugs

### 2022-07-20

#### Server

- Added smooth teleportation in CountdownModule that does not reset head position
- Fixed an issue where leaving and rejoining during the countdown would not restart the countdown
- Nerfed the Fast Feet BedWars team upgrade
- Fixed an issue that allowed spectators to open the BedWars shop
- Added per-instance tablist and chat
- Fixed an issue where players would join the lobby before being sent to their desired game

### 2022-07-19

#### Server

- FastFall improvements and bug fixes

### 2022-07-18

#### Server

- Added FastFall

### 2022-07-17

#### Server

- Fixed a few minor bugs

### 2022-07-16

#### Server

- Fixed various issues in BedWars and SkyWars
- Fixed a bug where players' attributes would not reset after they died
- Nerf the Fast Feet BedWars team upgrade
- Randomized the order that spawn points were used

### 2022-07-15

#### Server

- Added a server icon
- Added SkyWars
- Fixed single chests and added proper chest animations and sounds
- Implemented elytra fall damage mechanic
- Changed the behavior of double jumps in the Lobby

### 2022-07-13

#### Server

- Added double jumping in the Lobby
- Fixed various BedWars bugs
- Added a player XP system
- Added `/party accept`, `warp`, and `transfer` subcommands
- Fixed item drop velocity and pickup delay
- Fixed many other minor issues

### 2022-07-12

#### Server

- Added a `/party` command
- Fixed bugs with the queue system and with NPCs

### 2022-07-11

#### Server

- Added passive healing to BedWars
- Modified BedWars kit balancing
- Added an experimental new queue system

### 2022-07-10

#### Server

- Fixed item damage/durability and armor resistance
- Fixed dropping items on the ground
- Added more items to the BedWars shop
- Fixed bugs with BedWars NPCs not displaying properly

### 2022-07-09

#### Server

- Fixes and improvements for BedWars
- Added a system for scoreboards
- Added a custom chat format
- Created a `/join` command that allows players to join games without using menus
- Implemented armor damage reduction and sword damage bonuses (using 1.9+ values)

### 2022-07-08

#### Server

- Revamped command system and added a few commands

### 2022-07-06

#### Server

- Added a lobby and a temporary queue system

### 2022-07-04

#### Server

- Added loading of spawn points from a Mongo database

### 2022-07-03

#### Server

- Bug fixes and misc. improvements

### 2022-07-02

#### Server

- Added a system for loot chests

### 2022-07-01

#### Server

- Added team functionality with custom prefixes and name colors for each team
- NPC improvements
- Added a system for creating menus

### 2022-06-30

#### Server

- Started work on 1.8-style combat
- Added a countdown system for minigames
- Added instant respawns
- Added basic spectating logic

### 2022-06-27

#### Server

- The current iteration of BlueDragon was born!
