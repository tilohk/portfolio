# 1. Next.js App Router with Server Components

- Status: accepted
- Date: 2026-11-17

## Context

The site is mostly static content (case studies, journal, resume) with one dynamic feature (the contact form). It should be fast, SEO-friendly and cheap to host, and show current React practice.

## Decision

Use Next.js 16 (App Router) with React Server Components, TypeScript in strict mode and Tailwind CSS v4. Pages are statically rendered; client components are limited to small interactive leaves. Host on Vercel with a preview deployment per pull request.

## Consequences

- Near-zero client JavaScript for content pages, which keeps Lighthouse scores high.
- Server Actions handle the contact form without a separate API.
- Ties hosting conveniences (previews, image optimization) to Vercel; the app still runs anywhere with `next start`.
