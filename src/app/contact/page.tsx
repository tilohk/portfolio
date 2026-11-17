import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tilo Hauk about work, collaborations or music.",
};

export default function ContactPage() {
  return (
    <div className="space-y-10 px-6 pb-16 lg:px-16 lg:pt-8">
      <PageTitle intro="Have a project, a role or a collaboration in mind? Send me a message.">
        Contact
      </PageTitle>
      <ContactForm />
    </div>
  );
}
