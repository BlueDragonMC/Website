import OpenGraphImage from "@/components/OpenGraphImage";
import OpenGraphURL from "@/components/OpenGraphURL";

export default function Head() {

  return (
    <>
      <title>BlueDragon</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many more!" />
      <link rel="icon" href="/favicon.ico" />

      <meta name="og:title" content="BlueDragon | Minecraft Minigames" />
      <meta name="og:description" content="BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many more!" />
      <meta name="og:type" content="website" />
      <OpenGraphImage relative="/favicon_hq.png" />
      <OpenGraphURL />
    </>
  )
}
