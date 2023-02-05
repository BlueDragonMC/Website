import Link from "next/link";
import { Discord, GitHub, Twitter } from "./Icons";

export default function Footer() {
    return (
        <footer
            className={
                "min-h-64 relative z-40 mt-36 grid grid-cols-2 gap-4 bg-neutral-300 px-4 py-8 dark:bg-neutral-900 md:grid-cols-3 md:gap-8 lg:grid-cols-6"
            }
        >
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
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
            {/* Second row */}
            <div className="flex flex-col leading-7 lg:col-start-4">
                <p className="font-bold">Server</p>
                <Link href="/games" className="font-medium underline">
                    Games
                </Link>
                <Link href="/about" className="font-medium underline">
                    About
                </Link>
                <Link href="/leaderboards" className="font-medium underline">
                    Leaderboards
                </Link>
                <Link href="/player" className="font-medium underline">
                    Player Stats
                </Link>
            </div>
            <div className="flex flex-col leading-7">
                <p className="font-bold">Community</p>
                <Link href="/page/changelog" className="font-medium underline">
                    Changelog
                </Link>
                <Link href="/page/rules" className="font-medium underline">
                    Server Rules
                </Link>
                <Link href="/status" className="font-medium underline">
                    Server&nbsp;Status
                </Link>
                <Link href="/page/oss" className="font-medium underline">
                    Open&#8209;Source&nbsp;Software
                </Link>
            </div>
            <div className="col-span-1 flex flex-col sm:col-span-2 md:col-span-1">
                <p className="mb-2 font-bold">Follow Us</p>
                <div>
                    <Link
                        href="https://github.com/BlueDragonMC"
                        className="mr-5"
                    >
                        <GitHub className="inline h-8 fill-black transition-colors hover:fill-[#181717] dark:fill-white" />
                    </Link>
                    <Link href="https://discord.gg/3gvSPdW" className="mr-5">
                        <Discord className="inline h-8 fill-black transition-colors hover:fill-[#5865F2] dark:fill-white" />
                    </Link>
                    <Link href="https://twitter.com/BDMCNetwork">
                        <Twitter className="inline h-8 fill-black transition-colors hover:fill-[#1DA1F2] dark:fill-white" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
