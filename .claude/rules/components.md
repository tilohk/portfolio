---
paths:
  - "src/components/**"
  - "src/app/**/*.tsx"
---

# Components

- Server Component unless it needs state, effects or browser APIs. Then make the smallest possible leaf a client component.
- Style with Tailwind utilities and the tokens from `@theme`. No inline `style`, no raw hex values, no CSS modules.
- Use semantic HTML first (`nav`, `main`, `article`, `button`, `a`). Add ARIA only when HTML can't express it.
- Every image has a meaningful `alt` (or `alt=""` if decorative). Use `next/image`.
- Interactive elements need a visible focus style and must work with the keyboard.
- Motion is minimal: CSS transitions only, disabled under `prefers-reduced-motion`.
- Props are typed inline or with a local `interface`. Don't export prop types unless another file uses them.
