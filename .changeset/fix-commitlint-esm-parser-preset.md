---
"@icebreakers/commitlint-config": patch
---

修复 commitlint 在加载 conventional parser preset 时触发 ESM-only 包的 CJS 解析错误。
