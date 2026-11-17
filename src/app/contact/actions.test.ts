import { beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactEmail } from "@/lib/contact/send-email";
import { submitContact } from "./actions";

// The email service is the only external dependency, so it's the only thing mocked.
vi.mock("@/lib/contact/send-email", () => ({ sendContactEmail: vi.fn() }));

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};

const valid = {
  name: "Ada",
  email: "ada@example.com",
  message: "Hello there, Tilo!",
};

beforeEach(() => {
  vi.mocked(sendContactEmail).mockReset();
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

describe("submitContact", () => {
  it("sends a valid message", async () => {
    const state = await submitContact({ status: "idle" }, form(valid));
    expect(state).toEqual({ status: "success" });
    expect(sendContactEmail).toHaveBeenCalledWith(valid);
  });

  it("returns field errors and keeps the values for invalid input", async () => {
    const input = { ...valid, email: "nope" };
    const state = await submitContact({ status: "idle" }, form(input));
    expect(state.status).toBe("error");
    expect(state.fieldErrors).toEqual({
      email: ["Please enter a valid email address."],
    });
    expect(state.values).toEqual(input);
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("silently drops submissions that fill the honeypot", async () => {
    const state = await submitContact(
      { status: "idle" },
      form({ ...valid, website: "spam.example" }),
    );
    expect(state).toEqual({ status: "success" });
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("reports a send failure without losing the message", async () => {
    vi.mocked(sendContactEmail).mockRejectedValue(new Error("Resend down"));
    const state = await submitContact({ status: "idle" }, form(valid));
    expect(state).toMatchObject({ status: "error", values: valid });
    expect(state.message).toMatch(/couldn't be sent/);
  });
});
