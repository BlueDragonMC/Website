import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../app/blog/[article]/article.module.css";
import BlurredPreviewableImage from "./BlurredPreviewableImage";
import "photoswipe/dist/photoswipe.css";
import {
    ComponentPropsWithoutRef,
    TableRowProps,
} from "react-markdown/lib/ast-to-react";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import React from "react";
import Link from "next/link";
import Gallery from "./Gallery";

export default function CustomMarkdown({ children }: { children: string }) {
    return (
        <Gallery>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={styles.markdown}
                components={{
                    img: ImageRenderer,
                    table: TableRenderer,
                    tr: TableRowRenderer,
                    a: AnchorRenderer,
                }}
            >
                {children}
            </ReactMarkdown>
        </Gallery>
    );
}

function ImageRenderer(
    props: ComponentPropsWithoutRef<"img"> & ReactMarkdownProps
) {
    if (!props.src) return <></>;

    return (
        <>
            {/* @ts-expect-error Server Component */}
            <BlurredPreviewableImage
                src={props.src}
                alt={props.alt ?? "Image"}
            />
        </>
    );
}

function AnchorRenderer(
    props: ComponentPropsWithoutRef<"a"> & ReactMarkdownProps
) {
    if (!props.href) {
        return <a href={props.href}>{props.children}</a>;
    }
    return (
        <>
            <Link href={props.href}>
                <span>{props.children}</span>
            </Link>
        </>
    );
}

function TableRenderer(
    props: ComponentPropsWithoutRef<"table"> & ReactMarkdownProps
) {
    return <table className="w-full">{props.children}</table>;
}

let header = [] as React.ReactNode[];

function TableRowRenderer(props: TableRowProps) {
    if (props.isHeader) {
        header = props.children;
        return <tr className="hidden md:table-row">{props.children}</tr>;
    } else {
        return (
            <tr
                className="grid md:table-row"
                style={{
                    gridTemplateColumns:
                        "minmax(0, max-content) minmax(0, 1fr)",
                }}
            >
                {props.children.map((child, i) => {
                    return (
                        <React.Fragment key={i}>
                            <td className="table-cell font-bold md:hidden">
                                {
                                    (header[i] as React.ReactElement)?.props
                                        ?.children
                                }
                            </td>
                            {child}
                        </React.Fragment>
                    );
                })}
            </tr>
        );
    }
}
