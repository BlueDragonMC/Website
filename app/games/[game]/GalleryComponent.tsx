"use client";

import Gallery from "@/components/client/Gallery";
import Item from "@/components/client/Item";
import Image from "next/image";
import { Game } from "../games";

export default function GalleryComponent({ selected }: { selected: Game }) {
    return (
        <Gallery>
            {selected.images?.map((img) => {
                return (
                    <Item
                        key={img.src}
                        original={img.src}
                        thumbnail={img.src}
                        width={img.width}
                        height={img.height}
                    >
                        {({ ref, open }) => (
                            <Image
                                src={img}
                                placeholder="blur"
                                loading="lazy"
                                className="mr-4 mb-4 inline cursor-pointer rounded-md"
                                alt="Gameplay screenshot"
                                width={img.width / 4}
                                height={img.height / 4}
                                ref={
                                    ref as React.MutableRefObject<HTMLImageElement>
                                }
                                onClick={open}
                            />
                        )}
                    </Item>
                );
            })}
        </Gallery>
    );
}
