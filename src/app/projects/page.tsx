import type { Metadata } from "next";
import { FilterTabs } from "@/components/project/filter-tabs";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software, music and other projects by Tilo Hauk.",
};

export default function ProjectsPage() {
  return (
    <div className="px-6 pb-10 lg:px-16 lg:pt-8">
      <h1 className="sr-only">Projects</h1>
      <FilterTabs active="all" />
      <p className="mt-10 text-lg">Case studies are on their way.</p>
    </div>
  );
}
