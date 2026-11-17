import { expect, type Page, test } from "@playwright/test";
import { MOCK_RESEND_URL } from "../../playwright.config";

interface SentEmail {
  to: string;
  reply_to: string;
  subject: string;
  text: string;
}

// Each test uses its own sender address, so parallel tests can find their own email.
const uniqueEmail = (testId: string) => `visitor-${testId}@example.com`;

async function sentEmailsFrom(address: string): Promise<SentEmail[]> {
  const response = await fetch(`${MOCK_RESEND_URL}/emails`);
  const emails = (await response.json()) as SentEmail[];
  return emails.filter((email) => email.reply_to === address);
}

async function fillForm(
  page: Page,
  { email, message }: { email: string; message: string },
) {
  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Message").fill(message);
}

test("sends a message and thanks the visitor", async ({ page }, testInfo) => {
  const email = uniqueEmail(testInfo.testId);
  await page.goto("/contact");
  await fillForm(page, { email, message: "I'd like to talk about a project." });
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByRole("status")).toHaveText(/Thank you/);
  await expect
    .poll(() => sentEmailsFrom(email))
    .toEqual([
      expect.objectContaining({
        to: "inbox@example.com",
        subject: "Portfolio contact from Ada Lovelace",
        text: expect.stringContaining("I'd like to talk about a project."),
      }),
    ]);
});

test("shows field errors and keeps the input", async ({ page }) => {
  await page.goto("/contact");
  await fillForm(page, { email: "not-an-email", message: "Too short" });
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByRole("main").getByRole("alert")).toHaveText(
    "Please check the highlighted fields.",
  );
  const emailField = page.getByLabel("Email");
  await expect(emailField).toHaveAttribute("aria-invalid", "true");
  await expect(emailField).toHaveAccessibleDescription(
    "Please enter a valid email address.",
  );
  await expect(page.getByLabel("Message")).toHaveAccessibleDescription(
    "Please write at least 10 characters.",
  );
  await expect(page.getByLabel("Name")).toHaveValue("Ada Lovelace");
});

test("explains when the email service fails", async ({ page }, testInfo) => {
  const email = uniqueEmail(testInfo.testId);
  await page.goto("/contact");
  await fillForm(page, { email, message: "This one will [fail] on purpose." });
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByRole("main").getByRole("alert")).toHaveText(
    /couldn't be sent/,
  );
  await expect(page.getByLabel("Message")).toHaveValue(
    "This one will [fail] on purpose.",
  );
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("still sends the message", async ({ page }, testInfo) => {
    const email = uniqueEmail(testInfo.testId);
    await page.goto("/contact");
    await fillForm(page, {
      email,
      message: "Sent from a browser without JavaScript.",
    });
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toHaveText(/Thank you/);
    await expect.poll(async () => (await sentEmailsFrom(email)).length).toBe(1);
  });
});
