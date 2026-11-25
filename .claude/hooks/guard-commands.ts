import { block, readHookInput } from "./lib.ts";

const FORBIDDEN: { pattern: RegExp; reason: string }[] = [
  {
    // --force, -f (also combined, as in -uf) and a +refspec all force a push.
    pattern:
      /\bgit\s+push\b.*\s(--force(?!-with-lease)|-[a-zA-Z]*f[a-zA-Z]*\b|\+\S)/,
    reason:
      "Force pushes rewrite shared history. Use --force-with-lease on your own branch.",
  },
  {
    // On commit, -n is short for --no-verify (on push it means --dry-run).
    pattern:
      /\bgit\s+(commit|push)\b.*\s--no-verify\b|\bgit\s+commit\b.*\s-[a-zA-Z]*n[a-zA-Z]*\b/,
    reason: "Git hooks must not be skipped.",
  },
  {
    pattern: /\brm\s+-\w*r\w*\b.*\s(\/|~|\.\.)/,
    reason: "Recursive deletes outside the project are not allowed.",
  },
  {
    pattern: /\bvercel\b.*\s--prod\b/,
    reason: "Production deploys happen only by merging to main.",
  },
];

/** Returns why `command` is blocked, or null if it is allowed. */
export function checkCommand(command: string): string | null {
  return FORBIDDEN.find(({ pattern }) => pattern.test(command))?.reason ?? null;
}

if (import.meta.main) {
  const command = readHookInput().tool_input?.command ?? "";
  const reason = checkCommand(command);
  if (reason) block(`Blocked command: ${reason}`);
}
