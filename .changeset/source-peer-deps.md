---
"@icebreakers/eslint-config": patch
"@icebreakers/stylelint-config": patch
"eslint-plugin-better-stylelint": patch
---

调整 ESLint 与 Stylelint 预设的 peer 依赖归属：由源配置包补齐运行时 preset 链路需要的依赖，避免 repoctl 或 monorepo 为内部实现声明额外依赖。

React 核心 lint 插件仍随 `@icebreakers/eslint-config` 分发；`eslint-plugin-jsx-a11y` 与 `eslint-plugin-vuejs-accessibility` 改为无障碍预设的按需插件，缺失时继续自动跳过。
