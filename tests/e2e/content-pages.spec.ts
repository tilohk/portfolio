import { posts, resume } from "#site/content";
import { expect, test } from "@playwright/test";
import { sortByDate } from "@/lib/dates";

test("journal lists posts newest first and opens a post", async ({ page }) => {
  const sorted = sortByDate(posts);
  const [newest] = sorted;
  if (!newest)
    throw new Error("Expected at least one post in content/journal/");

  await page.goto("/journal");
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(
    sorted.map((p) => p.title),
  );

  await page.getByRole("link", { name: newest.title }).click();
  await expect(page).toHaveURL(`/journal/${newest.slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    newest.title,
  );
});

test("album post has a named Bandcamp player and link per album", async ({
  page,
}) => {
  await page.goto("/journal/dub-albums-2026");
  await expect(page.locator('iframe[title^="Bandcamp player: "]')).toHaveCount(
    5,
  );
  await expect(
    page.getByRole("link", { name: "Priori – 9 on Bandcamp" }),
  ).toHaveAttribute(
    "href",
    "https://kynantrecords.bandcamp.com/album/priori-9",
  );
  await expect(page.getByRole("link", { name: / on Bandcamp$/ })).toHaveCount(
    5,
  );
});

test("resume shows every role and skill group", async ({ page }) => {
  await page.goto("/resume");
  const experience = page.getByRole("region", { name: "Experience" });
  await expect(experience.getByRole("heading", { level: 3 })).toHaveText(
    resume.experience.map((job) => `${job.role}, ${job.company}`),
  );
  for (const skill of resume.skills) {
    await expect(
      page.getByRole("term").filter({ hasText: skill.group }),
    ).toBeVisible();
  }
});

test("printing the resume hides the navigation", async ({ page }) => {
  await page.goto("/resume");
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
  await expect(
    page.getByRole("heading", { level: 1, name: "Resume" }),
  ).toBeVisible();
});
