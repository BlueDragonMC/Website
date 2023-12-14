import {
    faDiscord,
    faGithub,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import FontAwesomeIcon from "./FontAwesomeIcon";

export default function Footer() {
    return (
        <footer className="min-h-64 relative z-40 mt-36 grid grid-cols-2 gap-2 bg-neutral-300 px-4 py-8 dark:bg-neutral-900 print:hidden md:grid-cols-3 md:gap-8 lg:grid-cols-6">
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
                <p className={"text-2xl font-bold"}>
                    <Link href="/">BlueDragon</Link>
                </p>
                <p>
                    BlueDragon is a Minecraft server that strives to produce
                    high-quality, original content. Join for free to explore
                    unique minigames like Paintbrawl, WackyMaze, and more!
                </p>
                <p>
                    The server IP is{" "}
                    <code className="font-bold">bluedragonmc.com</code>.{" "}
                    <Link href="/join" className="font-medium underline">
                        Join&nbsp;today!
                    </Link>
                </p>
            </div>
            {/* Second row */}
            <div className="flex flex-col leading-10 lg:col-start-4">
                <p className="font-bold">Server</p>
                <Link href="/games" className="font-medium underline">
                    Games
                </Link>
                <Link href="/leaderboards" className="font-medium underline">
                    Leaderboards
                </Link>
                <Link href="/player" className="font-medium underline">
                    Player Stats
                </Link>
                <Link href="/page/api" className="font-medium underline">
                    API
                </Link>
            </div>
            <div className="flex flex-col leading-10">
                <p className="font-bold">Community</p>
                <Link href="/blog" className="font-medium underline">
                    Blog
                </Link>
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
                    Open&#8209;Source
                </Link>
            </div>
            <div className="col-span-1 flex flex-col leading-10 sm:col-span-2 md:col-span-1">
                <p className="font-bold">Follow Us</p>
                <a href="/github">
                    <FontAwesomeIcon
                        icon={faGithub}
                        className="inline h-6 w-6 fill-black align-middle dark:fill-white"
                    />
                    <span className="ml-2 underline">GitHub</span>
                </a>
                <a href="/discord">
                    <FontAwesomeIcon
                        icon={faDiscord}
                        className="inline h-6 w-6 fill-black align-middle dark:fill-white"
                    />
                    <span className="ml-2 underline">Discord</span>
                </a>
                <a href="/twitter">
                    <FontAwesomeIcon
                        icon={faTwitter}
                        className="inline h-6 w-6 fill-black align-middle dark:fill-white"
                    />
                    <span className="ml-2 underline">Twitter</span>
                </a>
            </div>
        </footer>
    );
}
