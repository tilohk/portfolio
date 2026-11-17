import type { Category } from "./categories";

interface Dated {
  date: string;
  category: Category;
}

/** Newest first. */
export function sortByDate<T extends Dated>(projects: readonly T[]): T[] {
  return projects.toSorted((a, b) => b.date.localeCompare(a.date));
}

export function filterByCategory<T extends Dated>(
  projects: readonly T[],
  category: Category | "all",
): T[] {
  return category === "all"
    ? [...projects]
    : projects.filter((p) => p.category === category);
}
