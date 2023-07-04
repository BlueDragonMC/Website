import { generate } from "../utils/og";

export default async function ogImage() {
    return await generate({
        title: "Server Status",
        ogPreview:
            "Check if the Minecraft server is up, and view player counts and network latency.",
    });
}
