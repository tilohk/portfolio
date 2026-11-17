import { describe, expect, it } from "vitest";
import { filterByCategory } from "./projects";

const projects = [
  { title: "a", category: "music" },
  { title: "b", category: "software" },
  { title: "c", category: "software" },
] as const;

describe("filterByCategory", () => {
  it("returns every project for all", () => {
    expect(filterByCategory(projects, "all")).toHaveLength(3);
  });

  it("returns only projects of the given category", () => {
    expect(filterByCategory(projects, "software").map((p) => p.title)).toEqual([
      "b",
      "c",
    ]);
    expect(filterByCategory(projects, "other")).toEqual([]);
  });
});
