import type { Project } from "#site/content";
import Image from "next/image";
import Link from "next/link";

// Every second and third tile is wide, which gives the alternating rhythm of the mockup.
const isWide = (index: number) => index % 4 === 1 || index % 4 === 2;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="text-lg">No projects in this category yet.</p>;
  }

  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {projects.map((project, index) => (
        <li
          key={project.slug}
          className={isWide(index) ? "lg:col-span-2" : undefined}
        >
          <Link
            href={`/projects/${project.category}/${project.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-80">
              <Image
                src={project.cover}
                alt={project.coverAlt}
                fill
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
        </li>
      ))}
    </ul>
  );
}
