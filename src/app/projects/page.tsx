import { projects } from "#site/content";
import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { ProjectGrid } from "@/components/project/project-grid";
import { sortByDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software and music projects by Tilo Hauk.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-10 px-6 pb-16 lg:px-16 lg:pt-8">
      <PageTitle>Projects</PageTitle>
      <ProjectGrid projects={sortByDate(projects)} />
    </div>
  );
}
