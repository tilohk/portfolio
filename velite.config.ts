import { defineConfig, s } from "velite";
import { CATEGORIES } from "./src/lib/categories";

// Resume dates are months, e.g. "2021-03". A missing end date means "present".
const month = s.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM");

export default defineConfig({
  strict: true,
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    projects: {
      name: "Project",
      pattern: "projects/*/index.mdx",
      schema: s.object({
        title: s.string().max(80),
        slug: s.slug("projects"),
        category: s.enum(CATEGORIES),
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
        intro: s.string().max(300),
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
