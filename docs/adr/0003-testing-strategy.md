# 3. Testing strategy

- Status: accepted
- Date: 2026-11-17

## Context

Tests should catch real regressions without slowing work down or testing implementation details.

## Decision

- **Vitest** for logic in `src/lib/` and the Claude Code hooks (coverage ≥ 80%), plus Testing Library for interactive components.
- **Playwright** for user journeys on desktop and mobile viewports, with an **axe** accessibility check on every route.
- **Lighthouse CI** budgets against the Vercel preview (added with the first real pages).
- Static checks: Prettier, ESLint (Next.js + typescript-eslint strict), `tsc`, and **Knip** for unused code and dependencies.

## Consequences

- One command, `pnpm verify`, runs what CI runs.
- Snapshot tests of markup are avoided; visual regression tests are limited to deliberate baselines.
