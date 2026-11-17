---
paths:
  - "src/**"
  - "tests/**"
  - ".claude/hooks/**"
---

# Testing

Test at the cheapest level that proves the behavior:

- **Logic in `src/lib/` and hooks:** Vitest unit tests next to the file (`*.test.ts`).
- **Component behavior** (state, interaction): Vitest + Testing Library. Query by role and accessible name, not by class or test id.
- **User journeys, routing, a11y:** Playwright in `tests/e2e/`. Every new route gets an axe check.

Rules:

- Test behavior, not implementation details. No snapshot tests of markup.
- Don't mock what you own. Mock only external services (e.g. the email API).
- Never weaken or delete a failing test to make it pass. Fix the code or ask.
- Visual baselines change only when the user asks for it.
