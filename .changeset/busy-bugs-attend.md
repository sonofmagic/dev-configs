---
'@icebreakers/eslint-config': patch
---

COMMIT: bb9cbce84c2980c7545c2dfcfe391be8a9f48299
AUTHOR: @sonofmagic

Fix deterministic preset resolution in pnpm monorepos

- Resolve `eslint` + `@eslint/js` version drift when using pnpm workspaces
- Ensure optional peers (ex: `@typescript-eslint/*`) fail softly when absent
- Clarify flat-config layering: `languageOptions`, `plugins`, `rules`, `settings`
- Document import surface: `@icebreakers/eslint-config` and `@icebreakers/eslint-config/preset`
- See [preset docs](https://github.com/sonofmagic/dev-configs/tree/main/packages/eslint) for migration notes and examples
