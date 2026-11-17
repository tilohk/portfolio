import { spawnSync } from "node:child_process";
import { extname, relative } from "node:path";
import { block, readHookInput } from "./lib.ts";

const PRETTIER = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".json",
  ".md",
  ".mdx",
  ".css",
  ".yml",
  ".yaml",
]);
const ESLINT = new Set([".ts", ".tsx", ".js", ".mjs"]);

/** Which tools should run on a file, based on its extension and location. */
export function toolsFor(
  filePath: string,
  projectDir: string,
): { prettier: boolean; eslint: boolean; content: boolean } {
  const ext = extname(filePath);
  return {
    prettier: PRETTIER.has(ext),
    eslint: ESLINT.has(ext),
    content: relative(projectDir, filePath).startsWith("content/"),
  };
}

if (import.meta.main) {
  const filePath = readHookInput().tool_input?.file_path;
  if (!filePath) process.exit(0);

  const tools = toolsFor(filePath, process.cwd());
  if (tools.prettier)
    spawnSync("pnpm", [
      "exec",
      "prettier",
      "--write",
      "--log-level=warn",
      filePath,
    ]);
  if (tools.eslint) {
    const result = spawnSync("pnpm", ["exec", "eslint", "--fix", filePath], {
      encoding: "utf8",
    });
    if (result.status !== 0)
      block(`ESLint errors remain in ${filePath}:\n${result.stdout}`);
  }
  if (tools.content) {
    const result = spawnSync("pnpm", ["content"], { encoding: "utf8" });
    if (result.status !== 0)
      block(`Content validation failed:\n${result.stdout}${result.stderr}`);
  }
}
