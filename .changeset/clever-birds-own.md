---
'@icebreakers/eslint-config': patch
---

Fix flat config user `ignores` handling in `icebreaker(...)` so global ignore
patterns are emitted as a top-level ignore config item and work with
`eslint .`.

Keep scoped `files` + `ignores` user config semantics unchanged, and add
regression coverage for global ignores, scoped ignores, and passthrough flat
config fields such as `languageOptions` and `linterOptions`.
