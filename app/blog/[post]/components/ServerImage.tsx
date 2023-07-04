import { readFile } from "fs/promises";
import path from "path";
import { getPlaiceholder } from "plaiceholder";
import Image from "./Image";

export default async function ServerImage(props: { src: string; alt: string }) {
    const { metadata, base64 } = await getPlaiceholder(
        await readFile(path.join("./public", props.src))
    );

    return (
        <>
            <Image
                src={props.src}
                width={metadata.width}
                height={metadata.height}
                blur={base64}
                alt={props.alt ?? "Image"}
            />
        </>
    );
}
