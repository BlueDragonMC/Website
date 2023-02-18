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
                <div className="overflow-hidden rounded-t-md">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        blurDataURL={imageSrc.blurDataURL}
                        loading="lazy"
                        placeholder="blur"
                        className="inline-block h-32 w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                    />
                </div>
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
