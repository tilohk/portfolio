import { describe, expect, it } from "vitest";
import { filterByCategory, sortByDate } from "./projects";

const projects = [
  { title: "old", date: "2024-03-01T00:00:00.000Z", category: "music" },
  { title: "new", date: "2026-11-01T00:00:00.000Z", category: "software" },
  { title: "mid", date: "2025-06-15T00:00:00.000Z", category: "software" },
] as const;

describe("sortByDate", () => {
  it("puts the newest project first without mutating the input", () => {
    expect(sortByDate(projects).map((p) => p.title)).toEqual([
      "new",
      "mid",
      "old",
    ]);
    expect(projects[0].title).toBe("old");
  });
});

describe("filterByCategory", () => {
  it("returns every project for all", () => {
    expect(filterByCategory(projects, "all")).toHaveLength(3);
  });

  it("returns only projects of the given category", () => {
    expect(filterByCategory(projects, "software").map((p) => p.title)).toEqual([
      "new",
      "mid",
    ]);
    expect(filterByCategory(projects, "other")).toEqual([]);
  });
});
