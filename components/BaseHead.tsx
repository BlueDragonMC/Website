import OpenGraphImage from "./OpenGraphImage";
import OpenGraphURL from "./OpenGraphURL";

export default function BaseHead({ image }: { image?: string }) {
    return (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta
                name="description"
                content="BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many more!"
            />
            {/* Favicons */}
            <link
                rel="icon"
                type="image/png"
                href="favicon-196x196.png"
                sizes="196x196"
            />
            <link
                rel="icon"
                type="image/png"
                href="favicon-96x96.png"
                sizes="96x96"
            />
            <link
                rel="icon"
                type="image/png"
                href="favicon-32x32.png"
                sizes="32x32"
            />
            <link
                rel="icon"
                type="image/png"
                href="favicon-16x16.png"
                sizes="16x16"
            />
            <link
                rel="icon"
                type="image/png"
                href="favicon-128.png"
                sizes="128x128"
            />
            <meta name="application-name" content="BlueDragon" />

            <OpenGraphImage relative={image ?? "/api/og"} />
            <OpenGraphURL />
        </>
    );
}
