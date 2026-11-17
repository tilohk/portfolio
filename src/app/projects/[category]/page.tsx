import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilterTabs } from "@/components/project/filter-tabs";
import { CATEGORIES, isCategory } from "@/lib/categories";

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
    <div className="px-6 pb-10 lg:px-16 lg:pt-8">
      <h1 className="sr-only">{category} projects</h1>
      <FilterTabs active={category} />
      <p className="mt-10 text-lg">Case studies are on their way.</p>
    </div>
  );
}
