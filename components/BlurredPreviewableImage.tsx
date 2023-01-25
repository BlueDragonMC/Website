import { getPlaiceholder } from "plaiceholder"
import PreviewableImage from "./PreviewableImage";

export default async function BlurredPreviewableImage({ src, alt }: { src: string, alt: string }) {

    const { base64, img } = await getPlaiceholder(src);

    return (
        <PreviewableImage src={img.src} width={img.width} height={img.height} blur={base64} alt={alt} />
    )
}