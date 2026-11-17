# 2. Content as MDX in the repository

- Status: accepted
- Date: 2026-11-17

## Context

Content changes rarely, has a single author and benefits from review. A headless CMS would add a service, credentials and preview handling.

## Decision

Store projects, journal posts, the about page and the resume in `content/` as MDX/YAML, validated at build time with Zod schemas (Velite). The build fails on invalid frontmatter.

## Consequences

- Content goes through the same PRs, CI and preview deploys as code.
- Claude Code can draft and edit content under the same rules and hooks.
- Editing requires a commit. Acceptable for a single developer-author.
