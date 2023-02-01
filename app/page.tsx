"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import hero1 from "@/public/hero/1.png";
import hero2 from "@/public/hero/2.png";
import hero3 from "@/public/hero/3.png";
import hero5 from "@/public/hero/5.png";
import lobby3 from "@/public/games/lobby/lobby-3.png";
import wackymaze1 from "@/public/games/wackymaze/wackymaze-1.png";
import wackymaze6 from "@/public/games/wackymaze/wackymaze-6.png";

export default function Home() {
    const [image, setImage] = useState(0);
    const images = [hero1, hero2, hero3, hero5, lobby3, wackymaze1, wackymaze6];

    useEffect(() => {
        const interval = setInterval(() => {
            setImage((image) => (image + 1) % images.length);
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const isVisible = (idx: number): boolean => {
        if (Math.abs(image - idx) <= 1) return true;

        if (image == 0) return idx == images.length - 1;
        if (image == images.length - 1) return idx == 0;

        return false;
    };

    return (
        <main className="block h-screen justify-center md:flex lg:block">
            <div className="fixed grid h-screen grid-rows-3 md:grid-cols-1 lg:grid-cols-12 lg:grid-rows-4">
                <div className="row-start-2 text-center lg:col-span-3 lg:col-start-2 lg:text-left">
                    <h1 className="text-3xl font-bold text-white">
                        BlueDragon
                    </h1>
                    <p className="text-white">
                        A Minecraft server featuring minigames like WackyMaze,
                        PvPMaster, FastFall, and many&nbsp;more!
                    </p>
                    <div className="mt-1">
                        <Link href="/join">
                            <button className="mr-2 rounded-md bg-blue-600 px-3 py-2 font-medium text-white">
                                Join
                            </button>
                        </Link>
                        <Link href="/games">
                            <button className="rounded-md bg-slate-600 px-3 py-2 font-medium text-white">
                                View Games
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="fixed top-0 left-0 -z-20 h-screen w-screen">
                {images.map((img, i) => {
                    if (isVisible(i)) {
                        return (
                            <Image
                                key={img.src}
                                className="fixed top-0 left-0 h-screen w-screen scale-110 object-cover blur-sm brightness-50 transition-opacity"
                                src={img}
                                alt="Background image"
                                width={512}
                                quality={10}
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
                        return <div key={img.src} />;
                    }
                })}
                <div
                    className="fixed top-0 left-0 -z-40 h-screen w-screen bg-black bg-cover brightness-75"
                    style={{ backgroundImage: `url(${images[0].blurDataURL})` }}
                />
            </div>
        </main>
    );
}
