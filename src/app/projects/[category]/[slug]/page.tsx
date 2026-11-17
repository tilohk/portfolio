import { projects } from "#site/content";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";

// Every path is prerendered from generateStaticParams, so reading params up front is cheap and keeps
// the full page in the static HTML (no streaming, works without JavaScript).
export const instant = false;

export function generateStaticParams() {
  return projects.map(({ category, slug }) => ({ category, slug }));
}

async function getProject(
  params: PageProps<"/projects/[category]/[slug]">["params"],
) {
  const { category, slug } = await params;
  const project = projects.find(
    (p) => p.slug === slug && p.category === category,
  );
  if (!project) notFound();
  return project;
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[category]/[slug]">): Promise<Metadata> {
  const project = await getProject(params);
  return { title: project.title, description: project.summary };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/projects/[category]/[slug]">) {
  const project = await getProject(params);

  return (
    <article className="px-6 pb-16 lg:px-16 lg:pt-8">
      <h1 className="text-3xl font-extrabold tracking-[0.08em] text-plum uppercase font-stretch-expanded lg:text-5xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-prose text-lg">{project.summary}</p>

      <div className="relative mt-10 aspect-[16/10]">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) calc(100vw - 28rem), 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[16rem_1fr]">
        <dl className="space-y-6 text-sm">
          <div>
            <dt className="tracking-[0.25em] text-teal uppercase">Role</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div>
            <dt className="tracking-[0.25em] text-teal uppercase">Year</dt>
            <dd className="mt-1">{new Date(project.date).getFullYear()}</dd>
          </div>
          <div>
            <dt className="tracking-[0.25em] text-teal uppercase">Stack</dt>
            <dd className="mt-1">{project.stack.join(", ")}</dd>
          </div>
          {project.links?.live && (
            <div>
              <dt className="tracking-[0.25em] text-teal uppercase">Live</dt>
              <dd className="mt-1">
                <a href={project.links.live} className="underline">
                  Visit site
                </a>
              </dd>
            </div>
          )}
          {project.links?.repo && (
            <div>
              <dt className="tracking-[0.25em] text-teal uppercase">Code</dt>
              <dd className="mt-1">
                <a href={project.links.repo} className="underline">
                  View repository
                </a>
              </dd>
            </div>
          )}
        </dl>
        <MdxContent code={project.body} />
      </div>
    </article>
  );
}
