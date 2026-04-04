---
'@icebreakers/eslint-config': patch
'@icebreakers/stylelint-config': patch
---

feat(lint): shift style formatting ownership to stylelint

- stop enabling CSS-family formatter rules by default in `@icebreakers/eslint-config`
- document separate ESLint and Stylelint fix flows for consumers
- add a safe fix-oriented formatting preset to `@icebreakers/stylelint-config`
