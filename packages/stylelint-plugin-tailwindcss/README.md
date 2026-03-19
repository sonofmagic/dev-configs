# stylelint-plugin-tailwindcss

Stylelint plugin for Tailwind CSS and utility-first selector policies.

## Overview

This package is a Stylelint plugin focused on one question:

> Should authored stylesheets be allowed to declare utility-first selectors such as `.flex`, `.grid`, `.text-center`, or `.hover\:bg-red-500`?

It is designed for teams that want:

- utility classes to live in templates/markup only
- semantic selectors in authored CSS/SCSS/Vue style blocks
- the same rule to still be useful in Tailwind CSS and UnoCSS-like projects

## Included Rules

- `tailwindcss/no-atomic-class`
- `tailwindcss/no-invalid-apply`
- `tailwindcss/no-apply`
- `tailwindcss/no-arbitrary-value`
- `tailwindcss/no-theme-function`
- `tailwindcss/no-screen-directive`
- `tailwindcss/no-tailwind-directive`
- `tailwindcss/no-import-directive`
- `tailwindcss/no-css-layer`
- `unocss/no-atomic-class`
- `unocss/no-invalid-apply`
- `unocss/no-apply`
- `unocss/no-arbitrary-value`
- `unocss/no-variant-group`

## What The Rule Reports

The rule reports selectors like:

- `.flex`
- `.grid`
- `.text-center`
- `.hover\:bg-red-500`
- `.w-\[10px\]`
- `.md\:flex`
- `.\!mt-4`

It does **not** report semantic selectors such as:

- `.page-shell`
- `.card__body`
- `.hero-banner--primary`

## Detection Modes

The plugin supports three modes:

- Tailwind CSS v3: resolved from the consuming project and validated against the installed runtime
- Tailwind CSS v4: resolved from the consuming project and validated against the installed runtime
- No Tailwind installed: falls back to heuristic utility-first selector detection, which is still useful for UnoCSS-style projects

This means the package works in two different styles of project:

1. Tailwind-aware projects
   The plugin resolves the installed `tailwindcss` package from the consuming project and validates class names against the real Tailwind runtime.

2. Utility-first projects without Tailwind installed
   The plugin falls back to heuristic detection for common utility prefixes, variants, arbitrary values, negative utilities, important utilities, and similar patterns.

That fallback is intentionally useful for projects built with tools like UnoCSS, even though the plugin name is Tailwind-oriented.

## Installation

```bash
pnpm add -D stylelint stylelint-plugin-tailwindcss
```

If the consuming project uses Tailwind CSS and you want exact validation, install `tailwindcss` there as usual.

## Usage

```ts
// stylelint.config.ts
import { recommended } from 'stylelint-plugin-tailwindcss'

export default recommended
```

`recommended` now enables both namespaces by default:

- `tailwindcss/*`
- `unocss/*`

Minimal base config:

```ts
import { base } from 'stylelint-plugin-tailwindcss'

export default base
```

`base` enables:

- `tailwindcss/no-atomic-class`
- `tailwindcss/no-invalid-apply`
- `unocss/no-atomic-class`
- `unocss/no-invalid-apply`

Tailwind-only config:

```ts
import { tailwindRecommended } from 'stylelint-plugin-tailwindcss'

export default tailwindRecommended
```

UnoCSS-only config:

```ts
import { unocssRecommended } from 'stylelint-plugin-tailwindcss'

export default unocssRecommended
```

Disable one namespace while keeping the other:

```ts
import { recommended } from 'stylelint-plugin-tailwindcss'

export default {
  ...recommended,
  rules: {
    ...recommended.rules,
    'unocss/no-atomic-class': false,
    'unocss/no-invalid-apply': false,
    'unocss/no-apply': false,
    'unocss/no-arbitrary-value': false,
  },
}
```

Disable individual rules one by one:

```ts
import { recommended } from 'stylelint-plugin-tailwindcss'

export default {
  ...recommended,
  rules: {
    ...recommended.rules,
    'tailwindcss/no-apply': false,
    'unocss/no-arbitrary-value': false,
  },
}
```

Preferred exported rule names and plugins:

```ts
import {
  noApplyPlugin,
  noApplyRuleName,
  noArbitraryValuePlugin,
  noArbitraryValueRuleName,
  noAtomicClassPlugin,
  noAtomicClassRuleName,
  noCssLayerPlugin,
  noCssLayerRuleName,
  noImportDirectivePlugin,
  noImportDirectiveRuleName,
  noInvalidApplyPlugin,
  noInvalidApplyRuleName,
  noScreenDirectivePlugin,
  noScreenDirectiveRuleName,
  noTailwindDirectivePlugin,
  noTailwindDirectiveRuleName,
  noThemeFunctionPlugin,
  noThemeFunctionRuleName,
  tailwindBase,
  tailwindRecommended,
  unocssBase,
  unocssNoApplyPlugin,
  unocssNoApplyRuleName,
  unocssNoArbitraryValuePlugin,
  unocssNoArbitraryValueRuleName,
  unocssNoAtomicClassPlugin,
  unocssNoAtomicClassRuleName,
  unocssNoInvalidApplyPlugin,
  unocssNoInvalidApplyRuleName,
  unocssNoVariantGroupPlugin,
  unocssNoVariantGroupRuleName,
  unocssRecommended,
} from 'stylelint-plugin-tailwindcss'
```

- `tailwindcss/no-atomic-class`
  Exported as `noAtomicClassRuleName`, with `noAtomicClassPlugin` as the matching plugin.
- `tailwindcss/no-invalid-apply`
  Reports utility-like `@apply` candidates that do not exist in the resolved Tailwind runtime.
- `tailwindcss/no-apply`
  Reports every `@apply` directive.
- `tailwindcss/no-arbitrary-value`
  Reports Tailwind-style arbitrary values and arbitrary properties in selectors and `@apply` candidates, such as `w-[10px]` and `[mask-type:luminance]`.
- `tailwindcss/no-theme-function`
  Reports any `theme(...)` usage in declarations and at-rule params.
- `tailwindcss/no-screen-directive`
  Reports any `@screen` directive.
- `tailwindcss/no-tailwind-directive`
  Reports any `@tailwind` directive. Exported, but not enabled by `recommended` by default.
- `tailwindcss/no-import-directive`
  Reports `@import "tailwindcss"`-style entry imports. Exported, but not enabled by `recommended` by default.
- `tailwindcss/no-css-layer`
  Reports authored `@layer` directives.
- `unocss/no-atomic-class`
  Exported as `unocssNoAtomicClassRuleName`, with `unocssNoAtomicClassPlugin` as the matching plugin.
- `unocss/no-invalid-apply`
  Exported as `unocssNoInvalidApplyRuleName`, with `unocssNoInvalidApplyPlugin` as the matching plugin.
- `unocss/no-apply`
  Exported as `unocssNoApplyRuleName`, with `unocssNoApplyPlugin` as the matching plugin.
- `unocss/no-arbitrary-value`
  Exported as `unocssNoArbitraryValueRuleName`, with `unocssNoArbitraryValuePlugin` as the matching plugin.
  This namespace also reports UnoCSS bare-value forms such as `w-10px`, `w-50%`, `top--10px`, `bg-$brand`, `text-rgb(255,0,0)`, `translate-x-50%`, `outline-#fff`, and `[&>*]:w-10px`.
- `unocss/no-variant-group`
  Exported as `unocssNoVariantGroupRuleName`, with `unocssNoVariantGroupPlugin` as the matching plugin.
  Reports UnoCSS variant groups such as `hover:(bg-red-500 text-white)`.

## With `@icebreakers/stylelint-config`

`@icebreakers/stylelint-config` already enables this plugin by default, so you do not need to register it manually when using that preset.

## Exact vs Heuristic Validation

When Tailwind is installed:

- detection is more precise
- the plugin uses the real installed Tailwind version from the consuming project
- Tailwind v3 and v4 are handled differently internally

When Tailwind is not installed:

- the plugin does not fail
- it falls back to utility-first heuristics
- this is less exact, but still catches many real utility selectors

In other words, the plugin is designed to degrade gracefully rather than becoming useless outside Tailwind projects.

## Supported File Types

The plugin works wherever Stylelint works, including:

- `.css`
- `.scss`
- Vue SFC `<style>` blocks
- Vue SFC `<style lang="scss">`

## Demo

This repository includes an IDE-visible demo under:

- [apps/mock/src/stylelint-demo](/Users/icebreaker/Documents/GitHub/eslint-config/apps/mock/src/stylelint-demo)

You can run it with:

```bash
pnpm --dir apps/mock run lint:styles:demo
```

## Related Packages

- `postcss-tailwindcss`
  Used for selector collection and Tailwind runtime resolution.
- `@icebreakers/stylelint-config`
  Enables this plugin by default in the monorepo's Stylelint preset.
