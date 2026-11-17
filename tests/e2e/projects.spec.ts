import { projects } from "#site/content";
import { expect, test } from "@playwright/test";
import { CATEGORIES } from "@/lib/categories";
import { sortByDate } from "@/lib/dates";

// Expectations come from the generated content, so the tests keep working as content changes.
const titlesIn = (category?: string) =>
  sortByDate(projects.filter((p) => !category || p.category === category)).map(
    (p) => p.title,
  );

test.describe("project filter without JavaScript", () => {
  // Each category is its own static page, so filtering must work without JavaScript.
  test.use({ javaScriptEnabled: false });

  test("shows all projects newest first by default", async ({ page }) => {
    await page.goto("/projects");
    const filters = page.getByRole("navigation", { name: "Filter projects" });
    await expect(filters.getByRole("link", { name: "all" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(page.getByRole("heading", { level: 2 })).toHaveText(
      titlesIn(),
    );
  });

  for (const category of CATEGORIES) {
    test(`shows only ${category} projects on its page`, async ({ page }) => {
      await page.goto("/projects");
      const filters = page.getByRole("navigation", { name: "Filter projects" });

      await filters.getByRole("link", { name: category }).click();

      await expect(page).toHaveURL(`/projects/${category}`);
      await expect(
        filters.getByRole("link", { name: category }),
      ).toHaveAttribute("aria-current", "page");
      await expect(page.getByRole("heading", { level: 2 })).toHaveText(
        titlesIn(category),
      );
    });
  }

  test("opens a case study from the grid", async ({ page }) => {
    const [project] = projects;
    if (!project) throw new Error("Expected at least one project in content/");
    await page.goto("/projects");
    await page.getByRole("link", { name: project.title }).click();
    await expect(page).toHaveURL(
      `/projects/${project.category}/${project.slug}`,
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      project.title,
    );
  });
});

test("the landing page links to the newest project", async ({ page }) => {
  const [newest] = sortByDate(projects);
  if (!newest) throw new Error("Expected at least one project in content/");
  await page.goto("/");
  await page.getByRole("link", { name: "Latest project" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    newest.title,
  );
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

test("the filter stays in view while scrolling the grid", async ({ page }) => {
  await page.goto("/projects");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(
    page.getByRole("navigation", { name: "Filter projects" }),
  ).toBeInViewport();
});
