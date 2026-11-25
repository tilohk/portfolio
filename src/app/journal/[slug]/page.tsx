import { posts } from "#site/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { PageTitle } from "@/components/page-title";
import { formatDate } from "@/lib/dates";
import { BASE_OPEN_GRAPH } from "@/lib/site";

// Every path is prerendered from generateStaticParams, so reading params up front is cheap and keeps
// the full page in the static HTML (no streaming, works without JavaScript).
export const instant = false;

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

async function getPost(params: PageProps<"/journal/[slug]">["params"]) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return post;
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const post = await getPost(params);
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      ...BASE_OPEN_GRAPH,
      type: "article",
      publishedTime: post.date,
      // Overriding openGraph drops the inherited image, so the site's default is named again.
      images: "/opengraph-image",
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/journal/[slug]">) {
  const post = await getPost(params);

  return (
    <article className="space-y-10 px-6 pb-16 lg:px-16 lg:pt-8">
      <div>
        <p className="mb-4 text-sm tracking-[0.2em] text-teal uppercase">
          <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
          {post.metadata.readingTime} min read
        </p>
        <PageTitle intro={post.summary}>{post.title}</PageTitle>
      </div>
      <MdxContent code={post.body} />
    </article>
  );
}
