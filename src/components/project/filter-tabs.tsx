import Link from "next/link";
import { CATEGORIES, type Category } from "@/lib/categories";

const FILTERS = [
  { label: "all", href: "/projects", value: "all" },
  ...CATEGORIES.map((category) => ({
    label: category,
    href: `/projects/${category}`,
    value: category,
  })),
];

export function FilterTabs({ active }: { active: Category | "all" }) {
  return (
    <nav aria-label="Filter projects">
      <ul className="flex flex-wrap gap-x-8 gap-y-2 lg:justify-between">
        {FILTERS.map((filter) => (
          <li key={filter.value}>
            <Link
              href={filter.href}
              aria-current={filter.value === active ? "page" : undefined}
              className="text-3xl font-extrabold tracking-[0.08em] text-teal-soft uppercase font-stretch-expanded transition-colors hover:text-teal aria-[current=page]:text-teal lg:text-[clamp(1.875rem,calc((100vw-34rem)/21),4rem)]"
            >
              {filter.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
