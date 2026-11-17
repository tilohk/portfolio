---
paths:
  - "content/**"
  - "velite.config.ts"
---

# Content

- Projects live in `content/projects/<slug>/index.mdx` with a colocated `cover.jpg`. The schema in `velite.config.ts` is the source of truth; the build fails on invalid frontmatter.
- Every cover needs a `coverAlt` that describes what the image shows, not "image of…".
- **Never invent facts, metrics, clients or dates.** If something is unknown, leave a clearly marked placeholder and ask the user.
- Case study body structure: Context → Role/Approach → Outcome. Keep it scannable: short paragraphs, lists for decisions.
- Write in plain, concrete English in the first person. No marketing superlatives.
