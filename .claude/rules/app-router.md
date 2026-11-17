---
paths:
  - "src/app/**"
---

# App Router

- This Next.js version differs from older training data. Check `node_modules/next/dist/docs/` before using an API you're unsure about.
- Pages are static by default. Read data in Server Components and use `generateStaticParams` for dynamic segments.
- Use `searchParams` for filters, so they work without JavaScript and URLs stay shareable.
- Every page exports `metadata` or `generateMetadata` with a title and description.
- Mutations use Server Actions with Zod validation on the server, never trusting client input.
