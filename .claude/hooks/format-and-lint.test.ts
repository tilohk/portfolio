import { describe, expect, it } from "vitest";
import { toolsFor } from "./format-and-lint.ts";

const root = "/repo";

describe("toolsFor", () => {
  it("formats and lints TypeScript", () => {
    expect(toolsFor(`${root}/src/app/page.tsx`, root)).toEqual({
      prettier: true,
      eslint: true,
      content: false,
    });
  });

  it("formats and validates content files", () => {
    expect(toolsFor(`${root}/content/projects/a/index.mdx`, root)).toEqual({
      prettier: true,
      eslint: false,
      content: true,
    });
  });

  it("validates content images without formatting them", () => {
    expect(toolsFor(`${root}/content/projects/a/cover.jpg`, root)).toEqual({
      prettier: false,
      eslint: false,
      content: true,
    });
  });

  it("only formats CSS", () => {
    expect(toolsFor(`${root}/src/app/globals.css`, root)).toEqual({
      prettier: true,
      eslint: false,
      content: false,
    });
  });
});
