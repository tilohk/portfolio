import { describe, expect, it } from "vitest";
import { changedSourceFiles } from "./quality-gate.ts";

describe("changedSourceFiles", () => {
  it("returns modified, added and renamed TypeScript files", () => {
    const porcelain = [
      " M src/app/page.tsx",
      "?? src/lib/content.ts",
      "R  src/a.ts -> src/b.ts",
      "",
    ].join("\n");
    expect(changedSourceFiles(porcelain)).toEqual([
      "src/app/page.tsx",
      "src/lib/content.ts",
      "src/b.ts",
    ]);
  });

  it("ignores deleted and non-TypeScript files", () => {
    const porcelain = [
      " D src/old.ts",
      "D  src/gone.tsx",
      " M README.md",
      "?? public/hero.jpg",
    ].join("\n");
    expect(changedSourceFiles(porcelain)).toEqual([]);
  });
});
