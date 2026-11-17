import * as z from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Please keep your name under 100 characters."),
  email: z.email("Please enter a valid email address.").trim(),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(5000, "Please keep your message under 5000 characters."),
});

export type ContactMessage = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactMessage;
