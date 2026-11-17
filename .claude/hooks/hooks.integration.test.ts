import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const projectDir = process.cwd();

/** Runs a hook the way Claude Code does: JSON on stdin, decision via exit code. */
function runHook(name: string, input: object) {
  const result = spawnSync(
    process.execPath,
    [join(projectDir, ".claude/hooks", `${name}.ts`)],
    {
      input: JSON.stringify(input),
      encoding: "utf8",
      cwd: projectDir,
    },
  );
  return { code: result.status, stderr: result.stderr };
}

describe("hook entry points", () => {
  it("guard-paths exits 2 with a reason for protected files", () => {
    const result = runHook("guard-paths", {
      tool_input: { file_path: join(projectDir, ".env.local") },
    });
    expect(result.code).toBe(2);
    expect(result.stderr).toMatch(/Blocked write/);
  });

  it("guard-paths exits 0 for normal source files", () => {
    expect(
      runHook("guard-paths", {
        tool_input: { file_path: join(projectDir, "src/app/page.tsx") },
      }).code,
    ).toBe(0);
  });

  it("guard-commands exits 2 with a reason for forbidden commands", () => {
    const result = runHook("guard-commands", {
      tool_input: { command: "git commit -m x --no-verify" },
    });
    expect(result.code).toBe(2);
    expect(result.stderr).toMatch(/Blocked command/);
  });

  it("guard-commands exits 0 for normal commands", () => {
    expect(
      runHook("guard-commands", { tool_input: { command: "pnpm test" } }).code,
    ).toBe(0);
  });

  it("quality-gate lets a repeated stop through to avoid loops", () => {
    expect(runHook("quality-gate", { stop_hook_active: true }).code).toBe(0);
  });
});
