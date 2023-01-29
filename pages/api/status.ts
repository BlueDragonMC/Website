import { JavaStatusResponse, status } from "minecraft-server-util";
import type { NextApiRequest, NextApiResponse } from "next";

export type StatusResponse = {
    version: {
        name: string;
        protocol: number;
    };
    players: {
        online: number;
        max: number;
    };
    motd: {
        raw: string;
        clean: string;
        html: string;
    };
    ping: number;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<StatusResponse>
) {
    const s = await status("bluedragonmc.com");
    // Reply with a limited version of the given status
    return res.send({
        version: { name: s.version.name, protocol: s.version.protocol },
        players: { online: s.players.online, max: s.players.max },
        motd: { raw: s.motd.raw, clean: s.motd.clean, html: s.motd.html },
        ping: s.roundTripLatency,
    });
}
