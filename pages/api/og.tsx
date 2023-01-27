import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

const boldFont = fetch(
    new URL("../../assets/Inter-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const mediumFont = fetch(
    new URL("../../assets/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const favicon = new URL(
    "../../public/favicon_hq.png",
    import.meta.url
).toString();

// Icons provided by Font Awesome
// https://fontawesome.com/

const userIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="#9ca3af"
        height={32}
    >
        <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
    </svg>
);

const calendarIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="#9ca3af"
        height={32}
    >
        <path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z" />
    </svg>
);

const clockIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="#9ca3af"
        height={32}
    >
        <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z" />
    </svg>
);

const bookmarkIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="#9ca3af"
        height={32}
    >
        <path d="M336 0h-288C21.49 0 0 21.49 0 48v431.9c0 24.7 26.79 40.08 48.12 27.64L192 423.6l143.9 83.93C357.2 519.1 384 504.6 384 479.9V48C384 21.49 362.5 0 336 0zM336 452L192 368l-144 84V54C48 50.63 50.63 48 53.1 48h276C333.4 48 336 50.63 336 54V452z" />
    </svg>
);

export const config = {
    runtime: "edge",
};

export default async function OpenGraphImage(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    let title = searchParams.get("title");
    let ogPreview = searchParams.get("ogPreview");
    const subtitle = searchParams.get("subtitle");
    const author = searchParams.get("author");
    const date = searchParams.get("date");
    const readTime = searchParams.get("readTime");
    const player = searchParams.get("player");

    let image = <img src={favicon} width={256} height={256} />;

    if (player) {
        image = (
            <img
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
            "BlueDragon is an original Minecraft server featuring minigames like WackyMaze, PvPMaster, FastFall, and many more!";
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
                        <span style={{ fontSize: 72, color: "white" }}>
                            {title}
                        </span>
                        <span style={{ fontSize: 48, color: "#d1d5db" }}>
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
                        {userIcon}
                        <span tw="ml-2">{author}</span>
                    </div>

                    <div style={{ display: date ? "flex" : "none" }}>
                        {calendarIcon}
                        <span tw="ml-2">{date}</span>
                    </div>

                    <div style={{ display: readTime ? "flex" : "none" }}>
                        {clockIcon}
                        <span tw="ml-2">{readTime}</span>
                    </div>

                    <div style={{ display: "flex" }}>
                        {bookmarkIcon}
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
                    name: "Inter-Bold",
                    data: await boldFont,
                    style: "normal",
                    weight: 700,
                },
                {
                    name: "Inter-Medium",
                    data: await mediumFont,
                    style: "normal",
                    weight: 500,
                },
            ],
        }
    );
}
