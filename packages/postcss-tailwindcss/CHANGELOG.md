# postcss-tailwindcss

## 2.0.1

### Patch Changes

- 🐛 **deps: upgrade** [`70dc018`](https://github.com/sonofmagic/dev-configs/commit/70dc01865748ba0aa9ec558e0ea11821e7f2f6cd) by @sonofmagic

## 2.0.0

### Major Changes

- 🚀 **Raise the minimum supported Node.js versions to `^20.19.0 || >=22.12.0`** [`92b869f`](https://github.com/sonofmagic/dev-configs/commit/92b869fb95ad99a1c7f5f970c675cfa79b8b9a31) by @sonofmagic
  - across all published packages so the supported runtime range matches the
  - default `require(esm)` behavior.
  - Also fix `@icebreakers/eslint-config` so ESLint config loading works on
  - Node.js `20.19.0` by polyfilling `Object.groupBy` when the runtime does not
  - provide it yet. This unblocks `pnpm lint` and test execution for the Node 20
  - CI job.

## 1.0.1

### Patch Changes

- 🐛 **Update package dependencies to latest compatible versions.** [`5cca66e`](https://github.com/sonofmagic/dev-configs/commit/5cca66e5245a59cb11bbc6dbaefd87315f801397) by @sonofmagic

## 1.0.0

### Major Changes

- 🚀 **Expand the Tailwind and utility-first analysis surface with new theme and** [`14fc833`](https://github.com/sonofmagic/dev-configs/commit/14fc833fb2d801b87313eae1e1340375f510d8da) by @sonofmagic
  directive policy support.

  For `stylelint-plugin-tailwindcss`, this release adds new exported rules and
  recommended defaults for:
  - `tailwindcss/no-theme-function`
  - `tailwindcss/no-invalid-theme-function`
  - `tailwindcss/no-screen-directive`
  - `tailwindcss/no-css-layer`
  - `unocss/no-variant-group`

  This is marked as a major release because the default `recommended`
  configuration now enables additional rules beyond the previous set.

  For `postcss-tailwindcss`, this release is marked major to align with the new
  theme and directive analysis expectations consumed by downstream tooling.

## 0.0.2

### Patch Changes

- 🐛 **deps: upgrade** [`1823e9c`](https://github.com/sonofmagic/dev-configs/commit/1823e9c51aec4aaccaa03697267e67c16d27be71) by @sonofmagic

## 0.0.1

### Patch Changes

- 🐛 **Add Tailwind CSS analysis utility packages for PostCSS AST and Lightning CSS AST.** [`3847047`](https://github.com/sonofmagic/dev-configs/commit/38470476b5ceb034bd6661f653a8f9a889f660ea) by @sonofmagic
  - Update `stylelint-plugin-tailwindcss` to reuse the PostCSS-based selector collection helpers.

- 🐛 **Refine Tailwind runtime resolution to use lightweight tsconfig path matching** [`2db073b`](https://github.com/sonofmagic/dev-configs/commit/2db073ba0ee118e72cd8a726930e91d75ec1fb9c) by @sonofmagic
  - via `get-tsconfig` instead of `tsconfig-paths-webpack-plugin`.
  - Update `stylelint-plugin-tailwindcss` to resolve Tailwind CSS from the
  - consumer project at runtime, instead of bundling version-specific Tailwind
  - implementations inside the plugin package.

- 🐛 **Migrate all packages under `packages/` to build with `tsdown`.** [`45c73ca`](https://github.com/sonofmagic/dev-configs/commit/45c73ca9f70ba813052c9970b54e08d853e638ce) by @sonofmagic
  - This removes the remaining `tsup` and `unbuild` package-level build configs,
  - switches package scripts to `tsdown`, and keeps the package outputs aligned with
  - the existing published entry points.
