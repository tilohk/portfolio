import { about } from "#site/content";
import type { Metadata } from "next";
import { MdxContent } from "@/components/mdx-content";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = {
  title: about.title,
  description: about.intro,
};

export default function AboutPage() {
  return (
    <div className="space-y-10 px-6 pb-16 lg:px-16 lg:pt-8">
      <PageTitle intro={about.intro}>{about.title}</PageTitle>
      <MdxContent code={about.body} />
    </div>
  );
}
