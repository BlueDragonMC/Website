import {
  parseAddress,
  type ParsedAddress,
  status,
} from "minecraft-server-util";

export async function GET() {
  const { host, port } = parseAddress(
    process.env.SERVER_IP ?? "bluedragonmc.com",
    25565,
  ) as ParsedAddress;
  const s = await status(host, port);
  // Reply with a limited version of the given status
  return Response.json(
    {
      version: { name: s.version.name, protocol: s.version.protocol },
      players: { online: s.players.online, max: s.players.max },
      motd: { raw: s.motd.raw, clean: s.motd.clean },
      ping: s.roundTripLatency,
    },
    { status: 200 },
  );
}
