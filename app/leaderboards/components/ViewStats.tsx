"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewStats() {
    const [player, setPlayer] = useState("");
    const router = useRouter();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                router.push(`/player/${player}`);
            }}
            className="inline-flex"
        >
            <input
                type="text"
                placeholder="Username"
                className="h-10 w-full rounded-l-lg border border-gray-100 bg-gray-100 px-2 py-2 text-gray-700 outline-none"
                onInput={(e) => setPlayer(e.currentTarget.value)}
            />
            <span className="flex items-center rounded-r-lg bg-gray-100 font-bold text-gray-100">
                <Link role="button" href={`/player/${player}`}>
                    <input
                        type="submit"
                        role="button"
                        className="h-10 w-max rounded-r-lg bg-blue-600 py-2 px-4 text-lg font-medium text-white hover:bg-blue-700"
                        value="View Stats"
                    ></input>
                </Link>
            </span>
        </form>
    );
}
