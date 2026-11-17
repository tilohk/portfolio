import { posts } from "#site/content";
import { sortByDate } from "@/lib/dates";
import { buildFeed } from "@/lib/feed";
import { SITE_NAME, siteUrl } from "@/lib/site";

export function GET() {
  return new Response(buildFeed(sortByDate(posts), siteUrl(), SITE_NAME), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
