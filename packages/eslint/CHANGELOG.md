# @icebreakers/eslint-config

## 4.0.1

### Patch Changes

- 🐛 **lint: shift style formatting ownership to stylelint** [`4b14479`](https://github.com/sonofmagic/dev-configs/commit/4b1447914aa34716d5ddf34af02622c170b8150e) by @sonofmagic
  - stop enabling CSS-family formatter rules by default in `@icebreakers/eslint-config`
  - document separate ESLint and Stylelint fix flows for consumers
  - add a safe fix-oriented formatting preset to `@icebreakers/stylelint-config`

- 🐛 **eslint: add optional oxfmt formatter overrides for css, html, markdown, and graphql** [`d9cf42b`](https://github.com/sonofmagic/dev-configs/commit/d9cf42b907bc5e2ffe71c04303375b64952be2b1) by @sonofmagic

- 🐛 **eslint: add unocss wrapper config support** [#258](https://github.com/sonofmagic/dev-configs/pull/258) by @daguanren21

- 🐛 **eslint: default css, html, and graphql formatters to oxfmt** [`649d918`](https://github.com/sonofmagic/dev-configs/commit/649d9187a395cc8c330067bf9450293c1cb04b9e) by @sonofmagic
- 📦 **Dependencies** [`4b14479`](https://github.com/sonofmagic/dev-configs/commit/4b1447914aa34716d5ddf34af02622c170b8150e)
  → `@icebreakers/stylelint-config@3.0.1`

## 4.0.0

### Major Changes

- 🚀 **Raise the minimum supported Node.js versions to `^20.19.0 || >=22.12.0`** [`92b869f`](https://github.com/sonofmagic/dev-configs/commit/92b869fb95ad99a1c7f5f970c675cfa79b8b9a31) by @sonofmagic
  - across all published packages so the supported runtime range matches the
  - default `require(esm)` behavior.
  - Also fix `@icebreakers/eslint-config` so ESLint config loading works on
  - Node.js `20.19.0` by polyfilling `Object.groupBy` when the runtime does not
  - provide it yet. This unblocks `pnpm lint` and test execution for the Node 20
  - CI job.

### Patch Changes

- 📦 **Dependencies** [`92b869f`](https://github.com/sonofmagic/dev-configs/commit/92b869fb95ad99a1c7f5f970c675cfa79b8b9a31)
  → `@icebreakers/stylelint-config@3.0.0`, `eslint-plugin-better-stylelint@1.0.0`

## 3.0.1

### Patch Changes

- 🐛 **Fix flat config user `ignores` handling in `icebreaker(...)` so global ignore** [`2fff479`](https://github.com/sonofmagic/dev-configs/commit/2fff4791c1c19c9bbd3ef0032345807bed4bcc8d) by @sonofmagic
  - patterns are emitted as a top-level ignore config item and work with
  - `eslint .`.
  - Keep scoped `files` + `ignores` user config semantics unchanged, and add
  - regression coverage for global ignores, scoped ignores, and passthrough flat
  - config fields such as `languageOptions` and `linterOptions`.

## 3.0.0

### Major Changes

- 🚀 **Raise the supported Node.js baseline for `@icebreakers/eslint-config` to Node.js** [`fdc18ad`](https://github.com/sonofmagic/dev-configs/commit/fdc18ad209e1f4d49101765a2fae5bc3ca290572) by @sonofmagic
  - 22 and newer.
  - Node.js 20 support is no longer treated as complete because the preset now
  - depends on packages whose published engine ranges exclude Node.js 20.

### Patch Changes

- 🐛 **Allow `axios` and `lint-staged` in the `e18e/ban-dependencies` rule defaults so** [`035b992`](https://github.com/sonofmagic/dev-configs/commit/035b9920a15c98ccf47f30b999a9c46b9ae96898) by @sonofmagic
  - the preset does not warn on those packages.
- 📦 **Dependencies** [`69db5c8`](https://github.com/sonofmagic/dev-configs/commit/69db5c87a842d26cedac9256000afa24f8711bc4)
  → `eslint-plugin-better-stylelint@0.1.3`

## 2.1.2

### Patch Changes

- 🐛 **Bundle the React ESLint plugins into `@icebreakers/eslint-config`, align** [`243c5bd`](https://github.com/sonofmagic/dev-configs/commit/243c5bda0c7ea41030e0ba3c5552649bbb951af9) by @sonofmagic
  - `@eslint-react/eslint-plugin` with the peer range required by
  - `@antfu/eslint-config`, and harden optional package detection for packages
  - without a root export entry.
  - Add regression coverage to verify bundled React plugin peer compatibility and
  - consumer-side `react` preset resolution.
- 📦 **Dependencies** [`455b711`](https://github.com/sonofmagic/dev-configs/commit/455b711a080cbfd19dd4b56db1edae5d5197b143)
  → `eslint-plugin-better-stylelint@0.1.2`

## 2.1.1

### Patch Changes

- 🐛 **Make React, Next, and TanStack Query ESLint plugins optional so the preset can still resolve in Node 20 environments when those plugins are not installed. Also fix the bundled Stylelint config typings so package typecheck passes again.** [`fc8b49d`](https://github.com/sonofmagic/dev-configs/commit/fc8b49dfcf010c3351730301dfc31c9b786dfca4) by @sonofmagic
- 📦 **Dependencies** [`fc8b49d`](https://github.com/sonofmagic/dev-configs/commit/fc8b49dfcf010c3351730301dfc31c9b786dfca4)
  → `@icebreakers/stylelint-config@2.2.1`

## 2.1.0

### Minor Changes

- ✨ **Add first-class Mini Program presets for ESLint and Stylelint.** [`58fb7d2`](https://github.com/sonofmagic/dev-configs/commit/58fb7d20acc9c196432523a48c7571b4ddccd912) by @sonofmagic
  - For `@icebreakers/eslint-config`, this introduces the recommended `miniProgram: true`
  - option, keeps `weapp` as a backwards-compatible alias, injects common Mini Program
  - globals, ignores common Mini Program build/config outputs, and improves Vue SFC
  - compatibility for Mini Program templates.
  - For `@icebreakers/stylelint-config`, this introduces `miniProgram: true` support,
  - adds default ignore paths for Mini Program build outputs, and documents the minimal
  - setup for native Mini Program and `weapp-vite` / `wevu` templates.

### Patch Changes

- 📦 **Dependencies** [`58fb7d2`](https://github.com/sonofmagic/dev-configs/commit/58fb7d20acc9c196432523a48c7571b4ddccd912)
  → `@icebreakers/stylelint-config@2.2.0`

## 2.0.3

### Patch Changes

- 🐛 **Update package dependencies to latest compatible versions.** [`5cca66e`](https://github.com/sonofmagic/dev-configs/commit/5cca66e5245a59cb11bbc6dbaefd87315f801397) by @sonofmagic
- 📦 **Dependencies**
  → `@icebreakers/stylelint-config@2.1.2`

## 2.0.2

### Patch Changes

- 🐛 **Export explicit public config result types for the `icebreaker` factory helpers.** [`7cc614e`](https://github.com/sonofmagic/dev-configs/commit/7cc614ef85ca028297673da1d8c333c4d8b4bbbf) by @sonofmagic
  - Also expose the Stylelint config input types from the package entry so consumers
  - can reference both input and output config types directly.
- 📦 **Dependencies** [`7cc614e`](https://github.com/sonofmagic/dev-configs/commit/7cc614ef85ca028297673da1d8c333c4d8b4bbbf)
  → `@icebreakers/stylelint-config@2.1.1`

## 2.0.1

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

- 📦 **Dependencies** [`e20b401`](https://github.com/sonofmagic/dev-configs/commit/e20b40187b9a3f9a1d737e94d9361469394827d9)
  → `eslint-plugin-better-stylelint@0.1.1`

## 2.0.0

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

### Patch Changes

- 📦 **Dependencies** [`1568782`](https://github.com/sonofmagic/dev-configs/commit/15687824f2f0d8004da1d6d035dc96e370c639c1)
  → `eslint-plugin-better-stylelint@0.1.0`

## 1.6.33

### Patch Changes

- 🐛 **Limit the `style/eol-last` relaxation to style and JSON files only, while keeping the rule enabled for script files.** [`71c03be`](https://github.com/sonofmagic/dev-configs/commit/71c03bedeb260e111f55bd1b0818c3f17c2ed19f) by @sonofmagic

## 1.6.32

### Patch Changes

- 🐛 **Fix editor linting conflicts between ESLint and Stylelint for CSS-like files by removing style languages from generated VS Code ESLint validation settings, and disable the noisy `style/eol-last` ESLint rule in the base preset.** [`546a350`](https://github.com/sonofmagic/dev-configs/commit/546a350daee9d73aa364fd09de5857bb06e5c07d) by @sonofmagic

## 1.6.31

### Patch Changes

- 🐛 **deps: upgrade** [`1823e9c`](https://github.com/sonofmagic/dev-configs/commit/1823e9c51aec4aaccaa03697267e67c16d27be71) by @sonofmagic

## 1.6.30

### Patch Changes

- 🐛 **Migrate all packages under `packages/` to build with `tsdown`.** [`45c73ca`](https://github.com/sonofmagic/dev-configs/commit/45c73ca9f70ba813052c9970b54e08d853e638ce) by @sonofmagic
  - This removes the remaining `tsup` and `unbuild` package-level build configs,
  - switches package scripts to `tsdown`, and keeps the package outputs aligned with
  - the existing published entry points.

## 1.6.29

### Patch Changes

- 🐛 **deps: upgrade** [`1b31de1`](https://github.com/sonofmagic/dev-configs/commit/1b31de128dc43fbfcd0f30112d2025fc02029987) by @sonofmagic

## 1.6.28

### Patch Changes

- 🐛 **🐛 Disable `e18e/prefer-array-to-sorted` rule to avoid false positives on non-array iterables (`Set`, `Map`).** [`264aafa`](https://github.com/sonofmagic/dev-configs/commit/264aafae6c15568cb516ae666f3541f688abb6d8) by @sonofmagic

## 1.6.27

### Patch Changes

- 🐛 **Fix formatter option merging so custom `formatters.prettierOptions` no longer disables the default CSS, SCSS, LESS, HTML, Markdown, and GraphQL formatters.** [`189e0af`](https://github.com/sonofmagic/dev-configs/commit/189e0afab5f26bb84e60240933d382c9a490d018) by @sonofmagic
  - Infer formatter `prettierOptions.endOfLine` from repository `.editorconfig` when `end_of_line` is configured, while keeping explicit user settings unchanged.

## 1.6.26

### Patch Changes

- 🐛 **Lower `e18e/ban-dependencies` from error to warning in the base ESLint preset.** [`c4a6d5c`](https://github.com/sonofmagic/dev-configs/commit/c4a6d5ca07d32e0e98c28ac391778ccb3cbedf7e) by @sonofmagic

## 1.6.25

### Patch Changes

- 🐛 **deps: upgrade** [`3c09a04`](https://github.com/sonofmagic/dev-configs/commit/3c09a04e96183282fd51f7ec710df661740928f9) by @sonofmagic

## 1.6.24

### Patch Changes

- 🐛 **bump package dependencies for changelog, commitlint, eslint, and stylelint configs.** [`0554cd5`](https://github.com/sonofmagic/dev-configs/commit/0554cd5b3dc3c02e965d579083e7df3f15399332) by @sonofmagic

## 1.6.23

### Patch Changes

- 🐛 **Add a YAML lint fixture in `demos/input` to verify YAML parsing and rule checks with ESLint (using `--no-ignore` for the ignored demos path).** [`8e7201e`](https://github.com/sonofmagic/dev-configs/commit/8e7201eccbed04f1124ec6ab901d818415647863) by @sonofmagic

## 1.6.22

### Patch Changes

- 🐛 **deps: upgrade** [`64b1558`](https://github.com/sonofmagic/dev-configs/commit/64b15581c9294e97a97f76e606b6b146daee4949) by @sonofmagic

## 1.6.21

### Patch Changes

- 🐛 **deps: upgrade** [`3a9b9fe`](https://github.com/sonofmagic/dev-configs/commit/3a9b9fefcae6e9775ea3c87ad48d42a7fadf8727) by @sonofmagic

## 1.6.20

### Patch Changes

- 🐛 **upgrade** [`94a5a87`](https://github.com/sonofmagic/dev-configs/commit/94a5a87e3f0dc6876b0baa614aec1d71aacca2bb) by @sonofmagic

- 🐛 **Disable core `dot-notation` in the base preset to avoid conflicts with TypeScript `noPropertyAccessFromIndexSignature` (`ts(4111)`) when bracket notation is required for index-signature properties.** [`94a5a87`](https://github.com/sonofmagic/dev-configs/commit/94a5a87e3f0dc6876b0baa614aec1d71aacca2bb) by @sonofmagic

## 1.6.19

### Patch Changes

- 🐛 **deps: upgrade** [`05c6690`](https://github.com/sonofmagic/dev-configs/commit/05c6690ea607f1d3300ea524397f0626d31e9101) by @sonofmagic

## 1.6.18

### Patch Changes

- 🐛 **chore(deps): upgrade** [`2ab5b70`](https://github.com/sonofmagic/dev-configs/commit/2ab5b706fd41b17752ed8a013a242a70e6d97e39) by @sonofmagic

## 1.6.17

### Patch Changes

- 🐛 **chore(deps): upgrade** [`c3c641e`](https://github.com/sonofmagic/dev-configs/commit/c3c641e119faf2e0d0ffa64cd8610cf17eed9952) by @sonofmagic

## 1.6.16

### Patch Changes

- 🐛 **chore(deps): upgrade** [`bc9c23f`](https://github.com/sonofmagic/dev-configs/commit/bc9c23f87bde886a20c6b01c2d880fe6a4fde806) by @sonofmagic

## 1.6.15

### Patch Changes

- 🐛 **Update @antfu/eslint-config to 7.2.0.** [`227a310`](https://github.com/sonofmagic/dev-configs/commit/227a3100526300876c7c0b44810d04a69a4e2860) by @sonofmagic

## 1.6.14

### Patch Changes

- 🐛 **Improve eslint config option handling and unit coverage.** [`c0e39e3`](https://github.com/sonofmagic/dev-configs/commit/c0e39e3e5c813d7214fd106dabb4818f772a0bd4) by @sonofmagic
  - Harden stylelint preset resolution for ESM-only configs.

## 1.6.13

### Patch Changes

- 🐛 **chore(deps): upgrade** [`f1dabc9`](https://github.com/sonofmagic/dev-configs/commit/f1dabc9c29bb0decfb7e1ff4035ad9ad58ef590f) by @sonofmagic

## 1.6.12

### Patch Changes

- 🐛 **chore: upgrade** [`461103c`](https://github.com/sonofmagic/dev-configs/commit/461103ce0671ea6fdae12b065c218ae0a4d7e4e5) by @sonofmagic

## 1.6.11

### Patch Changes

- 🐛 **chore(deps): upgrade** [`271dc88`](https://github.com/sonofmagic/dev-configs/commit/271dc88cbb544070431d58397796b7daccef7dae) by @sonofmagic

## 1.6.10

### Patch Changes

- 🐛 **Fix deterministic preset resolution in pnpm monorepos** [`bb9cbce`](https://github.com/sonofmagic/dev-configs/commit/bb9cbce84c2980c7545c2dfcfe391be8a9f48299) by @sonofmagic
  - Resolve `eslint` + `@eslint/js` version drift when using pnpm workspaces
  - Ensure optional peers (ex: `@typescript-eslint/*`) fail softly when absent
  - Clarify flat-config layering: `languageOptions`, `plugins`, `rules`, `settings`
  - Document import surface: `@icebreakers/eslint-config` and `@icebreakers/eslint-config/preset`
  - See [preset docs](https://github.com/sonofmagic/dev-configs/tree/main/packages/eslint) for migration notes and examples

## 1.6.9

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`b10f8bd`](https://github.com/sonofmagic/dev-configs/commit/b10f8bd4d576295011e8e440b79da28b7b346d1d) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.8

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`f4f7a44`](https://github.com/sonofmagic/dev-configs/commit/f4f7a4442b346b030224a31fffc9a35708f1d9e0) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.7

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`65e9e74`](https://github.com/sonofmagic/dev-configs/commit/65e9e741315315c180e11ea51f9f2a6573d010ea) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.6

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`bf471f9`](https://github.com/sonofmagic/dev-configs/commit/bf471f9ba57e099567b3ad14c887881c7ced1ecc) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.5

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`a7cc796`](https://github.com/sonofmagic/dev-configs/commit/a7cc796869b27cd980585eaccc979081513a0f92) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.4

### Patch Changes

- 🐛 **Remove the opt-out for better-tailwindcss unregistered class checks and keep pnpm integration disabled by default.** — [`a870144`](https://github.com/sonofmagic/dev-configs/commit/a870144d5f141e55d85e4e7e546884459f58c387) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.3

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`97c2c01`](https://github.com/sonofmagic/dev-configs/commit/97c2c01f2c9d273097d180576a0b0c389a530aa7) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

- 🐛 **默认关闭 better-tailwindcss/no-unregistered-classes，并同步修正相关类型定义。** — [`6c6d6c1`](https://github.com/sonofmagic/dev-configs/commit/6c6d6c137eb131d87a6d5ed247b09db3f27cf04d) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.2

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`efd6a5b`](https://github.com/sonofmagic/dev-configs/commit/efd6a5b540f21ace0409fb602d37f6aa672aafa5) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.1

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`a24c546`](https://github.com/sonofmagic/dev-configs/commit/a24c546f6e01352b09fb5b219b7b867b22a96da3) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.6.0

### Minor Changes

- ✨ **Add a `query` option to turn on the TanStack Query flat preset only when requested.** — [`485de0e`](https://github.com/sonofmagic/dev-configs/commit/485de0e32d0ad03c99b4859521f8d3870a7f445f) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Minor release

## 1.5.10

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`baafc8c`](https://github.com/sonofmagic/dev-configs/commit/baafc8cacc4ece4070429eaa55dd7264d276205c) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.9

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`4ce36ce`](https://github.com/sonofmagic/dev-configs/commit/4ce36cec792ba317955087c32d95e338e4d7fe24) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.8

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`ec47a2f`](https://github.com/sonofmagic/dev-configs/commit/ec47a2f67c1e4dea4d71bb9e4f88e7e8036d390c) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.7

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`149b11e`](https://github.com/sonofmagic/dev-configs/commit/149b11ef108528be84e9afdd5695d53ab849c6ef) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.6

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`aa8958e`](https://github.com/sonofmagic/dev-configs/commit/aa8958eedaa80ab81ed6463e04f180b0df76fe82) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.5

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`31b9df5`](https://github.com/sonofmagic/dev-configs/commit/31b9df5f2a3d6189d81cc6442f5c01cd382d3a04) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.4

### Patch Changes

- 🐛 **Enhance the NestJS preset by inlining best-practice TypeScript relaxations (decorated empty constructors, DI parameter properties, ambient declaration merging) and expose dedicated documentation covering the improved workflow.** — [`296f575`](https://github.com/sonofmagic/dev-configs/commit/296f575a5c388baa7ab4287acff3763f77508e57) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.3

### Patch Changes

- 🐛 **docs: reflow package READMEs for better rendering** — [`44d4b37`](https://github.com/sonofmagic/dev-configs/commit/44d4b37a47e0a0c327fedce97d3d04ce36425a87) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

- 🐛 **chore(deps): upgrade** — [`d6e6a5b`](https://github.com/sonofmagic/dev-configs/commit/d6e6a5bd8c3fd0c593dfe3c16402c4e254ee979a) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 1.5.2

### Patch Changes

- [`4f717f5`](https://github.com/sonofmagic/dev-configs/commit/4f717f5353f11f72853936045fde8ae546a2b9ea) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: upgrade @antfu/eslint-config to 6.0.0

## 1.5.1

### Patch Changes

- [`d6f5d2c`](https://github.com/sonofmagic/dev-configs/commit/d6f5d2c167ea65577714ab1c5f45fa82a577efe3) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: "eslint-plugin-react-hooks": "^7.0.0"

## 1.5.0

### Minor Changes

- [`ce5ac2d`](https://github.com/sonofmagic/dev-configs/commit/ce5ac2d46badac3943aad225f02d32628c5d362b) Thanks [@sonofmagic](https://github.com/sonofmagic)! - - 重构选项解析为独立模块，确保 Vue/TypeScript 默认和 Tailwind、MDX、无障碍插件按需加载
  - 新增 `TailwindcssOption` 类型导出，明确 v3/v4 配置入口字段
  - 更新 README，说明如何组合可选预设并扩展 @antfu/eslint-config 配置

## 1.4.6

### Patch Changes

- [`5054a5f`](https://github.com/sonofmagic/dev-configs/commit/5054a5fddcffcfa2c3961bdefb5f0f68d4050077) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.5

### Patch Changes

- [`c201d06`](https://github.com/sonofmagic/dev-configs/commit/c201d06b9e4d001c083f71c7b3819b61219a106c) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.4

### Patch Changes

- [`ac3f818`](https://github.com/sonofmagic/dev-configs/commit/ac3f81863c89583556e25448dfe26fce68d6ccda) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.3

### Patch Changes

- [`5889f23`](https://github.com/sonofmagic/dev-configs/commit/5889f234adee6f2fa8365e2be65a7a1c0c659605) Thanks [@sonofmagic](https://github.com/sonofmagic)! - <br/>

  chore(deps): upgrade

## 1.4.2

### Patch Changes

- [`ff56985`](https://github.com/sonofmagic/dev-configs/commit/ff5698537710eb3faedbdf6902d47b50f8243cd0) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.1

### Patch Changes

- [`324a269`](https://github.com/sonofmagic/dev-configs/commit/324a269f66aba1a8c3a6243a8d77900792508ba8) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.4.0

### Minor Changes

- [`c4a1e7f`](https://github.com/sonofmagic/dev-configs/commit/c4a1e7f7511a16d76a507711adf040a41029d063) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: 添加 `eslint-plugin-better-tailwindcss` 支持

  chore: 重命名 `nest` 到 `nestjs`

## 1.3.6

### Patch Changes

- [`114949c`](https://github.com/sonofmagic/dev-configs/commit/114949c4212d3094dab363617b58cc755ff018d2) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: add vitest rules overrides

## 1.3.5

### Patch Changes

- [`fbe27c8`](https://github.com/sonofmagic/dev-configs/commit/fbe27c8389963d3e19637f6c606a0002c642d246) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.3.4

### Patch Changes

- [`a939a06`](https://github.com/sonofmagic/dev-configs/commit/a939a06c16c831fe56f1ebf46da6421e6ab56ba1) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.3.3

### Patch Changes

- [`8d77e2b`](https://github.com/sonofmagic/dev-configs/commit/8d77e2bb1f0b4fd9b8c608f668875e4e26726adf) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.3.2

### Patch Changes

- [`0bd9ead`](https://github.com/sonofmagic/dev-configs/commit/0bd9ead88b56c11b6dc5c20c7fd9e5fffb4c355d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.3.1

### Patch Changes

- [`79602a1`](https://github.com/sonofmagic/dev-configs/commit/79602a108d21f449e78756694ab1ab1df1b600c7) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.3.0

### Minor Changes

- [`0bd82f6`](https://github.com/sonofmagic/dev-configs/commit/0bd82f66524c0f7c3d4648ddd2fdf0d70261bbde) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: add nextjs support

## 1.2.5

### Patch Changes

- [`3a18a26`](https://github.com/sonofmagic/dev-configs/commit/3a18a2664504ea523f3ce1fae6534ee6efbfde6f) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.2.4

### Patch Changes

- [`cd0ef9d`](https://github.com/sonofmagic/dev-configs/commit/cd0ef9d8d51979c6c2a337af5e4877b5cddfa5f1) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.2.3

### Patch Changes

- [`ab2b2f8`](https://github.com/sonofmagic/dev-configs/commit/ab2b2f86c9abfcc739bdeff8d3545e1de9c9abdf) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade deps

## 1.2.2

### Patch Changes

- [`d3dbad4`](https://github.com/sonofmagic/dev-configs/commit/d3dbad46db6d3a2a8db252072917dda32aeeef8d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.2.1

### Patch Changes

- [`1dbd303`](https://github.com/sonofmagic/dev-configs/commit/1dbd3034a43b07ed2414aceab65147b85434d320) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade deps

## 1.2.0

### Minor Changes

- [`cd6f624`](https://github.com/sonofmagic/dev-configs/commit/cd6f624b3ab5c572b8147e8332cfd3786e5a74f2) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.1.8

### Patch Changes

- [`fb48f3b`](https://github.com/sonofmagic/dev-configs/commit/fb48f3bae625a2c9a4d1b76118302c51f46a732b) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade eslint config

## 1.1.7

### Patch Changes

- [`84e0907`](https://github.com/sonofmagic/dev-configs/commit/84e0907133d66e497e949276c0c8a65f998feaad) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.1.6

### Patch Changes

- [`258c044`](https://github.com/sonofmagic/dev-configs/commit/258c044cb226b15bf6ad075deeb8d5a01d90f812) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.5

### Patch Changes

- [`52d08d2`](https://github.com/sonofmagic/dev-configs/commit/52d08d24002a4930e24326805def1bcf1caeb042) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.4

### Patch Changes

- [`0db8f3a`](https://github.com/sonofmagic/dev-configs/commit/0db8f3a871ca7efb797ce6dfdf532aef41ff8776) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: bump version

## 1.1.1

### Patch Changes

- [`e92a75b`](https://github.com/sonofmagic/dev-configs/commit/e92a75ba7b292cf94c8c37f4816b3952788f0e0b) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.1.0

### Minor Changes

- [`302c8b5`](https://github.com/sonofmagic/dev-configs/commit/302c8b558649479c259fd0683b2f27f1eebb2d0d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 1.0.0

### Major Changes

- [`a3a085e`](https://github.com/sonofmagic/dev-configs/commit/a3a085e041267b66e6705d9f982bca213df90da4) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: upgrade to latset version

## 0.7.9

### Patch Changes

- [`739a357`](https://github.com/sonofmagic/dev-configs/commit/739a357bce0fce6180c5b6e976003493f50534a4) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 0.7.8

### Patch Changes

- [`2edf063`](https://github.com/sonofmagic/dev-configs/commit/2edf0638a76f589e72388ee28d6cc2d0c8c56815) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 0.7.7

### Patch Changes

- [`b3f296e`](https://github.com/sonofmagic/dev-configs/commit/b3f296e3a9c8f2ad7748a8c4dcc7be889bed10b5) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade deps

## 0.7.6

### Patch Changes

- [`d59c750`](https://github.com/sonofmagic/dev-configs/commit/d59c75001bef52bbf4cfa3c8f128ca91f2b1b67d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 0.7.2

### Patch Changes

- [`2e9b2fe`](https://github.com/sonofmagic/dev-configs/commit/2e9b2fe473de24520f4beee8a399df6676b2c444) Thanks [@sonofmagic](https://github.com/sonofmagic)! - fix: https://github.com/sonofmagic/monorepo-template/issues/110

## 0.7.1

### Patch Changes

- [`a744e70`](https://github.com/sonofmagic/dev-configs/commit/a744e7044258b261c0383fd41e0b9dcb9c50ffdb) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: add ionic and nest support

## 0.7.0

### Minor Changes

- [`084e7aa`](https://github.com/sonofmagic/dev-configs/commit/084e7aa46a05d1726506dec21d2186cc9f45bd2e) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: 移除部分依赖和 mdx / unocss 的直接支持

## 0.7.0-alpha.0

### Minor Changes

- [`084e7aa`](https://github.com/sonofmagic/dev-configs/commit/084e7aa46a05d1726506dec21d2186cc9f45bd2e) Thanks [@sonofmagic](https://github.com/sonofmagic)! - feat: 移除部分依赖和 mdx / unocss 的直接支持

## 0.3.19

### Patch Changes

- [`5525e6a`](https://github.com/sonofmagic/dev-configs/commit/5525e6ae1740b31df78442370db6dce1d21af0a2) Thanks [@sonofmagic](https://github.com/sonofmagic)! - fix vue plugin rules and upgrade deps

## 0.3.18

### Patch Changes

- [`5ba0310`](https://github.com/sonofmagic/dev-configs/commit/5ba0310ee2f915b4721bfd0b43a18c21d9dd2ffa) Thanks [@sonofmagic](https://github.com/sonofmagic)! - upgrade typescript eslint plugin

## 0.3.17

### Patch Changes

- [`7a6a5c5`](https://github.com/sonofmagic/dev-configs/commit/7a6a5c564d5d7fec51161028bcd4b4130818b610) Thanks [@sonofmagic](https://github.com/sonofmagic)! - disabled `unused-imports/no-unused-vars` rule

## 0.3.16

### Patch Changes

- [`048dd98`](https://github.com/sonofmagic/dev-configs/commit/048dd98b66c2fc25cf9cdfa40803dc641c2f19da) Thanks [@sonofmagic](https://github.com/sonofmagic)! - add default vue rule

## 0.3.15

### Patch Changes

- [`18197ba`](https://github.com/sonofmagic/dev-configs/commit/18197baca36d096693efcbd1bd88b67a3a4ab290) Thanks [@sonofmagic](https://github.com/sonofmagic)! - Add `globals` as deps and upgrade `@types/eslint`

## 0.3.14

### Patch Changes

- [`6f68e91`](https://github.com/sonofmagic/dev-configs/commit/6f68e919b2c70e79cb4ab7fc90b3d137a01d010f) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore: upgrade deps

## 0.3.13

### Patch Changes

- [`30dcbeb`](https://github.com/sonofmagic/dev-configs/commit/30dcbebf8e00e4ca70af250b3eeb1070ccb9d43d) Thanks [@sonofmagic](https://github.com/sonofmagic)! - chore(deps): upgrade

## 0.3.12

### Patch Changes

- [`fb7759c`](https://github.com/sonofmagic/dev-configs/commit/fb7759caa20658455ee8b40f0e0cde01d88d3168) Thanks [@sonofmagic](https://github.com/sonofmagic)! - fix: allow ts fn argsIgnorePattern

## 0.3.11

### Patch Changes

- [`aaccc60`](https://github.com/sonofmagic/dev-configs/commit/aaccc60d1fcb298daf04cea582a427c49c9402c1) Thanks [@sonofmagic](https://github.com/sonofmagic)! - 0.4.0
  - add `ally` support
  - fix ts enum error

## 0.3.10

### Patch Changes

- [`4ed5425`](https://github.com/sonofmagic/dev-configs/commit/4ed5425ec145e0f823747598331fc7343c416b4b) Thanks [@sonofmagic](https://github.com/sonofmagic)! - upgrade `@antfu/eslint-config` to `2.21.2`

## 0.3.3

### Patch Changes

- [`8a5a492`](https://github.com/sonofmagic/dev-configs/commit/8a5a4924152aa8bd7e4ea764cc3944603472237c) Thanks [@sonofmagic](https://github.com/sonofmagic)! - fix: eslint mdx plugin register error
