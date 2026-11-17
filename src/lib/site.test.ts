import { describe, expect, it } from "vitest";
import { siteUrl } from "./site";

describe("siteUrl", () => {
  it("prefers an explicit site URL and drops a trailing slash", () => {
    expect(
      siteUrl({
        NEXT_PUBLIC_SITE_URL: "https://tilohauk.dev/",
        VERCEL_PROJECT_PRODUCTION_URL: "x.vercel.app",
      }),
    ).toBe("https://tilohauk.dev");
  });

  it("falls back to the Vercel production domain", () => {
    expect(
      siteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app" }),
    ).toBe("https://portfolio.vercel.app");
  });

  it("uses localhost during local development", () => {
    expect(siteUrl({})).toBe("http://localhost:3000");
  });
});
