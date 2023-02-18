import NavItem, { NavItemProps } from "@/components/NavItem";
import {
    faBook,
    faGamepad,
    faHouse,
    faInfoCircle,
    faRankingStar,
    faShare,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const navItems: Array<NavItemProps> = [
        { text: "Home", href: "/", icon: faHouse },
        { text: "Games", href: "/games", icon: faGamepad },
        { text: "About", href: "/about", icon: faInfoCircle },
        { text: "Blog", href: "/blog", icon: faBook },
        { text: "Leaderboards", href: "/leaderboards", icon: faRankingStar },
        {
            text: "Join",
            href: "/join",
            color: "bg-blue-600 hover:bg-blue-700",
            activeColor: "bg-blue-500 hover:bg-blue-600",
            icon: faShare,
        },
    ];

    return (
        <header className="z-50 h-16">
            <nav
                className={`fixed top-0 z-50 flex h-16 w-full items-center justify-center bg-gray-900 md:justify-between`}
            >
                <div
                    className={`flex items-center justify-center md:justify-start`}
                >
                    <Link href="/">
                        <Image
                            src="/logo_wordmark.png"
                            className="mx-4 hidden md:block"
                            alt="BlueDragon Logo"
                            height={30}
                            width={155}
                            priority
                        />
                        <Image
                            src="/favicon_hq.png"
                            className="mx-4 md:hidden"
                            alt="BlueDragon Logo"
                            height={48}
                            width={48}
                            priority
                        />
                    </Link>
                </div>
                <div
                    className={`flex h-full flex-1 items-center justify-end space-x-4 px-4`}
                >
                    {navItems.map((item) => {
                        return <NavItem {...item} key={item.href}></NavItem>;
                    })}
                </div>
            </nav>
        </header>
    );
}
