import BaseHead from "@/components/BaseHead";

export default function Head() {

  return (
    <>
      <BaseHead image="/favicon_hq.png" />

      <title key="page-title">BlueDragon</title>

      <meta name="og:title" key="title" content="BlueDragon | Minecraft Minigames" />
      <meta name="og:description" key="description" content="BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many more!" />
      <meta name="og:type" key="type" content="website" />
    </>
  )
}
