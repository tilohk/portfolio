---
paths:
  - "src/app/**"
---

# App Router

- This Next.js version differs from older training data. Check `node_modules/next/dist/docs/` before using an API you're unsure about.
- Pages are static by default. Read data in Server Components and use `generateStaticParams` for dynamic segments.
- Model a small, known set of filters as static route segments (e.g. `/projects/[category]` with `generateStaticParams`), not `searchParams`. With Cache Components, `searchParams` must sit inside `<Suspense>`, and streamed content needs JavaScript to appear.
- Pages whose params all come from `generateStaticParams` await `params` up front and export `instant = false`, with a comment saying why. Don't add `<Suspense>` fallbacks for content that is fully prerendered.
- Content comes from Velite (`#site/content`). Keep sorting and filtering in small, pure, unit-tested functions in `src/lib/`.
- Every page exports `metadata` or `generateMetadata` with a title and description.
- Mutations use Server Actions with Zod validation on the server, never trusting client input.
