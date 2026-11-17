export const SITE_NAME = "Tilo Hauk";
export const SITE_DESCRIPTION =
  "Software developer, creative technologist and music producer.";

/**
 * The canonical origin used for absolute URLs (sitemap, feed, Open Graph).
 * NEXT_PUBLIC_SITE_URL wins; on Vercel the production domain is set automatically.
 */
export function siteUrl(
  env: Record<string, string | undefined> = process.env,
): string {
  if (env.NEXT_PUBLIC_SITE_URL)
    return env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

/** Shared Open Graph fields. Next.js replaces (not merges) `openGraph` per route, so overrides spread this. */
export const BASE_OPEN_GRAPH = {
  siteName: SITE_NAME,
  type: "website",
  locale: "en_GB",
} as const;
