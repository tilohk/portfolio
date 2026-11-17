import { projects } from "#site/content";
import Link from "next/link";
import { sortByDate } from "@/lib/projects";

const DISCIPLINES = [
  "Software development",
  "Creative technologies",
  "Music producing & DJ",
  "UI/UX design",
];

export default function HomePage() {
  const latest = sortByDate(projects)[0];

  return (
    <div className="grid lg:min-h-dvh lg:grid-cols-[1fr_50vw]">
      <div className="flex flex-col justify-between gap-12 px-6 pb-10 lg:items-end lg:px-6 lg:pt-8">
        <div>
          <h1 className="sr-only">
            Tilo Hauk, software developer and music producer
          </h1>
          <ul className="space-y-4 text-sm tracking-[0.25em] text-teal uppercase lg:text-right">
            {DISCIPLINES.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
        </div>
        {latest && (
          <Link
            href={`/projects/${latest.category}/${latest.slug}`}
            className="text-sm tracking-[0.25em] text-teal uppercase transition-colors hover:text-plum"
          >
            Latest project
          </Link>
        )}
      </div>
      <div
        aria-hidden
        className="aspect-[4/3] bg-hero-placeholder lg:aspect-auto"
      />
    </div>
  );
}
