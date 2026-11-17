import { describe, expect, it } from "vitest";
import { formatDate, formatMonthRange, sortByDate } from "./dates";

describe("sortByDate", () => {
  it("puts the newest item first without mutating the input", () => {
    const items = [
      { id: "old", date: "2024-03-01T00:00:00.000Z" },
      { id: "new", date: "2026-11-01T00:00:00.000Z" },
      { id: "mid", date: "2025-06-15T00:00:00.000Z" },
    ];
    expect(sortByDate(items).map((i) => i.id)).toEqual(["new", "mid", "old"]);
    expect(items[0]?.id).toBe("old");
  });
});

describe("formatDate", () => {
  it("formats an ISO date as a long UTC date", () => {
    expect(formatDate("2026-11-17T00:00:00.000Z")).toBe("17 November 2026");
  });
});

describe("formatMonthRange", () => {
  it("formats a closed range", () => {
    expect(formatMonthRange("2020-06", "2022-12")).toBe("Jun 2020 – Dec 2022");
  });

  it("shows Present for a current role", () => {
    expect(formatMonthRange("2023-01")).toBe("Jan 2023 – Present");
  });
});
