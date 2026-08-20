import { generate } from "@/src/lib/og";
import { fetchPlayer } from "@/src/lib/playerUtils";

export const prerender = false;

export async function GET({ params }: { params: { username: string } }) {
  const info = await fetchPlayer(params.username);

  if (!info) return new Response(null, { status: 404 });

  const nonDashedUUID = info.uuid.replaceAll(/-/g, "");

  const avatar = await fetch(
    `https://minotar.net/helm/${nonDashedUUID}/192.png`
  ).catch(() => null);

  if (!avatar?.ok) return generate({ title: info.username });

  const player = "data:image/png;base64," + Buffer.from(await avatar.arrayBuffer()).toString("base64");

  return generate({
    title: info.username,
    player,
    ogPreview: `View ${info.username}'s BlueDragon profile and statistics online.`,
  });
}