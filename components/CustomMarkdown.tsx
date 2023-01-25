import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../app/blog/[article]/article.module.css";
import BlurredPreviewableImage from "./BlurredPreviewableImage";

export default function CustomMarkdown({ children }: { children: string }) {
    return <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className={styles.markdown}
        components={{
            /* @ts-expect-error Server Component */
            "p": ParagraphRenderer,
            /* @ts-expect-error Server Component */
            "img": ImageRenderer
        }}
    >{children}</ReactMarkdown>
}

async function ParagraphRenderer(props: any) {
    let children = [];
    let hasImage = false;
    for (const child of props.children) {
        if (child.type == "img") {
            hasImage = true;
            children.push(await ImageRenderer(child.props));
        } else {
            children.push(child);
        }
    }

    return <p>{children}</p>
}

async function ImageRenderer(props: any) {
    if (!props.src) return <></>;

    return <>
        {/* @ts-expect-error Server Component */}
        <BlurredPreviewableImage src={props.src} alt={props.alt ?? "Image"} />
    </>
}
