import type { APIContext } from "astro";

export const prerender = false;

const UUID_REGEX = /^[0-9a-fA-F]{32}$/;
const UPSTREAM = "https://minotar.net/helm";

export async function GET({ params }: APIContext) {
  const uuid = params.uuid ?? "";

  if (!UUID_REGEX.test(uuid)) {
    return new Response("Invalid UUID", { status: 400 });
  }

  try {
    const response = await fetch(`${UPSTREAM}/${uuid}/16.png`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return new Response("Upstream error", {
        status: response.status === 404 ? 404 : 502,
      });
    }

    return new Response(await response.arrayBuffer(), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new Response("Upstream error", { status: 502 });
  }
}
