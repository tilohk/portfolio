interface FeedPost {
  title: string;
  slug: string;
  date: string;
  summary: string;
}

const escapeXml = (text: string) =>
  text.replace(
    /[<>&'"]/g,
    (char) =>
      `&${{ "<": "lt", ">": "gt", "&": "amp", "'": "apos", '"': "quot" }[char]};`,
  );

/** Builds an RSS 2.0 feed for journal posts, newest first as given. */
export function buildFeed(
  posts: readonly FeedPost[],
  origin: string,
  title: string,
): string {
  const items = posts
    .map((post) => {
      const url = `${origin}/journal/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${origin}/journal</link>
    <description>Journal of ${escapeXml(title)}</description>
${items}
  </channel>
</rss>
`;
}
