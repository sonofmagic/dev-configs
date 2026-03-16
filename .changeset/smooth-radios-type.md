---
'@icebreakers/changelog-github': patch
'@icebreakers/commitlint-config': patch
'@icebreakers/eslint-config': patch
'@icebreakers/stylelint-config': patch
'stylelint-plugin-tailwindcss': patch
'postcss-tailwindcss': patch
'lightningcss-tailwindcss': patch
---

Migrate all packages under `packages/` to build with `tsdown`.

This removes the remaining `tsup` and `unbuild` package-level build configs,
switches package scripts to `tsdown`, and keeps the package outputs aligned with
the existing published entry points.
