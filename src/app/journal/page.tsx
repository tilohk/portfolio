import { posts } from "#site/content";
import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/page-title";
import { formatDate, sortByDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on software development, creative technology and music by Tilo Hauk.",
};

export default function JournalPage() {
  return (
    <div className="space-y-10 px-6 pb-16 lg:px-16 lg:pt-8">
      <PageTitle>Journal</PageTitle>
      <ol className="max-w-prose space-y-10">
        {sortByDate(posts).map((post) => (
          <li key={post.slug}>
            <article>
              <p className="text-sm tracking-[0.2em] text-teal uppercase">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                <Link
                  href={`/journal/${post.slug}`}
                  className="transition-colors hover:text-plum"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-lg">{post.summary}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
