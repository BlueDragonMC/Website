import BaseHead from "@/components/BaseHead";

export default function Head() {
    return (
        <>
            <BaseHead
                image={`/api/og?title=Games&ogPreview=${encodeURIComponent(
                    "All of the minigames on the BlueDragon Minecraft server."
                )}`}
            />
            <title>Games | BlueDragon</title>
            <meta name="og:title" content="Games | BlueDragon" />
            <meta
                name="og:description"
                content="All of the minigames on the BlueDragon Minecraft server."
            />
            <meta name="og:type" content="article" />
        </>
    );
}
