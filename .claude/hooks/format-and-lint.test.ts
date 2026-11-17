import { describe, expect, it } from "vitest";
import { toolsFor } from "./format-and-lint.ts";

describe("toolsFor", () => {
  it("formats and lints TypeScript", () => {
    expect(toolsFor("src/app/page.tsx")).toEqual({
      prettier: true,
      eslint: true,
    });
  });

  it("only formats Markdown and CSS", () => {
    expect(toolsFor("content/a.mdx")).toEqual({
      prettier: true,
      eslint: false,
    });
    expect(toolsFor("src/app/globals.css")).toEqual({
      prettier: true,
      eslint: false,
    });
  });

  it("skips binary files", () => {
    expect(toolsFor("public/hero.jpg")).toEqual({
      prettier: false,
      eslint: false,
    });
  });
});
