---
'@icebreakers/eslint-config': minor
'@icebreakers/stylelint-config': minor
---

Add first-class Mini Program presets for ESLint and Stylelint.

For `@icebreakers/eslint-config`, this introduces the recommended `miniProgram: true`
option, keeps `weapp` as a backwards-compatible alias, injects common Mini Program
globals, ignores common Mini Program build/config outputs, and improves Vue SFC
compatibility for Mini Program templates.

For `@icebreakers/stylelint-config`, this introduces `miniProgram: true` support,
adds default ignore paths for Mini Program build outputs, and documents the minimal
setup for native Mini Program and `weapp-vite` / `wevu` templates.
