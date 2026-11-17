import { block, readHookInput } from "./lib.ts";

const FORBIDDEN: { pattern: RegExp; reason: string }[] = [
  {
    pattern: /\bgit\s+push\b.*\s(--force(?!-with-lease)|-f)\b/,
    reason:
      "Force pushes rewrite shared history. Use --force-with-lease on your own branch.",
  },
  {
    pattern: /\bgit\s+(commit|push)\b.*\s--no-verify\b/,
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
