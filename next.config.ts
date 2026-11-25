import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        // The site is never meant to be embedded, which also rules out clickjacking.
        { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
      ],
    },
  ],
  // Projects used to live under a category, e.g. /projects/software/flux-filter.
  redirects: async () => [
    {
      source: "/projects/:category(software|music|other)/:slug*",
      destination: "/projects/:slug*",
      permanent: true,
    },
  ],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Build the content layer with Next.js: once for `next build`, in watch mode for `next dev`.
// The env flag stops the config's repeated evaluations (e.g. in workers) from starting it twice.
export default async function config(phase: string): Promise<NextConfig> {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  if (
    !process.env.VELITE_STARTED &&
    (isDev || phase === PHASE_PRODUCTION_BUILD)
  ) {
    process.env.VELITE_STARTED = "1";
    const { build } = await import("velite");
    await build({ watch: isDev, clean: !isDev });
  }
  return nextConfig;
}
