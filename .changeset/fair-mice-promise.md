---
'@icebreakers/eslint-config': patch
'eslint-plugin-better-stylelint': patch
---

Make the ESLint Stylelint bridge configurable without coupling the bridge plugin
to the bundled Icebreaker preset.

For `@icebreakers/eslint-config`:

- bundle the Stylelint bridge and `@icebreakers/stylelint-config` by default
- keep `stylelint` disabled by default
- allow inline Stylelint preset options inside `eslint.config.js`
- expose an internal `./stylelint` loader entry used by the bridge

For `eslint-plugin-better-stylelint`:

- accept external `configLoader` and `configOptions` instead of importing the
  Icebreaker Stylelint preset directly
- run Stylelint in a short-lived sync subprocess to avoid lingering test
  handles and worker lifecycle issues
