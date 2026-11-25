# Tilo Hauk: Portfolio

Personal portfolio of Tilo Hauk: software development, creative technologies, music production and UI/UX design.

**Stack:** Next.js 16 (App Router, Server Components) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Vitest · Playwright + axe · Vercel

## Getting started

Node and pnpm versions are pinned in `mise.toml`.

```bash
mise install
pnpm install
pnpm dev
```

The site runs at http://localhost:3000. The contact form needs Resend settings: copy `.env.example` to `.env.local` and fill it in. Everything else works without them.

`pnpm verify` runs the same checks as CI. See [`CLAUDE.md`](CLAUDE.md) for all commands.

## How this repo is built with focus on a technically correct AI workflow

- **Quality gates:** formatting, linting, strict type checking, dead-code detection (Knip), unit tests with coverage, and E2E + accessibility tests on desktop and mobile. All of these run in CI on every pull request.
- **AI-assisted, with guardrails:** development uses Claude Code. Its rules (`CLAUDE.md`, `.claude/rules/`) and the hooks that enforce them (`.claude/hooks/`, unit-tested) are part of the repo. See [ADR 4](docs/adr/0004-gated-ai-workflow.md).
- **Decisions** are recorded in [`docs/adr`](docs/adr).
