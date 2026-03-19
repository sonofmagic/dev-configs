# stylelint-plugin-tailwindcss

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

### Minor Changes

- ✨ **Split the utility-first rules into `tailwindcss/*` and `unocss/*`** [`8730574`](https://github.com/sonofmagic/dev-configs/commit/8730574b5399eb4c06908192ad279293592fe52f) by @sonofmagic
  namespaces.

  Default `base` and `recommended` configs now enable both namespaces,
  while still allowing each rule to be disabled independently.

  Add explicit single-namespace exports for consumers that want one side
  only, including:
  - `tailwindBase`
  - `tailwindRecommended`
  - `unocssBase`
  - `unocssRecommended`
  - `unocssNoAtomicClassPlugin`
  - `unocssNoInvalidApplyPlugin`
  - `unocssNoApplyPlugin`
  - `unocssNoArbitraryValuePlugin`

  Also add the matching `UNOCSS_NO_*` rule-name exports and document how
  to disable either namespace or individual rules one by one.

  Update `@icebreakers/stylelint-config` so its default preset enables
  both the `tailwindcss/*` and `unocss/*` rule sets, and add matching
  mock demo files that isolate each namespace in the IDE.

- ✨ **Refine the utility-policy preset layering for Stylelint packages.** [`7474460`](https://github.com/sonofmagic/dev-configs/commit/7474460f247f773adcee7f580932ba7ed678c63e) by @sonofmagic
  For `stylelint-plugin-tailwindcss`:
  - clarify the built-in `base` and `recommended` tiers
  - add `strict`, `tailwindStrict`, and `unocssStrict`
  - refresh rule docs and README guidance for the new preset boundaries
  - expand the UnoCSS demo examples to show what `unocss/no-invalid-apply`
    reports and what it intentionally ignores

  For `@icebreakers/stylelint-config`:
  - change the default bundled utility-policy layer to the plugin package's
    `base` preset
  - add `tailwindcssPreset: 'base' | 'recommended' | 'strict'`
  - document how to opt into the broader `recommended` layer or the stricter
    architecture-oriented Tailwind layer

### Patch Changes

- 📦 **Dependencies** [`14fc833`](https://github.com/sonofmagic/dev-configs/commit/14fc833fb2d801b87313eae1e1340375f510d8da)
  → `postcss-tailwindcss@1.0.0`

## Next

### Patch Changes

- 🐛 **Split the built-in presets into clearer policy tiers and add `strict`, `tailwindStrict`, and `unocssStrict`.**
  - Keep `base` focused on utility selector and invalid `@apply` checks.
  - Keep `recommended` as the lower-noise general-purpose layer.
  - Add `strict` for the more architecture-oriented Tailwind rules, including `no-theme-function`, `no-screen-directive`, `no-tailwind-directive`, `no-import-directive`, and `no-css-layer`.
  - Refresh the package docs, rule docs, and demo examples to explain the new preset boundaries, especially around `unocss/no-invalid-apply`.

## 0.0.3

### Patch Changes

- 🐛 **Disallow more UnoCSS-style arbitrary value selectors and candidates in the built-in Tailwind utility rules, including bare values such as `w-10px`, `top--10px`, `bg-$brand`, and `[&>*]:w-10px`.** [`5f7f93e`](https://github.com/sonofmagic/dev-configs/commit/5f7f93eb3ba030f61e055a11241bbe7326509857) by @sonofmagic

## 0.0.2

### Patch Changes

- 📦 **Dependencies** [`1823e9c`](https://github.com/sonofmagic/dev-configs/commit/1823e9c51aec4aaccaa03697267e67c16d27be71)
  → `postcss-tailwindcss@0.0.2`

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

- 🐛 **Add a dedicated Stylelint plugin that blocks authored Tailwind utility selectors** [`7045cc1`](https://github.com/sonofmagic/dev-configs/commit/7045cc1742e8a9101fe2a567f96356482ce7b186) by @sonofmagic
  - and enable it by default in `@icebreakers/stylelint-config`.
  - The new plugin supports both Tailwind CSS v3 and v4 projects by detecting the
  - installed major version at runtime.
- 📦 **Dependencies** [`3847047`](https://github.com/sonofmagic/dev-configs/commit/38470476b5ceb034bd6661f653a8f9a889f660ea)
  → `postcss-tailwindcss@0.0.1`
