import { Github, Twitter } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={"min-h-64 z-40 relative bg-neutral-300 dark:bg-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 p-4 items-center mt-36"}>
            {/* First row */}
            <div>
                <h1 className={"font-bold text-2xl"}>BlueDragon</h1>
                <p>BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many&nbsp;more!</p>
                <p>The server IP is <code>bluedragonmc.com</code>. <Link href="/join" className="underline font-medium">Join&nbsp;today!</Link></p>
            </div>
            <div className="lg:col-span-2 hidden md:flex justify-end">
                <Image src="/favicon_hq.png" height={128} width={128} alt="BlueDragon Logo"></Image>
            </div>
            {/* Second row */}
            <div>
                <Link href="https://github.com/BlueDragonMC" className="mr-5">
                    <Github className="inline"></Github>
                </Link>
                <Link href="https://twitter.com/BDMCNetwork">
                    <Twitter className="inline"></Twitter>
                </Link>
            </div>
        </footer>
    )
}