"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [image, setImage] = useState(0);
  const images = [1, 2, 3, 4, 5].map((n) => `/hero/${n}.png`);

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(image => (image + 1) % images.length);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="h-screen block md:flex justify-center lg:block">
      <div className="fixed h-screen grid grid-rows-3 md:grid-cols-1 lg:grid-cols-12 lg:grid-rows-4">
        <div className="lg:col-start-2 lg:col-span-3 row-start-2 text-center lg:text-left">
          <h1 className="text-3xl text-white font-bold">BlueDragon</h1>
          <p className="text-white">A Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many&nbsp;more!</p>
          <div className="mt-1">
            <Link href="/join">
              <button className="font-medium bg-blue-600 text-white px-3 py-2 mr-2 rounded-md">
                Join
              </button>
            </Link>
            <Link href="/games">
              <button className="font-medium bg-slate-600 text-white px-3 py-2 rounded-md">
                View Games
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="-z-20 blur-sm w-screen h-screen fixed top-0 left-0">
        {images.map((img, i) => {
          return <Image
            key={img}
            className="fixed top-0 left-0 w-screen h-screen transition-opacity brightness-50 object-cover"
            src={img}
            alt="Background image"
            width={1080}
            height={0}
            style={{ opacity: image == i ? 1 : 0, transitionDuration: "2.5s" }}
          />
        })}
      </div>
    </main>
  )
}
