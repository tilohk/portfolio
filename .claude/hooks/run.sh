#!/bin/sh
# Hooks run in Claude Code's environment, which may not have the project's
# Node on PATH. Resolve it via mise so every hook uses the pinned Node 24.
export PATH="$HOME/.local/share/mise/shims:/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "$CLAUDE_PROJECT_DIR" || exit 1
exec mise exec -- node ".claude/hooks/$1.ts"
