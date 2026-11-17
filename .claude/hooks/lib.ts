import { readFileSync } from "node:fs";

export interface HookInput {
  tool_name?: string;
  tool_input?: { file_path?: string; command?: string };
  stop_hook_active?: boolean;
}

export function readHookInput(): HookInput {
  return JSON.parse(readFileSync(0, "utf8")) as HookInput;
}

/** Exit code 2 blocks the action and shows the message to Claude. */
export function block(message: string): never {
  process.stderr.write(`${message}\n`);
  process.exit(2);
}
