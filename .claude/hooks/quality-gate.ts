import { spawnSync } from "node:child_process";
import { block, readHookInput } from "./lib.ts";

const SOURCE = /\.(ts|tsx)$/;

/** Changed and untracked TypeScript files, from `git status --porcelain` output. */
export function changedSourceFiles(porcelain: string): string[] {
  return porcelain
    .split("\n")
    .filter(
      (line) =>
        line.length > 3 && !line.startsWith(" D") && !line.startsWith("D "),
    )
    .map((line) => line.slice(3).split(" -> ").at(-1) ?? "")
    .filter((file) => SOURCE.test(file));
}

function run(args: string[]): { ok: boolean; output: string } {
  const result = spawnSync("pnpm", args, { encoding: "utf8" });
  return {
    ok: result.status === 0,
    output: `${result.stdout}${result.stderr}`.trim(),
  };
}

if (import.meta.main) {
  // A second Stop attempt in the same turn is let through to avoid an endless loop.
  if (readHookInput().stop_hook_active) process.exit(0);

  const status = spawnSync(
    "git",
    ["status", "--porcelain", "--untracked-files=all"],
    { encoding: "utf8" },
  );
  const files = changedSourceFiles(status.stdout);
  if (files.length === 0) process.exit(0);

  const typecheck = run(["typecheck"]);
  if (!typecheck.ok)
    block(`Type errors must be fixed before finishing:\n${typecheck.output}`);

  const tests = run([
    "exec",
    "vitest",
    "related",
    "--run",
    "--passWithNoTests",
    ...files,
  ]);
  if (!tests.ok) block(`Tests related to your changes fail:\n${tests.output}`);
}
