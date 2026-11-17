import { projects } from "#site/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilterTabs } from "@/components/project/filter-tabs";
import { ProjectGrid } from "@/components/project/project-grid";
import { CATEGORIES, isCategory } from "@/lib/categories";
import { sortByDate } from "@/lib/dates";
import { filterByCategory } from "@/lib/projects";

// Every path is prerendered from generateStaticParams, so reading params up front is cheap and keeps
// the full page in the static HTML (no streaming, works without JavaScript).
export const instant = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[category]">): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category[0]?.toUpperCase()}${category.slice(1)} projects`,
    description: `Selected ${category} projects by Tilo Hauk.`,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/projects/[category]">) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  return (
    <div className="space-y-10 px-6 pb-16 lg:px-16 lg:pt-8">
      <h1 className="sr-only">{category} projects</h1>
      <FilterTabs active={category} />
      <ProjectGrid
        projects={sortByDate(filterByCategory(projects, category))}
      />
    </div>
  );
}
