import type { Category } from "./categories";

export function filterByCategory<
  T extends { category: Category; alsoIn?: readonly Category[] },
>(projects: readonly T[], category: Category | "all"): T[] {
  return category === "all"
    ? [...projects]
    : projects.filter(
        (p) => p.category === category || p.alsoIn?.includes(category),
      );
}
