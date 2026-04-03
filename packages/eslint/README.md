# @icebreakers/eslint-config

- [简体中文指南](./README.zh.md)

## Overview

`@icebreakers/eslint-config` extends the `@antfu/eslint-config` flat presets and layers extra rules for Tailwind CSS, MDX, Vue accessibility, and Icebreaker specific TypeScript defaults. It returns a `FlatConfigComposer`, so you can opt into only the presets you need and keep adding workspace specific overrides.

## Requirements

- Node.js 22 or newer
- ESLint 9 with flat config support
- React related plugins are bundled with this package. Next.js, Query, and other ecosystem presets remain optional and are skipped automatically when their plugins are missing.
- Install optional peer plugins when you turn on Tailwind (`eslint-plugin-tailwindcss` or `eslint-plugin-better-tailwindcss`), MDX (`eslint-plugin-mdx`), or UnoCSS (`@unocss/eslint-plugin`)

## Installation

```bash
pnpm add -D eslint @icebreakers/eslint-config
```

## Quick Start

Create `eslint.config.ts` (or `.mjs`) in your project root:

```ts
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker()
```

Run ESLint via your package manager:

```bash
pnpm eslint "src/**/*.ts"
```

If you need the legacy array config, call `icebreakerLegacy()` instead.

## Enabling Presets

Each optional preset mirrors the flags in `@antfu/eslint-config` and adds Icebreaker tweaks:

```ts
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker({
  vue: true, // or { vueVersion: 2 }
  react: true,
  query: true,
  typescript: true,
  test: true,
  tailwindcss: {
    tailwindConfig: './tailwind.config.ts',
  },
  unocss: {
    strict: true,
  },
  mdx: process.env.LINT_MDX === 'true',
  a11y: true,
  nestjs: true,
  ionic: true,
  miniProgram: true,
  formatters: true,
})
```

- `miniProgram` – injects Mini Program globals, ignores common outputs/config files, and enables Vue-side Mini Program compatibility tweaks when `vue` is on.
- `vue` – enables Vue + optionally version specific overrides (Vue 2/3) and ionic/miniProgram adjustments.
- `react` – defers to the upstream React preset and unlocks accessibility helpers when `a11y` is enabled. The required React lint plugins are bundled with this package.
- `query` – toggles the TanStack Query plugin (`@tanstack/eslint-plugin-query`) and its recommended lint rules. Missing plugin installs are treated as a no-op.
- `tailwindcss` – pass `true` to use the built-in Tailwind flat config or provide `{ entryPoint, tailwindConfig }` for Tailwind v4/v3 projects.
- `unocss` – pass `true` to use the upstream Antfu UnoCSS preset, or provide `{ strict, attributify, configPath }` to keep the same preset while using the Icebreaker wrapper API.
- `mdx` – activates MDX linting via `eslint-plugin-mdx`.
- `a11y` – wires in JSX (React) and Vue accessibility plugins. Missing framework-specific plugins are skipped independently.
- `typescript` – extends the TypeScript preset and applies stricter unused diagnostics. Pair with `nestjs` for Nest specific adjustments.
- `nestjs` – enables NestJS-centric TypeScript tweaks (empty decorated constructors, declaration merging, DI parameter properties, etc.).
- `formatters` – keeps the built-in formatting rules enabled by default.
- `test` – relaxes certain Vitest/Jest style rules (`test/prefer-lowercase-title`).
- `weapp` – legacy alias for `miniProgram`; kept for backward compatibility.

### Mini Program Preset

`miniProgram: true` is the recommended API for `weapp-vite`, `wevu`, and native
Mini Program templates. It enables the following defaults:

- injects readonly globals for `wx`, `Page`, `App`, `Component`, `getApp`, `getCurrentPages`, `requirePlugin`, and `WechatMiniprogram`
- ignores `dist/**`, `.weapp-vite/**`, `miniprogram_npm/**`, `node_modules/**`, `project.config.json`, and `project.private.config.json`
- when `vue: true` is also enabled, relaxes Vue template checks for Mini Program inline tags such as `<text>`

#### Native Mini Program Minimal Config

```ts
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker({
  miniProgram: true,
})
```

#### weapp-vite + wevu Minimal Config

```ts
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker({
  miniProgram: true,
  vue: true,
})
```

#### Combining With Existing Options

```ts
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker({
  miniProgram: true,
  vue: true,
  tailwindcss: true,
  ignores: [
    'coverage/**',
  ],
})
```

`miniProgram` only adds the platform defaults. User supplied `ignores`,
`extends`, `rules`, and downstream flat config items still compose normally.

### Stylelint Bridge

`@icebreakers/eslint-config` bundles the Stylelint bridge and uses
`@icebreakers/stylelint-config` as the default Stylelint preset when you opt in.
The bridge is still disabled by default. Turn it on with `stylelint: true` to
lint `*.css`, `*.scss`, and `.vue` style blocks through ESLint:

```ts
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker({
  vue: true,
  stylelint: true,
})
```

You can also inline Stylelint preset options directly in `eslint.config.ts`:

```ts
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker({
  vue: true,
  stylelint: {
    cwd: process.cwd(),
    presets: {
      order: false,
    },
    rules: {
      'color-named': 'never',
    },
  },
})
```

`stylelint.cwd` changes the resolution root, and the remaining fields follow
the `@icebreakers/stylelint-config` options (`presets`, `tailwindcssPreset`,
`ignores`, `extends`, `overrides`, `rules`).

### UnoCSS Projects

The UnoCSS integration is still powered by the upstream Antfu preset, but
`@icebreakers/eslint-config` adds a small wrapper so the config file path can be
declared next to the other UnoCSS options:

```ts
import path from 'node:path'
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker({
  unocss: {
    strict: true,
    attributify: false,
    configPath: path.resolve(process.cwd(), './uno.config.ts'),
  },
})
```

Behavior details:

- `unocss: true` enables the upstream Antfu UnoCSS preset unchanged.
- `unocss.configPath` is an Icebreaker wrapper for `settings.unocss.configPath`.
- If `configPath` is omitted, UnoCSS still searches the lint project root for
  `uno.config.*`.
- If both `unocss.configPath` and `settings.unocss.configPath` are provided,
  `unocss.configPath` wins.
- If `@unocss/eslint-plugin` is unavailable, the UnoCSS preset is skipped
  instead of throwing.

### NestJS Projects

Enable `nestjs: true` together with the TypeScript preset to apply rules tailored for Nest idioms:

- Keeps decorated lifecycle hooks and class constructors legal even when empty.
- Allows DI parameter properties and ambient module augmentation (e.g. Express request typing).
- Relaxes `no-explicit-any`/`ban-types` patterns commonly used with provider tokens while keeping other strict defaults intact.

## Adding Extra Config Items

Because `icebreaker()` returns a composer you can append overrides:

```ts
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker(
  { typescript: true },
  {
    files: ['*.vue'],
    rules: {
      'vue/no-undef-components': 'off',
    },
  },
)
```

You may also pass other flat configs (e.g. from in-house presets) as additional arguments.

## IDE Integration

- Install the VS Code ESLint extension (`>=3.0.10`).
- Set `"eslint.experimental.useFlatConfig": true` for older VS Code builds.
- Use `pnpm lint -- --fix` in a pre-commit hook for consistent formatting.

## Troubleshooting

- Missing plugin errors usually mean a feature is enabled without its optional dependency being installed in the current workspace. React, Next, and UnoCSS related presets now auto-skip in that case; other features can be added with `pnpm add -D`.
- When combining legacy `.eslintrc` projects, prefer `icebreakerLegacy()` and move overrides into flat config format incrementally.
- Tailwind class validation reads from your `tailwind.config.*`; double check the path when using monorepo roots or custom build tooling.
