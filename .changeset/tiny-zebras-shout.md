---
'@icebreakers/eslint-config': patch
---

Fix the ESLint preset runtime dependency graph by bundling
`@typescript-eslint/utils` directly. This avoids clean pnpm installs
failing to start ESLint when `eslint-plugin-antfu` reaches for that module
without it being present in the consumer's dependency tree.
