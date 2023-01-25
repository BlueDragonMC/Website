import BaseHead from "@/components/BaseHead";

export default function Head() {

  return (
    <>
      <BaseHead image="/api/og" />

      <title>BlueDragon</title>

      <meta name="og:title" content="BlueDragon | Minecraft Minigames" />
      <meta name="og:description" content="BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many more!" />
      <meta name="og:type" content="website" />
    </>
  )
}
