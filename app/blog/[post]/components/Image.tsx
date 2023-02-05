"use client";

import { default as NextJsImage } from "next/image";
import { Item } from "react-photoswipe-gallery";

export default function Image({
    src,
    alt,
    width,
    blur,
    height,
}: {
    src: string;
    width: number;
    height: number;
    blur: string;
    alt: string;
}) {
    return (
        <Item original={src} thumbnail={src} width={width} height={height}>
            {({ ref, open }) => (
                <NextJsImage
                    src={src}
                    placeholder="blur"
                    loading="lazy"
                    blurDataURL={blur}
                    className="cursor-pointer rounded-md"
                    alt={alt}
                    width={width / 2}
                    height={height / 2}
                    ref={ref as React.MutableRefObject<HTMLImageElement>}
                    onClick={open}
                />
            )}
        </Item>
    );
}
