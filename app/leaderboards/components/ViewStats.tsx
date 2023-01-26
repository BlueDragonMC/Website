"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewStats() {
    const [player, setPlayer] = useState("");
    const router = useRouter();

    return (
        <div className="inline-flex">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/player/${player}`);
                }}
            >
                <input
                    type="text"
                    placeholder="Username"
                    className="h-10 w-full bg-gray-100 text-gray-700 px-2 py-2 border border-gray-100 outline-none rounded-l-lg"
                    onInput={(e) => setPlayer(e.currentTarget.value)}
                ></input>
            </form>
            <span className="flex items-center bg-gray-100 font-bold text-gray-100 rounded-r-lg">
                <Link role="button" href={`/player/${player}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-lg text-white font-medium py-2 px-4 h-10 rounded-r-lg w-max">
                        View Stats
                    </button>
                </Link>
            </span>
        </div>
    );
}
