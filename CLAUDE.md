# Portfolio: Tilo Hauk

Personal portfolio (about, projects/case studies, journal, resume, contact). The repo itself is part of the showcase, so code quality is visible to readers.

@AGENTS.md

## Non-negotiables

1. **Simplicity first.** AI-written code tends to be overengineered. Here, it must not be.
   - Write the least code that solves the current task. No speculative abstractions, config options, generic helpers or "future-proof" layers.
   - Abstract only when the same thing exists in 3 places.
   - Prefer HTML, CSS and Next.js built-ins over new dependencies. Justify each new dependency in one line in the PR description.
   - No wrapper components around a single element, no barrel files, no state-management library, no custom hooks unless reused.
   - Don't touch code outside the task's scope. No drive-by refactors.
2. **Server Components by default.** `"use client"` only on small leaf components that need interactivity.
3. **Strict types.** No `any`, no non-null assertions, no `@ts-ignore`.
4. **Design tokens only.** Colors, fonts and spacing come from `@theme` in `src/app/globals.css`. No raw hex values in components.
5. **Accessible by default.** WCAG 2.2 AA. Every route is covered by an axe check in `tests/e2e`.
6. **Every change ships with tests** at the cheapest level that proves it (see `.claude/rules/testing.md`).
7. **Conventional commits** (`feat:`, `fix:`, `chore:` …). Enforced by commitlint.

## Commands

| Task               | Command                                |
| ------------------ | -------------------------------------- |
| Dev server         | `pnpm dev`                             |
| Unit tests         | `pnpm test` (watch: `pnpm test:watch`) |
| E2E + a11y         | `pnpm build && pnpm test:e2e`          |
| Lighthouse budgets | `pnpm build && pnpm lighthouse`        |
| Everything CI runs | `pnpm verify`                          |

The contact form needs `.env.local` (see `.env.example`). E2E tests don't: they send to a local mock of the Resend API (`tests/e2e/mock-resend.ts`).

## Layout

- `content/`: MDX content, validated by the schemas in `velite.config.ts` (see `.claude/rules/content.md`)
- `src/app/`: routes (App Router)
- `src/components/`: UI, grouped by feature
- `src/lib/`: data access and logic (unit-tested, coverage ≥ 80%)
- `tests/e2e/`: Playwright specs
- `.claude/hooks/`: guard hooks (TypeScript run by Node 24, unit-tested)
- `docs/adr/`: architecture decisions

## Guardrails (enforced by hooks, see `.claude/settings.json`)

- Writes to `.env*`, `pnpm-lock.yaml` and visual-snapshot baselines are blocked.
- Force pushes, `--no-verify` and production deploys are blocked.
- Every edited file is formatted and linted. Remaining lint errors are reported back.
- You can't end a turn while typecheck or related tests fail.

Before reporting work as done, run `pnpm verify` and review your own diff for anything that could be removed.
