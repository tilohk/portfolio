import { expect, test } from "@playwright/test";

test("main navigation marks the current section", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Projects" })).not.toHaveAttribute(
    "aria-current",
  );

  await nav.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL("/projects");
  await expect(nav.getByRole("link", { name: "Projects" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("skip link moves focus to the main content", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Keyboard navigation is a desktop concern");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
