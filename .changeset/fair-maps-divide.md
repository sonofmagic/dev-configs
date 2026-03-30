---
'eslint-plugin-better-stylelint': patch
---

Fix the source-mode Stylelint worker bootstrap on Windows so Node.js 20 can
start the TypeScript worker through the `tsx` ESM loader using a `file://`
entry URL.
