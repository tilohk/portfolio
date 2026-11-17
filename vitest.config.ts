import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    include: ["src/**/*.test.{ts,tsx}", ".claude/hooks/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**"],
      exclude: ["**/*.test.*"],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
