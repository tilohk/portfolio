import { describe, expect, it } from "vitest";
import { readingMinutes } from "./reading-time";

describe("readingMinutes", () => {
  it("rounds up to whole minutes at 100 words per minute", () => {
    expect(readingMinutes(100)).toBe(1);
    expect(readingMinutes(330)).toBe(4);
    expect(readingMinutes(1000)).toBe(10);
  });

  it("never shows less than one minute", () => {
    expect(readingMinutes(0)).toBe(1);
  });
});
