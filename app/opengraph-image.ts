import { generate } from "./utils/og";

export default async function ogImage() {
    return await generate({
        title: "BlueDragon",
        ogPreview:
            "BlueDragon is a Minecraft server that strives to produce high-quality, original content. Join for free to explore unique minigames like Paintbrawl, WackyMaze, and more!",
    });
}
