# postcss-tailwindcss

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
