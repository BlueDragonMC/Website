import { NextRequest, NextResponse } from "next/server";
import { fetchPlayer } from "./playerUtils";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export type PlayerResponse = {
    uuid: string;
    username: string;
    stats: { [key: string]: number };
    firstLogin: Date;
    lastLogin: Date;
};

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get("username");

    if (!username) {
        return new Response("Bad request", { status: 400 });
    }

    const info = await fetchPlayer(username);

    if (!info) {
        return new Response("Not found", { status: 404 });
    }

    return NextResponse.json(info, { status: 200 });
}
