import type { APIContext } from "astro";

export const prerender = false;

export function GET({ params, redirect }: APIContext) {
  return redirect(`https://github.com/BlueDragonMC/${params.repo}`, 307);
}