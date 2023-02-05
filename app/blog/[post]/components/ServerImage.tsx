import { getPlaiceholder } from "plaiceholder";
import Image from "./Image";

export default async function ServerImage(props: { src: string; alt: string }) {
    const { img, base64 } = await getPlaiceholder(props.src);

    return (
        <>
            <Image
                src={img.src}
                width={img.width}
                height={img.height}
                blur={base64}
                alt={props.alt ?? "Image"}
            />
        </>
    );
}
