# @icebreakers/stylelint-config

- [简体中文指南](./README.zh.md)

## Overview

`@icebreakers/stylelint-config` bundles a Stylelint preset for Vue + SCSS stacks and ships a CLI helper that bootstraps editor settings. It layers sensible defaults (unit allowlists, UnoCSS/Tailwind at-rule ignores, and a built-in Tailwind utility selector ban) on top of the upstream recommended configs, while still letting you toggle specific bundles or append extra rules.

## Requirements

- Node.js 18+
- Stylelint 16 (flat-compatible configuration)

## Installation

```bash
pnpm add -D stylelint @icebreakers/stylelint-config
```

For new projects you can scaffold the VS Code integration:

```bash
npx @icebreakers/stylelint-config
```

The CLI will create or update `.vscode/settings.json` with the proper `stylelint.validate` entries so editor diagnostics use Stylelint instead of language servers.

## Basic Usage

```ts
// stylelint.config.ts
import { icebreaker } from '@icebreakers/stylelint-config'

export default icebreaker()
```

`icebreaker()` returns the default preset and merges any additional Stylelint config you pass in.

## Advanced Configuration

Use `createStylelintConfig` for fine-grained control over preset toggles, ignore lists, and rule overrides:

```ts
import { createStylelintConfig } from '@icebreakers/stylelint-config'

export default createStylelintConfig({
  presets: {
    vue: false, // disable Vue rules for pure SCSS projects
  },
  ignores: {
    units: ['upx'], // replace default list
    addAtRules: ['tailwind'],
  },
  extends: [
    '@acme/stylelint-config',
  ],
  overrides: [
    {
      files: ['**/*.html'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'color-hex-length': 'long',
  },
})
```

### Option Reference

- `presets.scss` – include `stylelint-config-standard-scss` (default `true`)
- `presets.vue` – include `stylelint-config-recommended-vue/scss` (default `true`)
- `presets.order` – include `stylelint-config-recess-order` (default `true`)
- `ignores.*` – replace the default ignore lists (units, selector types, at-rules)
- `ignores.add*` – append to the default ignore allowlists
- `extends` – append additional Stylelint configs after the presets
- `overrides` – pass file-specific overrides (e.g. custom syntax)
- `rules` – merge extra Stylelint rules

Defaults include:

- Allowing BEM/OOCSS class selectors (e.g. `block__element--modifier`, `object--state`)
- Allowing the `rpx` unit for mini-program compatibility
- Ignoring Tailwind/UnoCSS style at-rules (`apply`, `screen`, etc.)
- Disallowing authored Tailwind utility selectors such as `.flex` or `.hover\:bg-red-500`
- Ignoring the `page` selector used by various platforms

## Tailwind Utility Selector Guard

This preset enables `stylelint-plugin-tailwindcss` by default with:

```txt
tailwindcss/no-atomic-class
tailwindcss/no-invalid-apply
tailwindcss/no-apply
tailwindcss/no-arbitrary-value
```

These rules:

- report Tailwind utility selectors declared in authored stylesheets while still allowing semantic selectors such as BEM/OOCSS class names
- report invalid utility-like `@apply` candidates
- disallow `@apply` entirely
- disallow arbitrary values / arbitrary properties such as `w-[10px]` and `[mask-type:luminance]`

The underlying plugin supports both Tailwind CSS v3 and v4, and switches automatically based on the installed `tailwindcss` major version in the consuming project.

## Recommended Scripts

- `pnpm --filter @icebreakers/stylelint-config build` to produce the distributable `dist/` bundle.
- `pnpm --filter @app lint:styles` running `stylelint "src/**/*.{css,scss,vue}" --fix`.

## Troubleshooting

- Tailwind directives require `postcss.config.*` to include `@icebreakers/stylelint-config` ignore lists; adjust `ignores.addAtRules` when adding new utilities.
- If Stylelint cannot resolve the preset, ensure your workspace hoists the package or add it to the specific package `devDependencies`.
- Use the generated VS Code settings to avoid duplicate diagnostics from the built-in CSS validation.
