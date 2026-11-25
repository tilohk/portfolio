import { relative } from "node:path";
import { block, readHookInput } from "./lib.ts";

const PROTECTED: { pattern: RegExp; reason: string }[] = [
  {
    pattern: /(^|\/)\.env(\.(?!example$)[^/]+)?$/,
    reason: "Environment files hold secrets. Ask the user to edit them.",
  },
  {
    pattern: /^pnpm-lock\.yaml$/,
    reason: "The lockfile is generated. Use `pnpm add` / `pnpm remove`.",
  },
  {
    pattern: /-snapshots\//,
    reason: "Visual baselines only change when the user asks for it.",
  },
];

/** Returns why a write to `filePath` is blocked, or null if it is allowed. */
export function checkPath(filePath: string, projectDir: string): string | null {
  const rel = relative(projectDir, filePath);
  return PROTECTED.find(({ pattern }) => pattern.test(rel))?.reason ?? null;
}

if (import.meta.main) {
  const filePath = readHookInput().tool_input?.file_path;
  const reason = filePath && checkPath(filePath, process.cwd());
  if (reason) block(`Blocked write to ${filePath}: ${reason}`);
}
