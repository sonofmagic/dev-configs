---
"@icebreakers/eslint-config": patch
---

fix: register `parserPlain` for Vue `<style>` virtual files when `formatters: false`

When `formatters: false`, `eslint-processor-vue-blocks` still extracts `<style>` blocks as virtual `.css` files, but no parser was registered for them — causing `Parsing error: Unexpected token .`. Now `parserPlain` is always registered for `**/*.vue/*.css` (and scss/less/postcss) whenever `vue` is enabled, regardless of the `formatters` setting.

Also re-exports `parserPlain` from the package entry so users can import it directly.
