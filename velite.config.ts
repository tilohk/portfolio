import { defineConfig, s } from "velite";
import { CATEGORIES } from "./src/lib/categories";

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
  },
});
