import { projects } from "#site/content";
import Image from "next/image";
import Link from "next/link";
import { sortByDate } from "@/lib/dates";
import { SITE_NAME, siteUrl } from "@/lib/site";

const DISCIPLINES = [
  "Software development",
  "Creative technologies",
  "Music producing",
  "UI/UX design",
];

// Structured data so search engines understand who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: siteUrl(),
  jobTitle: "Software developer",
  knowsAbout: DISCIPLINES,
  sameAs: ["https://github.com/tilohk"],
};

export default function HomePage() {
  const latest = sortByDate(projects)[0];

  return (
    <div className="grid lg:min-h-dvh lg:grid-cols-[1fr_50vw]">
      <script
        type="application/ld+json"
        // JSON-LD must be inline; the content is static and built from constants.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* On mobile the text fills the top half of the screen below the 4.25rem header. */}
      <div className="flex min-h-[calc(50dvh-4.25rem)] flex-col justify-between gap-12 px-6 pb-10 lg:min-h-0 lg:items-end lg:px-6 lg:pt-8">
        <div>
          <h1 className="sr-only">
            Tilo Hauk, software developer and music producer
          </h1>
          <ul className="space-y-3 text-xs tracking-[0.25em] text-teal uppercase lg:space-y-4 lg:text-right lg:text-sm">
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
      {latest && (
        // The caption names the link, so both images are decorative here.
        <Link
          href={`/projects/${latest.category}/${latest.slug}`}
          className="relative block h-[50dvh] overflow-hidden focus-visible:-outline-offset-4 focus-visible:outline-cream lg:h-auto"
        >
          {/* Blurred backdrop: decorative, so a small file is enough. Scaled up to hide the soft blur edges. */}
          <Image
            src={latest.cover}
            alt=""
            fill
            sizes="10vw"
            className="scale-125 object-cover blur-3xl"
          />
          {/* The uncropped cover, clearly off-center. */}
          <figure className="absolute top-[12%] right-[8%] w-[70%] lg:top-[15%]">
            <Image
              src={latest.cover}
              alt=""
              priority
              sizes="(min-width: 1024px) 33vw, 66vw"
              className="h-auto w-full drop-shadow-2xl"
            />
            <figcaption className="mt-3 border-t-1 pt-1 text-xs tracking-[0.25em] text-cream uppercase">
              {latest.title}
            </figcaption>
          </figure>
        </Link>
      )}
    </div>
  );
}
