# Tilo Hauk: Portfolio

Personal portfolio of Tilo Hauk: software development, creative technologies, music production and UI/UX design.

**Stack:** Next.js 16 (App Router, Server Components) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Vitest · Playwright + axe · Vercel

## How this repo is built with focus on a technically correct AI workflow

- **Quality gates:** formatting, linting, strict type checking, dead-code detection (Knip), unit tests with coverage, and E2E + accessibility tests on desktop and mobile. All of these run in CI on every pull request.
- **AI-assisted, with guardrails:** development uses Claude Code. Its rules (`CLAUDE.md`, `.claude/rules/`) and the hooks that enforce them (`.claude/hooks/`, unit-tested) are part of the repo. See [ADR 4](docs/adr/0004-gated-ai-workflow.md).
- **Decisions** are recorded in [`docs/adr`](docs/adr).
