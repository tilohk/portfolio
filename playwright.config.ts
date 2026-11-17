import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
export const MOCK_RESEND_URL = "http://localhost:3199";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: [
    {
      command: "node tests/e2e/mock-resend.ts",
      url: `${MOCK_RESEND_URL}/emails`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `pnpm start --port ${PORT}`,
      port: PORT,
      reuseExistingServer: !process.env.CI,
      env: {
        RESEND_API_URL: MOCK_RESEND_URL,
        RESEND_API_KEY: "re_test",
        CONTACT_TO_EMAIL: "inbox@example.com",
        CONTACT_FROM_EMAIL: "Portfolio <contact@example.com>",
      },
    },
  ],
});
