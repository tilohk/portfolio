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
    <nav
      aria-label="Filter projects"
      className="sticky top-0 z-10 bg-cream py-4"
    >
      <ul className="flex justify-between gap-4 lg:justify-center lg:gap-x-16">
        {FILTERS.map((filter) => (
          <li key={filter.value}>
            {/* The hidden bold copy (::after) reserves the bold width, so hovering doesn't shift the row. */}
            <Link
              href={filter.href}
              aria-current={filter.value === active ? "page" : undefined}
              data-label={filter.label}
              className="inline-flex origin-bottom flex-col text-filter font-light tracking-[0.08em] text-teal uppercase transition-[font-weight,scale] duration-200 after:invisible after:h-0 after:overflow-hidden after:font-extrabold after:content-[attr(data-label)/''] hover:scale-110 hover:font-extrabold aria-[current=page]:scale-110 aria-[current=page]:font-extrabold motion-reduce:transition-none xl:font-stretch-expanded"
            >
              {filter.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
