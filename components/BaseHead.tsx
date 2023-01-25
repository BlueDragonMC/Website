import OpenGraphImage from "./OpenGraphImage";
import OpenGraphURL from "./OpenGraphURL";

export default function BaseHead({ image }: { image?: string }) {
    return <>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many more!" />
        <link rel="icon" href="/favicon_hq.png" />
        <OpenGraphImage relative={image ?? "/api/og"} />
        <OpenGraphURL />
    </>
}