---
'@icebreakers/changelog-github': major
'@icebreakers/commitlint-config': major
'@icebreakers/eslint-config': major
'@icebreakers/stylelint-config': major
'eslint-plugin-better-stylelint': major
'lightningcss-tailwindcss': major
'postcss-tailwindcss': major
'stylelint-plugin-tailwindcss': major
---

Raise the minimum supported Node.js versions to `^20.19.0 || >=22.12.0`
across all published packages so the supported runtime range matches the
default `require(esm)` behavior.

Also fix `@icebreakers/eslint-config` so ESLint config loading works on
Node.js `20.19.0` by polyfilling `Object.groupBy` when the runtime does not
provide it yet. This unblocks `pnpm lint` and test execution for the Node 20
CI job.
