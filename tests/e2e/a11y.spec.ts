import { posts, projects } from "#site/content";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/projects",
  ...projects.map((p) => `/projects/${p.slug}`),
  "/about",
  "/journal",
  ...posts.map((p) => `/journal/${p.slug}`),
  "/resume",
  "/contact",
];

for (const route of ROUTES) {
  test(`${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeAttached();

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      // Bandcamp's player is third-party markup we can't fix.
      .exclude('iframe[src^="https://bandcamp.com/"]')
      .analyze();
    expect(violations).toEqual([]);
  });
}
