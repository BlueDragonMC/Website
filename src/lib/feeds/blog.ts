import { getCollection } from "astro:content";
import { Feed } from "feed";
import showdown from "showdown";

export const generateRssFeed = async (siteURL: string) => {
  const posts = (await getCollection("blog")).toSorted(
    (a, b) => b.data.created.getTime() - a.data.created.getTime()
  );

  const date = new Date();

  const feed = new Feed({
    title: "BlueDragon Blog",
    description: "",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/logo_wordmark.png`,
    favicon: `${siteURL}/favicon_hq.png`,
    copyright: `All rights reserved ${date.getFullYear()}, BlueDragonMC`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/blog/feed.xml`,
      json: `${siteURL}/rss/blog/feed.json`,
      atom: `${siteURL}/rss/blog/atom.xml`,
    },
  });

  const converter = new showdown.Converter();
  converter.setFlavor("github");

  posts.forEach((post) => {
    const { data, body } = post;
    const url = `${siteURL}/blog/${post.id}`;

    feed.addItem({
      title: data.title,
      id: url,
      link: url,
      description: data.description,
      content: converter.makeHtml(body ?? ""),
      author: [
        {
          name: data.author,
          link: "https://bluedragonmc.com/blog",
        },
      ],
      date: new Date(data.created),
    });
  });

  return feed;
}