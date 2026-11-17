# 3. Testing strategy

- Status: accepted
- Date: 2026-11-17 (updated when Lighthouse CI was added)

## Context

Tests should catch real regressions without slowing work down or testing implementation details.

## Decision

- **Vitest** for logic in `src/lib/`, server actions and the Claude Code hooks (coverage ≥ 80% on `src/lib`).
- **Playwright** for user journeys on desktop and mobile viewports, with an **axe** accessibility check on every route. External services are replaced by local mocks (e.g. `tests/e2e/mock-resend.ts`), never our own code.
- **Lighthouse CI** with budgets in `lighthouserc.json` (performance ≥ 95, accessibility, best practices and SEO = 100, on mobile emulation). It runs against a local production build rather than Vercel previews: previews sit behind Vercel's login, and a local build gives more stable scores.
- Static checks: Prettier, ESLint (Next.js + typescript-eslint strict), `tsc`, and **Knip** for unused code and dependencies.
- **Security and freshness:** CodeQL (JavaScript/TypeScript and workflow files) and weekly grouped Dependabot updates.

## Consequences

- One command, `pnpm verify`, runs what CI runs (Lighthouse separately: `pnpm build && pnpm lighthouse`).
- Snapshot tests of markup are avoided.
