# eslint-plugin-better-stylelint

## 0.1.2

### Patch Changes

- 🐛 **Fix the source-mode Stylelint worker bootstrap on Windows so Node.js 20 can** [`455b711`](https://github.com/sonofmagic/dev-configs/commit/455b711a080cbfd19dd4b56db1edae5d5197b143) by @sonofmagic
  - start the TypeScript worker through the `tsx` ESM loader using a `file://`
  - entry URL.

- 🐛 **Fix the Stylelint worker bootstrap in source-mode test runs so Node.js 20 can** [`eeb599d`](https://github.com/sonofmagic/dev-configs/commit/eeb599d1d372bce17149ff7d77c8923d2b7d7d9f) by @sonofmagic
  - execute the TypeScript worker through the `tsx` ESM loader instead of failing on
  - the raw `.ts` entry file.

## 0.1.1

### Patch Changes

- 🐛 **Make the ESLint Stylelint bridge configurable without coupling the bridge plugin** [`e20b401`](https://github.com/sonofmagic/dev-configs/commit/e20b40187b9a3f9a1d737e94d9361469394827d9) by @sonofmagic
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

- 🐛 **upgrade stylelint to 17.5.0** [`2111052`](https://github.com/sonofmagic/dev-configs/commit/2111052299626ee456f9a0ca897e764d81f2ec99) by @sonofmagic

## 0.1.0

### Minor Changes

- ✨ **Add a new `eslint-plugin-better-stylelint` package that bridges Stylelint** [`1568782`](https://github.com/sonofmagic/dev-configs/commit/15687824f2f0d8004da1d6d035dc96e370c639c1) by @sonofmagic
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
