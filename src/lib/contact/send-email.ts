import type { ContactMessage } from "./schema";

/** Reads the email settings from the environment, failing loudly if any are missing. */
function emailConfig() {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    throw new Error(
      "Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL",
    );
  }
  return {
    apiKey: RESEND_API_KEY,
    to: CONTACT_TO_EMAIL,
    from: CONTACT_FROM_EMAIL,
    // Overridable so tests can point at a local mock server.
    apiUrl: process.env.RESEND_API_URL ?? "https://api.resend.com",
  };
}

/** Sends a contact message via the Resend REST API. Throws if the email can't be sent. */
export async function sendContactEmail({
  name,
  email,
  message,
}: ContactMessage): Promise<void> {
  const config = emailConfig();
  const response = await fetch(`${config.apiUrl}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Resend responded with ${response.status}: ${await response.text()}`,
    );
  }
}
