import { generate } from "../utils/og";

export default async function ogImage() {
    return await generate({
        title: "Blog",
        ogPreview: "Check out all the latest updates from the BlueDragon team.",
    });
}
