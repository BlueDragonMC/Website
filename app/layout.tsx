import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { inter } from "./font";
import { Metadata } from "next";
import { BASE_PATH } from "./vars";

export const metadata: Metadata = {
    title: {
        default: "BlueDragon | Minecraft Minigames",
        template: "%s | BlueDragon",
    },
    applicationName: "BlueDragon",
    description:
        "BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many more!",
    openGraph: {
        type: "website",
        title: {
            default: "BlueDragon | Minecraft Minigames",
            template: "%s | BlueDragon",
        },
        description:
            "BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many more!",
        images: [new URL("/api/og", BASE_PATH)],
    },
    themeColor: "#2792f7",
    colorScheme: "dark light",
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
            <head />
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
