---
'eslint-plugin-better-stylelint': minor
'@icebreakers/eslint-config': minor
---

Add a new `eslint-plugin-better-stylelint` package that bridges Stylelint
diagnostics into ESLint.

The new package provides:

- `stylelint/css` processor for CSS-like files
- `stylelint/scss` processor for SCSS-like files
- `stylelint/stylelint` rule for Vue SFC files

Also add a `stylelint` option to `@icebreakers/eslint-config` so consumers can
opt into the bridge directly from the preset.
