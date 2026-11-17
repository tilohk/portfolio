"use server";

import * as z from "zod";
import { type ContactField, contactSchema } from "@/lib/contact/schema";
import { sendContactEmail } from "@/lib/contact/send-email";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string[]>>;
  /** Echoed back so the form keeps its values after a server round trip (also without JavaScript). */
  values?: Partial<Record<ContactField, string>>;
}

const field = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (field(formData, "website")) return { status: "success" };

  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    message: field(formData, "message"),
  };
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  try {
    await sendContactEmail(parsed.data);
    return { status: "success" };
  } catch (error) {
    console.error("Contact email failed", error);
    return {
      status: "error",
      message: "Sorry, your message couldn't be sent. Please try again later.",
      values,
    };
  }
}
