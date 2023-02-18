import Image, { StaticImageData } from "next/image";
import { PropsWithChildren } from "react";

export default function Card({
    imageSrc,
    imageAlt,
    children,
}: PropsWithChildren<{
    imageSrc?: StaticImageData;
    imageAlt?: string;
}>) {
    return (
        <div className="group rounded-lg bg-gray-200 shadow-lg transition-all hover:bg-gray-300 hover:shadow-2xl dark:bg-neutral-900 dark:hover:bg-neutral-800">
            {imageSrc && imageAlt && (
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    blurDataURL={imageSrc.blurDataURL}
                    loading="lazy"
                    placeholder="blur"
                    className="inline-block h-64 w-full rounded-t-md object-cover"
                />
            )}
            <div
                className={
                    "p-3 " +
                    (imageSrc === undefined
                        ? "flex h-full flex-col justify-center"
                        : "")
                }
            >
                {children}
            </div>
        </div>
    );
}
