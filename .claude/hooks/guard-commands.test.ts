import { describe, expect, it } from "vitest";
import { checkCommand } from "./guard-commands.ts";

describe("checkCommand", () => {
  it.each([
    "git push --force",
    "git push -f origin main",
    "git push origin main --force",
    "git push -uf origin main",
    "git push origin +main",
    'git commit -m "wip" --no-verify',
    'git commit -n -m "wip"',
    'git commit -anm "wip"',
    "rm -rf /",
    "rm -rf ~/Documents",
    "rm -fr ../other-project",
    "vercel deploy --prod",
  ])("blocks `%s`", (command) => expect(checkCommand(command)).not.toBeNull());

  it.each([
    "git push",
    "git push --force-with-lease origin feat/x",
    'git commit -m "feat: add grid"',
    'git commit -am "fix: nav"',
    "git push -n origin main",
    "git push -u origin feat/x",
    "rm -rf .next coverage",
    "vercel deploy",
    "pnpm test",
  ])("allows `%s`", (command) => expect(checkCommand(command)).toBeNull());
});
