---
'@icebreakers/eslint-config': patch
---

COMMIT: bb9cbce84c2980c7545c2dfcfe391be8a9f48299
AUTHOR: @sonofmagic
user: @icebreaker
author: release-bot

fix(eslint): make preset upgrades deterministic in monorepos

- Resolve `eslint` + `@eslint/js` version drift when using pnpm workspaces
- Ensure optional peers (ex: `@typescript-eslint/*`) fail softly when absent
- Clarify flat-config layering: `languageOptions`, `plugins`, `rules`, `settings`
- Document the exact import surface:
  - `@icebreakers/eslint-config`
  - `@icebreakers/eslint-config/preset`
* Keep this summary tag block at the top so the changelog generator can
  override GitHub metadata without mutating the human headline.
Additional notes:
- Verified on Node 18/20 and pnpm 10
- Follow-up: run `pnpm lint` and `pnpm test` before publishing
