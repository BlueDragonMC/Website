import Image from "next/image";
import Link from "next/link";
import { Discord, GitHub, Twitter } from "./Icons";

export default function Footer() {
    return (
        <footer
            className={
                "min-h-64 relative z-40 mt-36 grid grid-cols-1 grid-rows-2 items-center bg-neutral-300 p-4 dark:bg-gray-700 md:grid-cols-2 lg:grid-cols-3"
            }
        >
            {/* First row */}
            <div>
                <h1 className={"text-2xl font-bold"}>BlueDragon</h1>
                <p>
                    BlueDragon is an original Minecraft server featuring
                    minigames like WackyMaze, PvPMaster, FastFall, and
                    many&nbsp;more!
                </p>
                <p>
                    The server IP is <code>bluedragonmc.com</code>.{" "}
                    <Link href="/join" className="font-medium underline">
                        Join&nbsp;today!
                    </Link>
                </p>
            </div>
            <div className="hidden justify-end md:flex lg:col-span-2">
                <Image
                    src="/favicon_hq.png"
                    height={128}
                    width={128}
                    alt="BlueDragon Logo"
                ></Image>
            </div>
            {/* Second row */}
            <div>
                <Link href="https://discord.gg/3gvSPdW" className="mr-5">
                    <Discord className="inline h-8 fill-black dark:fill-white" />
                </Link>
                <Link href="https://github.com/BlueDragonMC" className="mr-5">
                    <GitHub className="inline h-8 fill-black dark:fill-white" />
                </Link>
                <Link href="https://twitter.com/BDMCNetwork">
                    <Twitter className="inline h-8 fill-black dark:fill-white" />
                </Link>
            </div>
            <div className="md:text-right lg:col-span-2">
                <span>&copy; 2023 BlueDragonMC</span>
                <br />
                <Link href="/page/changelog" className="font-medium underline">
                    Changelog
                </Link>{" "}
                &middot;{" "}
                <Link href="/page/rules" className="font-medium underline">
                    Server Rules
                </Link>{" "}
                &middot;{" "}
                <Link href="/page/oss" className="font-medium underline">
                    Open&#8209;Source&nbsp;Software
                </Link>{" "}
                &middot;{" "}
                <Link href="/status" className="font-medium underline">
                    Server&nbsp;Status
                </Link>
            </div>
        </footer>
    );
}
