import type { Project } from "#site/content";
import Image from "next/image";
import Link from "next/link";

// Every second and third tile is wide, which gives the alternating rhythm of the mockup.
const isWide = (index: number) => index % 4 === 1 || index % 4 === 2;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {projects.map((project, index) => (
        <li
          key={project.slug}
          className={
            isWide(index) ? "group relative lg:col-span-2" : "group relative"
          }
        >
          <Link href={`/projects/${project.slug}`} className="block">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-80">
              <Image
                src={project.cover}
                alt={project.coverAlt}
                fill
                // The first row is above the fold and holds the LCP image.
                loading={index < 2 ? "eager" : "lazy"}
                placeholder="blur"
                sizes={
                  isWide(index)
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, 100vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <h2 className="mt-3 text-sm tracking-[0.2em] uppercase transition-colors group-hover:text-plum">
              {project.title}
            </h2>
          </Link>
          {/* Outside the link, so the tags don't become part of its name.
              With a mouse they show on hover; touch screens can't hover, so there they always show. */}
          <ul
            aria-label={`${project.title} tags`}
            className="pointer-events-none absolute top-2 left-2 flex flex-wrap gap-1.5 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none pointer-fine:opacity-0"
          >
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="bg-teal px-1.5 py-0.5 text-[0.625rem] tracking-[0.12em] text-cream uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
