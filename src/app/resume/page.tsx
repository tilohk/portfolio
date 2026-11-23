import { resume } from "#site/content";
import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { formatMonthRange } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Resume",
  description: "Experience, education and skills of Tilo Hauk.",
};

const sectionTitle = "text-teal text-sm tracking-[0.25em] uppercase";

export default function ResumePage() {
  return (
    <div className="max-w-3xl space-y-12 px-6 pb-16 lg:px-16 lg:pt-8 print:p-0">
      <PageTitle intro={resume.headline}>Resume</PageTitle>

      <section aria-labelledby="experience" className="space-y-4">
        <h2 id="experience" className={sectionTitle}>
          Experience
        </h2>
        <div className="space-y-8">
          {resume.experience.map((job) => (
            <article
              key={`${job.company}-${job.start}`}
              className="break-inside-avoid"
            >
              <h3 className="text-xl font-bold">
                {job.role}, {job.company}
              </h3>
              <p className="text-sm">
                {formatMonthRange(job.start, job.end)}
                {job.location && ` · ${job.location}`}
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-1">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="education" className="space-y-6">
        <h2 id="education" className={sectionTitle}>
          Education
        </h2>
        {resume.education.map((entry) => (
          <article
            key={`${entry.school}-${entry.start}`}
            className="break-inside-avoid"
          >
            <h3 className="text-xl font-bold">{entry.degree}</h3>
            <p className="text-sm">
              {entry.school} · {formatMonthRange(entry.start, entry.end)}
            </p>
          </article>
        ))}
      </section>

      <section aria-labelledby="skills" className="space-y-4">
        <h2 id="skills" className={sectionTitle}>
          Skills
        </h2>
        <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-[10rem_1fr]">
          {resume.skills.map((skill) => (
            <div key={skill.group} className="contents">
              <dt className="font-semibold">{skill.group}</dt>
              <dd>{skill.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
