import { projects } from "#site/content";
import { expect, test } from "@playwright/test";
import { sortByDate } from "@/lib/dates";

// Expectations come from the generated content, so the tests keep working as content changes.
test("lists all projects newest first, each with its tags", async ({
  page,
}) => {
  await page.goto("/projects");
  const sorted = sortByDate(projects);
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(
    sorted.map((p) => p.title),
  );
  for (const project of sorted) {
    await expect(
      page
        .getByRole("list", { name: `${project.title} tags` })
        .getByRole("listitem"),
    ).toHaveText(project.tags);
  }
});

test("opens a case study from the grid, showing its tags", async ({ page }) => {
  const [project] = projects;
  if (!project) throw new Error("Expected at least one project in content/");
  await page.goto("/projects");
  await page.getByRole("link", { name: project.title }).click();
  await expect(page).toHaveURL(`/projects/${project.slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    project.title,
  );
  await expect(
    page.getByRole("list", { name: "Tags" }).getByRole("listitem"),
  ).toHaveText(project.tags);
});

test.describe("old category URLs redirect", () => {
  const [project] = projects;
  if (!project) throw new Error("Expected at least one project in content/");

  for (const [from, to] of [
    [`/projects/software/${project.slug}`, `/projects/${project.slug}`],
    ["/projects/music", "/projects"],
  ] as const) {
    test(`from ${from}`, async ({ page }) => {
      await page.goto(from);
      await expect(page).toHaveURL(to);
    });
  }
});

test.describe("the landing page links to the newest project", () => {
  const [newest] = sortByDate(projects);
  if (!newest) throw new Error("Expected at least one project in content/");

  // The text link and the cover area, which is named by its caption.
  for (const name of ["Latest project", newest.title]) {
    test(`through "${name}"`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("link", { name, exact: true }).click();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        newest.title,
      );
    });
  }
});

test.describe("case study images open in a zoomable dialog", () => {
  const project = projects.find((p) => p.slug === "process-intervals");
  if (!project) throw new Error("Expected the process-intervals case study");

  // The cover is a next/image child, the diagram a Markdown image inside a <p>.
  for (const [image, name] of [
    ["the cover", project.coverAlt],
    ["a Markdown image", /^Diagram of one span/],
  ] as const) {
    test(`from ${image}`, async ({ page }) => {
      await page.goto(`/projects/${project.slug}`);

      await page.getByRole("link", { name }).click();
      const dialog = page.getByRole("dialog", { name });
      await expect(dialog).toBeVisible();

      await dialog.getByRole("button", { name: "Zoom in" }).click();
      await expect(
        dialog.getByRole("button", { name: "Zoom out" }),
      ).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    });
  }
});

// Unknown projects render on demand and stream, so the first response can be a 200.
// What matters is that visitors see the not-found page and that it is marked noindex.
test("shows the not-found page for unknown projects", async ({ page }) => {
  await page.goto("/projects/unknown");
  await expect(page.getByText("This page could not be found.")).toBeVisible();
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
    "content",
    /noindex/,
  );
});
