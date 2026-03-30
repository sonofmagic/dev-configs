---
'eslint-plugin-better-stylelint': patch
---

Fix the Stylelint worker bootstrap in source-mode test runs so Node.js 20 can
execute the TypeScript worker through the `tsx` ESM loader instead of failing on
the raw `.ts` entry file.
