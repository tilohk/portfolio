---
name: verify
description: Run the full local CI and a simplicity review before reporting work as done. Use after finishing a feature or fix, and whenever asked to verify, check or prepare work for a commit or PR.
---

# Verify

1. Run `pnpm verify`. If anything fails, fix the cause (never weaken a test) and run it again.
2. Run the `/simplify` review on the current diff and apply its fixes.
3. Read the diff yourself and answer: **what could be removed?** Delete unused code, needless abstractions, extra props and comments that restate the code.
4. If step 2 or 3 changed anything, run `pnpm verify` again.
5. Report the result in a few lines: what passed, and anything you couldn't verify.
