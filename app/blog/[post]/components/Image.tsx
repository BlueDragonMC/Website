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
    const slide = (
        <NextJsImage
            src={src}
            placeholder="blur"
            loading="eager"
            blurDataURL={blur}
            className="w-full cursor-pointer rounded-md object-contain"
            alt={alt}
            width={width}
            height={height}
        />
    );

    return (
        <Item content={slide} thumbnail={src} width={width} height={height}>
            {({ ref, open }) => (
                <NextJsImage
                    src={src}
                    placeholder="blur"
                    loading="lazy"
                    blurDataURL={blur}
                    className="cursor-pointer rounded-md"
                    alt={alt}
                    width={width > 1000 ? width / 2 : width}
                    height={width > 1000 ? height / 2 : height}
                    ref={ref as React.MutableRefObject<HTMLImageElement>}
                    onClick={open}
                />
            )}
        </Item>
    );
}
