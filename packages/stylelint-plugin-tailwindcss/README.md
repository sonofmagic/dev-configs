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

Minimal base config:

```ts
import { base } from 'stylelint-plugin-tailwindcss'

export default base
```

`base` enables:

- `tailwindcss/no-atomic-class`
- `tailwindcss/no-invalid-apply`

Preferred exported rule names and plugins:

```ts
import {
  noApplyPlugin,
  noApplyRuleName,
  noArbitraryValuePlugin,
  noArbitraryValueRuleName,
  noAtomicClassPlugin,
  noAtomicClassRuleName,
  noInvalidApplyPlugin,
  noInvalidApplyRuleName,
} from 'stylelint-plugin-tailwindcss'
```

- `tailwindcss/no-atomic-class`
  Exported as `noAtomicClassRuleName`, with `noAtomicClassPlugin` as the matching plugin.
- `tailwindcss/no-invalid-apply`
  Reports utility-like `@apply` candidates that do not exist in the resolved Tailwind runtime.
- `tailwindcss/no-apply`
  Reports every `@apply` directive.
- `tailwindcss/no-arbitrary-value`
  Reports arbitrary values and arbitrary properties in selectors and `@apply` candidates, such as `w-[10px]`, `[mask-type:luminance]`, and common UnoCSS bare-value forms like `w-10px`, `w-50%`, `top--10px`, `bg-$brand`, `text-rgb(255,0,0)`, `translate-x-50%`, `outline-#fff`, and `[&>*]:w-10px`.

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
