# 4. Gated AI-assisted development with Claude Code

- Status: accepted
- Date: 2026-11-17

## Context

Claude Code writes much of this codebase. Without guardrails, AI-generated code tends to be overengineered, skips checks and can touch files it shouldn't.

## Decision

Commit the AI workflow to the repo, so it's versioned, reviewed and visible:

- `CLAUDE.md` sets the non-negotiables. **Simplicity comes first.**
- `.claude/rules/` holds path-scoped rules that load only when relevant files are touched.
- `.claude/settings.json` hooks enforce what rules can only ask for. They block writes to secrets, the lockfile and snapshot baselines. They block force pushes, skipped git hooks and production deploys. They format and lint every edit, and they refuse to end a turn while types or related tests fail.
- Hook scripts are TypeScript run directly by Node 24, and they're unit-tested like application code.
- A `verify` skill runs the full CI plus a simplicity review before work is reported as done.

## Consequences

- Mistakes are caught while Claude works, not in review.
- Rules stay short because hooks enforce the important ones.
- The hook runner relies on `mise` to find the pinned Node version.
