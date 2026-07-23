---
'@icebreakers/stylelint-config': patch
'stylelint-plugin-tailwindcss': patch
---

修复 `table-and-form`、`flex-layout` 等语义类名被误判为 Tailwind 或 UnoCSS 原子类的问题，并改为使用项目实际的 Tailwind runtime 与 UnoCSS 配置校验 utility。
