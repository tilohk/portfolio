import { projects } from "#site/content";
import type { Metadata } from "next";
import { FilterTabs } from "@/components/project/filter-tabs";
import { ProjectGrid } from "@/components/project/project-grid";
import { sortByDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software, music and other projects by Tilo Hauk.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-10 px-6 pb-16 lg:px-16 lg:pt-8">
      <h1 className="sr-only">Projects</h1>
      <FilterTabs active="all" />
      <ProjectGrid projects={sortByDate(projects)} />
    </div>
  );
}
