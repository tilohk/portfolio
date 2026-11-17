import { expect, test } from "@playwright/test";

test.describe("project filter without JavaScript", () => {
  // Each category is its own static page, so filtering must work without JavaScript.
  test.use({ javaScriptEnabled: false });

  test("shows all projects by default", async ({ page }) => {
    await page.goto("/projects");
    const filters = page.getByRole("navigation", { name: "Filter projects" });
    await expect(filters.getByRole("link", { name: "all" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("switches category through a link", async ({ page }) => {
    await page.goto("/projects");
    const filters = page.getByRole("navigation", { name: "Filter projects" });

    await filters.getByRole("link", { name: "music" }).click();

    await expect(page).toHaveURL("/projects/music");
    await expect(filters.getByRole("link", { name: "music" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      filters.getByRole("link", { name: "all" }),
    ).not.toHaveAttribute("aria-current");
  });
});

// Unknown categories render on demand and stream, so the first response can be a 200.
// What matters is that visitors see the not-found page and that it is marked noindex.
test("shows the not-found page for unknown categories", async ({ page }) => {
  await page.goto("/projects/unknown");
  await expect(page.getByText("This page could not be found.")).toBeVisible();
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
    "content",
    /noindex/,
  );
});
