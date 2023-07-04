import { generate } from "../utils/og";

export default async function ogImage() {
    return await generate({
        title: "How To Join BlueDragon",
        ogPreview: "Get started in four simple steps.",
    });
}
