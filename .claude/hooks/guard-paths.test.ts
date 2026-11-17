import { describe, expect, it } from "vitest";
import { checkPath } from "./guard-paths.ts";

const root = "/repo";

describe("checkPath", () => {
  it.each([
    ".env",
    ".env.local",
    "apps/web/.env.production",
    "pnpm-lock.yaml",
    "tests/e2e/home.spec.ts-snapshots/home.png",
  ])("blocks %s", (file) =>
    expect(checkPath(`${root}/${file}`, root)).not.toBeNull(),
  );

  it.each([
    "src/app/page.tsx",
    ".env.example",
    "docs/environment.md",
    "content/projects/a.mdx",
  ])("allows %s", (file) =>
    expect(checkPath(`${root}/${file}`, root)).toBeNull(),
  );
});
