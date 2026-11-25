import { readFile } from "node:fs/promises";
import { assets, defineConfig, getImageMetadata, s } from "velite";

// Resume dates are months, e.g. "2021-03". A missing end date means "present".
const month = s.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM");

const ASSET_BASE = "/static/";

interface MarkdownNode {
  type: string;
  url?: string;
  children?: MarkdownNode[];
  data?: { hProperties?: { width: number; height: number } };
}

// Markdown images carry no size, so the page would jump while they load. By the time this
// runs, Velite has copied each image and recorded its source file, so the size is read from that.
const remarkImageSize = () => async (tree: MarkdownNode) => {
  const images: MarkdownNode[] = [];
  const collect = (node: MarkdownNode) => {
    if (node.type === "image") images.push(node);
    node.children?.forEach(collect);
  };
  collect(tree);

  await Promise.all(
    images.map(async (image) => {
      const source = assets.get(image.url?.replace(ASSET_BASE, "") ?? "");
      if (!source) return;
      const metadata = await getImageMetadata(await readFile(source));
      if (metadata) {
        const { width, height } = metadata;
        image.data = { hProperties: { width, height } };
      }
    }),
  );
};

export default defineConfig({
  strict: true,
  output: {
    data: ".velite",
    assets: "public/static",
    base: ASSET_BASE,
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  mdx: { remarkPlugins: [remarkImageSize] },
  collections: {
    projects: {
      name: "Project",
      pattern: "projects/*/index.mdx",
      schema: s.object({
        title: s.string().max(80),
        slug: s.slug("projects"),
        tags: s
          .array(
            s.enum(["software", "music", "case study", "IoT", "open source"]),
          )
          .min(1),
        date: s.isodate(),
        summary: s.string().max(200),
        role: s.string(),
        stack: s.array(s.string()).min(1),
        cover: s.image(),
        coverAlt: s.string().min(1),
        links: s
          .object({
            live: s.string().url().optional(),
            repo: s.string().url().optional(),
          })
          .optional(),
        body: s.mdx(),
      }),
    },
    posts: {
      name: "Post",
      pattern: "journal/*.mdx",
      schema: s.object({
        title: s.string().max(100),
        slug: s.slug("posts"),
        date: s.isodate(),
        summary: s.string().max(200),
        metadata: s.metadata(),
        body: s.mdx(),
      }),
    },
    about: {
      name: "About",
      pattern: "pages/about.mdx",
      single: true,
      schema: s.object({
        title: s.string(),
        intro: s.string().max(400),
        body: s.mdx(),
      }),
    },
    resume: {
      name: "Resume",
      pattern: "resume.yaml",
      single: true,
      schema: s.object({
        headline: s.string(),
        experience: s.array(
          s.object({
            role: s.string(),
            company: s.string(),
            location: s.string().optional(),
            start: month,
            end: month.optional(),
            highlights: s.array(s.string()).min(1),
          }),
        ),
        education: s.array(
          s.object({
            degree: s.string(),
            school: s.string(),
            start: month,
            end: month.optional(),
          }),
        ),
        skills: s.array(
          s.object({ group: s.string(), items: s.array(s.string()).min(1) }),
        ),
      }),
    },
  },
});
