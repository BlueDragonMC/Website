"use client";

import { BASE_PATH } from "@/app/vars";
import { usePathname } from "next/navigation";

export default function OpenGraphURL() {
    const pathName = usePathname();

    const strippedPath = pathName?.includes("?")
        ? pathName?.substring(0, pathName?.indexOf("?"))
        : pathName;

    return <meta name="og:url" content={BASE_PATH + strippedPath} />;
}
