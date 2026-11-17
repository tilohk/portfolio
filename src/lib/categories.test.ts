import { describe, expect, it } from "vitest";
import { isCategory } from "./categories";

describe("isCategory", () => {
  it.each(["software", "music", "other"])("accepts %s", (value) => {
    expect(isCategory(value)).toBe(true);
  });

  it.each(["all", "games", "Software", ""])("rejects %s", (value) => {
    expect(isCategory(value)).toBe(false);
  });
});
