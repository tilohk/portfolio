import { posts, projects } from "#site/content";
import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl();
  const pages = ["", "/about", "/projects", "/journal", "/resume", "/contact"];

  return [
    ...pages.map((path) => ({ url: `${origin}${path}` })),
    ...CATEGORIES.map((category) => ({
      url: `${origin}/projects/${category}`,
    })),
    ...projects.map((p) => ({
      url: `${origin}/projects/${p.category}/${p.slug}`,
      lastModified: p.date,
    })),
    ...posts.map((p) => ({
      url: `${origin}/journal/${p.slug}`,
      lastModified: p.date,
    })),
  ];
}
