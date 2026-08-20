import { fetchPlayer } from "@/src/lib/playerUtils";

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const search = new URL(request.url).searchParams;
  const username = search.get("username");
  console.log(request.url, search, username);
  if (!username) {
    return new Response("Bad request", { status: 400 });
  }

  const info = await fetchPlayer(username);

  if (!info) {
    return new Response("Not found", { status: 404 });
  }

  for (const key of Object.keys(info.stats)) {
    if (key.startsWith("statistics.")) {
      const value = info.stats[key];
      info.stats[key.substring("statistics.".length)] = value;
      delete info.stats[key];
    }
  }

  return Response.json(info, { status: 200 });
}
