# stylelint-plugin-no-tailwindcss

Stylelint plugin that disallows declaring Tailwind utility selectors in authored stylesheets.

## What It Does

This plugin reports selectors like `.flex`, `.mt-4`, `.hover\:bg-red-500`, or `.w-\[10px\]` when they are declared in CSS, SCSS, or Vue style blocks.

It is useful when your team wants:

- Tailwind utilities to stay in markup only
- authored styles to use semantic class names instead of atomic utility names
- a guardrail against re-declaring framework utility selectors

## Compatibility

The plugin supports three modes:

- Tailwind CSS v3: resolved from the consuming project and validated against the installed runtime
- Tailwind CSS v4: resolved from the consuming project and validated against the installed runtime
- No Tailwind installed: falls back to heuristic utility-first class detection, which is also useful for UnoCSS-style projects

At runtime the plugin resolves the installed `tailwindcss` version from the current project and chooses the matching validation path automatically. If no Tailwind installation can be resolved, it does not fail; instead it uses heuristic detection for common utility-first selectors.

## Installation

```bash
pnpm add -D stylelint stylelint-plugin-no-tailwindcss
```

If the project also uses Tailwind CSS and you want exact validation, install `tailwindcss` in the consuming project as usual. It is treated as an optional peer dependency.

## Usage

```ts
// stylelint.config.ts
import noTailwindcssPlugin, { ruleName } from 'stylelint-plugin-no-tailwindcss'

export default {
  plugins: [noTailwindcssPlugin],
  rules: {
    [ruleName]: true,
  },
}
```

The exported rule name is:

```txt
no-tailwindcss/no-atomic-class
```

## With `@icebreakers/stylelint-config`

`@icebreakers/stylelint-config` already enables this plugin by default, so you do not need to configure it twice when using that preset.
