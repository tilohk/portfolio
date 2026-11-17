import { expect, type Page, test } from "@playwright/test";

// Below the lg breakpoint the main navigation sits behind a native <details> "Menu" disclosure.
// Screen readers announce <summary> as an expandable button, but Playwright (following HTML-AAM)
// gives it no role, so it is located by element and text instead of getByRole("button").
const menuButton = (page: Page) => page.locator("summary", { hasText: "Menu" });

async function openMenuIfMobile(page: Page, isMobile: boolean) {
  if (isMobile) await menuButton(page).click();
}

test("main navigation marks the current section", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await openMenuIfMobile(page, isMobile);
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Projects" })).not.toHaveAttribute(
    "aria-current",
  );

  await nav.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL("/projects");
  await openMenuIfMobile(page, isMobile);
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

test.describe("mobile menu", () => {
  test.skip(
    ({ isMobile }) => !isMobile,
    "The menu only exists below the lg breakpoint",
  );

  test("opens, navigates and closes again", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav).toBeHidden();

    await menuButton(page).click();
    await nav.getByRole("link", { name: "Journal" }).click();

    await expect(page).toHaveURL("/journal");
    await expect(nav).toBeHidden();
  });

  test.describe("without JavaScript", () => {
    test.use({ javaScriptEnabled: false });

    test("still opens and navigates", async ({ page }) => {
      await page.goto("/");
      await menuButton(page).click();
      await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: "Resume" })
        .click();
      await expect(page).toHaveURL("/resume");
    });
  });
});
