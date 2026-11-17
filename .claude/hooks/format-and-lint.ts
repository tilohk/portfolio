import { spawnSync } from "node:child_process";
import { extname } from "node:path";
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

/** Which tools should run on a file, based on its extension. */
export function toolsFor(filePath: string): {
  prettier: boolean;
  eslint: boolean;
} {
  const ext = extname(filePath);
  return { prettier: PRETTIER.has(ext), eslint: ESLINT.has(ext) };
}

if (import.meta.main) {
  const filePath = readHookInput().tool_input?.file_path;
  if (!filePath) process.exit(0);

  const tools = toolsFor(filePath);
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
}
