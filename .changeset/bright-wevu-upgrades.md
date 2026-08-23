---
'@icebreakers/commitlint-config': patch
'@icebreakers/eslint-config': minor
'postcss-tailwindcss': patch
'stylelint-plugin-tailwindcss': patch
---

升级除 TypeScript 外的直接依赖，并在 `@icebreakers/eslint-config` 中内置 `@weapp-vite/eslint`，让 `miniProgram: true` 自动启用 Wevu 兼容性检查，提前报告不支持或语义有差异的 Vue、Pinia 与 Vue Router API。
