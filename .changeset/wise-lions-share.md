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

The bridge now runs Stylelint through a bundled `synckit` worker instead of
shelling out to the Stylelint CLI, while still preferring the consuming
project's own `stylelint` installation when present.

For Vue SFCs, the rule lints each `<style>` block separately, preserves
block-specific context such as `scoped`, `module`, and `lang`, and maps the
reported locations back to the original `.vue` file.

Also add a `stylelint` option to `@icebreakers/eslint-config` so consumers can
opt into the bridge directly from the preset.
