import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import {
    faBookmark,
    faCalendar,
    faClock,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import { join } from "path";
import { cwd } from "process";

// Bold - font weight: 700
const boldFont = readFile(join(cwd(), "assets/Inter-ExtraBold.ttf"));

// Medium - font weight: 500
const mediumFont = readFile(join(cwd(), "assets/Inter-Medium.ttf"));

// Regular - font weight: 400
const regularFont = readFile(join(cwd(), "assets/Inter-Regular.ttf"));

const favicon = readFile(join(cwd(), "/public/favicon_hq.png"));

type GenerateOptions = {
    title: string;
    ogPreview?: string;
    subtitle?: string;
    author?: string;
    date?: string;
    readTime?: string;
    player?: string;
};

export async function generate({
    title,
    ogPreview,
    subtitle,
    author,
    date,
    readTime,
    player,
}: GenerateOptions) {
    const b64 = (await favicon).toString("base64");
    let image = (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img src={"data:image/png;base64," + b64} width={256} height={256} />
    );

    if (player) {
        image = (
            <img // eslint-disable-line @next/next/no-img-element, jsx-a11y/alt-text
                src={`https://minotar.net/helm/${player}/192.png`}
                width={180}
                height={180}
                style={{ margin: "36px" }}
            />
        );
    }

    if (!title && !ogPreview) {
        title = "BlueDragon";
        ogPreview =
            "BlueDragon is a Minecraft server that strives to produce high-quality, original content. Join for free to explore unique minigames like Paintbrawl, WackyMaze, and more!";
    }

    return new ImageResponse(
        (
            <div style={{ display: "flex", height: "100%", width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        justifyItems: "center",
                        height: "100%",
                        width: "100%",
                        padding: "32px",
                        gap: "32px",
                    }}
                    tw="bg-gray-900"
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "80%",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                borderRadius: 9999,
                                padding: "10px",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            {image}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "80%",
                            width: "825px",
                            justifyContent: "center",
                        }}
                    >
                        <span
                            style={{
                                fontSize: 72,
                                color: "white",
                                fontWeight: 700,
                            }}
                        >
                            {title}
                        </span>
                        <span
                            style={{
                                fontSize: 42,
                                color: "#d1d5db",
                                fontWeight: 500,
                                marginBottom: subtitle ? "36px" : "",
                            }}
                        >
                            {subtitle}
                        </span>
                        <span style={{ fontSize: 36, color: "#9ca3af" }}>
                            {ogPreview}
                        </span>
                    </div>
                </div>
                <div
                    style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "space-around",
                        width: "90%",
                        left: 60,
                        bottom: 64,
                        fontSize: 32,
                        fontWeight: 500,
                    }}
                    tw="text-gray-400"
                >
                    <div style={{ display: author ? "flex" : "none" }}>
                        <FontAwesomeIcon
                            icon={faUser}
                            fill="#9ca3af"
                            height={32}
                        />
                        <span tw="ml-2">{author}</span>
                    </div>

                    <div style={{ display: date ? "flex" : "none" }}>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            fill="#9ca3af"
                            height={32}
                        />
                        <span tw="ml-2">{date}</span>
                    </div>

                    <div style={{ display: readTime ? "flex" : "none" }}>
                        <FontAwesomeIcon
                            icon={faClock}
                            fill="#9ca3af"
                            height={32}
                        />
                        <span tw="ml-2">{readTime}</span>
                    </div>

                    <div style={{ display: "flex" }}>
                        <FontAwesomeIcon
                            icon={faBookmark}
                            fill="#9ca3af"
                            height={32}
                        />
                        <span tw="ml-2">bluedragonmc.com</span>
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: 32,
                        backgroundImage:
                            "linear-gradient(90deg, #38bdf8, #1d4ed8)",
                    }}
                />
            </div>
        ),
        {
            debug: false,
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "Inter",
                    data: await boldFont,
                    style: "normal",
                    weight: 700,
                },
                {
                    name: "Inter",
                    data: await mediumFont,
                    style: "normal",
                    weight: 500,
                },
                {
                    name: "Inter",
                    data: await regularFont,
                    style: "normal",
                    weight: 400,
                },
            ],
        }
    );
}
