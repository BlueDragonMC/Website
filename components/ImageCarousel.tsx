"use client";

import Image, { StaticImageData } from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function ImageCarousel({
    images,
    altText,
    blurred,
    imageWidth = 512,
    delay = 5.0,
}: {
    images: StaticImageData[];
    altText: string[] | string;
    blurred: boolean;
    imageWidth: number;
    delay?: number;
}) {
    const [image, setImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setImage((image) => (image + 1) % images.length);
        }, delay * 1000);
        return () => {
            clearInterval(interval);
        };
    }, [delay, images.length]);

    const isVisible = (idx: number): boolean => {
        if (Math.abs(image - idx) <= 1) return true;

        if (image == 0) return idx == images.length - 1;
        if (image == images.length - 1) return idx == 0;

        return false;
    };

    return (
        <div className="relative h-full w-full">
            {images.map((img, i) => {
                if (isVisible(i)) {
                    return (
                        <Image
                            key={img.src}
                            className={`absolute top-0 left-0 h-full w-full select-none object-cover transition-opacity ${
                                blurred && "scale-110 blur-sm brightness-[.3]"
                            }`}
                            src={img}
                            alt={Array.isArray(altText) ? altText[i] : altText}
                            width={imageWidth}
                            quality={blurred ? 10 : 75}
                            height={0}
                            loading="lazy"
                            placeholder="blur"
                            style={{
                                opacity: image == i ? 1 : 0,
                                transitionDuration: "2.5s",
                            }}
                        />
                    );
                } else {
                    return <Fragment key={img.src} />;
                }
            })}
            <div
                className="absolute top-0 left-0 -z-40 h-full w-full bg-black bg-cover brightness-75"
                style={{ backgroundImage: `url(${images[0].blurDataURL})` }}
            />
        </div>
    );
}
