import { posts, projects } from "#site/content";
import { expect, test } from "@playwright/test";

// Absolute URLs use the site origin, which is localhost:3000 outside Vercel.
const contentPaths = [
  ...projects.map((p) => `/projects/${p.category}/${p.slug}`),
  ...posts.map((p) => `/journal/${p.slug}`),
];

test("sitemap lists every page and content item", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const path of [
    "/about",
    "/projects",
    "/journal",
    "/resume",
    "/contact",
    ...contentPaths,
  ]) {
    expect(xml).toContain(`${path}</loc>`);
  }
});

test("robots.txt allows crawling and points to the sitemap", async ({
  request,
}) => {
  const text = await (await request.get("/robots.txt")).text();
  expect(text).toContain("Allow: /");
  expect(text).toMatch(/Sitemap: .*\/sitemap\.xml/);
});

test("RSS feed contains every journal post", async ({ request }) => {
  const response = await request.get("/feed.xml");
  expect(response.headers()["content-type"]).toContain("application/rss+xml");
  const xml = await response.text();
  for (const post of posts) {
    expect(xml).toContain(`/journal/${post.slug}</link>`);
  }
});

test("the default Open Graph image renders", async ({ request }) => {
  const response = await request.get("/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");
});

for (const path of ["/", ...contentPaths]) {
  test(`${path} has complete share metadata`, async ({ page }) => {
    await page.goto(path);
    for (const property of [
      "og:title",
      "og:description",
      "og:site_name",
      "og:image",
    ]) {
      await expect(
        page.locator(`meta[property="${property}"]`).first(),
      ).toHaveAttribute("content", /\S/);
    }
    await expect(
      page.locator('link[type="application/rss+xml"]'),
    ).toHaveAttribute("href", /\/feed\.xml$/);
  });
}

test("the landing page describes the person as structured data", async ({
  page,
}) => {
  await page.goto("/");
  const json = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(JSON.parse(json ?? "{}")).toMatchObject({
    "@type": "Person",
    name: "Tilo Hauk",
  });
});
