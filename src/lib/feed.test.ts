import { describe, expect, it } from "vitest";
import { buildFeed } from "./feed";

const post = {
  title: "Rules ask, hooks enforce",
  slug: "hooks",
  date: "2026-11-17T00:00:00.000Z",
  summary: 'Tests & <guards> for "AI" code',
};

describe("buildFeed", () => {
  const xml = buildFeed([post], "https://example.com", "Tilo Hauk");

  it("links each post with an absolute URL and a guid", () => {
    expect(xml).toContain("<link>https://example.com/journal/hooks</link>");
    expect(xml).toContain("<guid>https://example.com/journal/hooks</guid>");
  });

  it("uses RFC 822 dates", () => {
    expect(xml).toContain("<pubDate>Tue, 17 Nov 2026 00:00:00 GMT</pubDate>");
  });

  it("escapes XML special characters", () => {
    expect(xml).toContain(
      "<description>Tests &amp; &lt;guards&gt; for &quot;AI&quot; code</description>",
    );
  });

  it("produces an empty channel when there are no posts", () => {
    expect(buildFeed([], "https://example.com", "Tilo Hauk")).not.toContain(
      "<item>",
    );
  });
});
