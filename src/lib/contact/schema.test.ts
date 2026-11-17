import { describe, expect, it } from "vitest";
import { contactSchema } from "./schema";

const valid = {
  name: "Ada",
  email: "ada@example.com",
  message: "Hello, I'd like to talk.",
};

describe("contactSchema", () => {
  it("accepts a valid message and trims whitespace", () => {
    expect(contactSchema.parse({ ...valid, name: "  Ada  " })).toEqual(valid);
  });

  it.each([
    ["name", { name: "   " }, "Please enter your name."],
    ["email", { email: "not-an-email" }, "Please enter a valid email address."],
    ["message", { message: "Hi" }, "Please write at least 10 characters."],
    [
      "message",
      { message: "x".repeat(5001) },
      "Please keep your message under 5000 characters.",
    ],
  ])("rejects an invalid %s", (field, override, error) => {
    const result = contactSchema.safeParse({ ...valid, ...override });
    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      expect.objectContaining({ path: [field], message: error }),
    ]);
  });
});
