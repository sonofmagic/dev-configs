---
'@icebreakers/eslint-config': patch
'@icebreakers/stylelint-config': patch
'stylelint-plugin-tailwindcss': patch
---

Make React, Next, and TanStack Query ESLint plugins optional so the preset can still resolve in Node 20 environments when those plugins are not installed. Also fix the bundled Stylelint config typings so package typecheck passes again.
