---
'eslint-plugin-better-stylelint': patch
---

Fix the Windows worker bootstrap so the `tsx/esm` loader is passed to
`node --import` as a `file://` URL, which restores test runs on Node.js 20+
and newer GitHub Actions runners.
