import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Metadata, Viewport } from "next";
import { inter } from "./font";
import "./globals.css";
import { BASE_PATH } from "./vars";

export const viewport: Viewport = {
    themeColor: "#2792f7",
    colorScheme: "dark light",
};

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NODE_ENV === "production"
            ? "https://bluedragonmc.com/"
            : "http://localhost:3000"
    ),
    title: {
        default: "BlueDragon | Minecraft Minigames",
        template: "%s | BlueDragon",
    },
    applicationName: "BlueDragon",
    description:
        "BlueDragon is a Minecraft server that strives to produce high-quality, original content. Join for free to explore unique minigames like Paintbrawl, WackyMaze, and more!",
    openGraph: {
        siteName: "BlueDragon",
        type: "website",
        title: {
            default: "BlueDragon | Minecraft Minigames",
            template: "%s | BlueDragon",
        },
        description:
            "BlueDragon is a Minecraft server that strives to produce high-quality, original content. Join for free to explore unique minigames like Paintbrawl, WackyMaze, and more!",
    },
    icons: [
        {
            type: "image/png",
            url: new URL("/favicon-16x16.png", BASE_PATH),
            sizes: "16x16",
        },
        {
            type: "image/png",
            url: new URL("/favicon-32x32.png", BASE_PATH),
            sizes: "32x32",
        },
        {
            type: "image/png",
            url: new URL("/favicon-96x96.png", BASE_PATH),
            sizes: "96x96",
        },
        {
            type: "image/png",
            url: new URL("/favicon-128.png", BASE_PATH),
            sizes: "128x128",
        },
        {
            type: "image/png",
            url: new URL("/favicon-196x196.png", BASE_PATH),
            sizes: "196x196",
        },
    ],
    twitter: {
        card: "summary_large_image",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    href="/rss/blog/atom.xml"
                    type="application/atom+xml"
                    rel="alternate"
                    title="Atom Blog feed"
                />
                <link
                    href="/rss/blog/feed.xml"
                    type="application/rss+xml"
                    rel="alternate"
                    title="RSS Blog feed"
                />
                <link
                    href="/rss/blog/atom.xml"
                    type="application/json"
                    rel="alternate"
                    title="JSON Blog feed"
                />
                <link
                    href="/rss/changelog/atom.xml"
                    type="application/atom+xml"
                    rel="alternate"
                    title="Atom Changelog feed"
                />
                <link
                    href="/rss/changelog/feed.xml"
                    type="application/rss+xml"
                    rel="alternate"
                    title="RSS Changelog feed"
                />
                <link
                    href="/rss/changelog/atom.xml"
                    type="application/json"
                    rel="alternate"
                    title="JSON Changelog feed"
                />
            </head>
            <body className={`min-h-screen ${inter.className}`}>
                <Navbar />
                <div className={"min-h-screen px-2 pt-4 md:px-10"}>
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
