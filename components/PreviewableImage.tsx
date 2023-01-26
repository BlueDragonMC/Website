"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

export default function PreviewableImage({
    src,
    width,
    height,
    blur,
    alt,
}: {
    src: string;
    width: number;
    height: number;
    blur: string;
    alt: string;
}) {
    return (
        <Gallery>
            <Item original={src} thumbnail={src} width={width} height={height}>
                {({ ref, open }) => (
                    <Image
                        src={src}
                        placeholder="blur"
                        loading="lazy"
                        blurDataURL={blur}
                        className="rounded-md cursor-pointer"
                        alt={alt}
                        width={width / 2}
                        height={height / 2}
                        ref={ref as React.MutableRefObject<HTMLImageElement>}
                        onClick={open}
                    />
                )}
            </Item>
        </Gallery>
    );
}
