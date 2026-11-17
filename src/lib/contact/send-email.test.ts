import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactEmail } from "./send-email";

const message = {
  name: "Ada",
  email: "ada@example.com",
  message: "Hello there, Tilo!",
};

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("CONTACT_TO_EMAIL", "inbox@example.com");
  vi.stubEnv("CONTACT_FROM_EMAIL", "Portfolio <contact@example.com>");
  vi.stubEnv("RESEND_API_URL", undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("sendContactEmail", () => {
  it("posts the message to Resend with the sender as reply-to", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await sendContactEmail(message);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers).toMatchObject({ Authorization: "Bearer re_test" });
    expect(JSON.parse(init.body as string)).toEqual({
      from: "Portfolio <contact@example.com>",
      to: "inbox@example.com",
      reply_to: "ada@example.com",
      subject: "Portfolio contact from Ada",
      text: "Hello there, Tilo!\n\n— Ada <ada@example.com>",
    });
  });

  it("throws when Resend rejects the request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("bad key", { status: 401 })),
    );
    await expect(sendContactEmail(message)).rejects.toThrow(
      "Resend responded with 401: bad key",
    );
  });

  it("throws when the configuration is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", undefined);
    await expect(sendContactEmail(message)).rejects.toThrow(
      "Missing RESEND_API_KEY",
    );
  });
});
