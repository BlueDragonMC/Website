import { satteri } from "@astrojs/markdown-satteri";

let renderer: Awaited<
  ReturnType<ReturnType<typeof satteri>["createRenderer"]>
> | null = null;

export async function markdownToHtml(content: string): Promise<string> {
  if (!renderer) {
    renderer = await satteri().createRenderer({});
  }
  return (await renderer.render(content)).code;
}
