# stylelint-plugin-no-tailwindcss

Stylelint plugin that disallows declaring Tailwind utility selectors in authored stylesheets.

## What It Does

This plugin reports selectors like `.flex`, `.mt-4`, `.hover\:bg-red-500`, or `.w-\[10px\]` when they are declared in CSS, SCSS, or Vue style blocks.

It is useful when your team wants:

- Tailwind utilities to stay in markup only
- authored styles to use semantic class names instead of atomic utility names
- a guardrail against re-declaring framework utility selectors

## Compatibility

The plugin supports both major Tailwind lines:

- Tailwind CSS v3: detected and validated with a bundled v3 compatibility runtime
- Tailwind CSS v4: detected and validated with `@tailwindcss/node`

At runtime the plugin resolves the installed `tailwindcss` version from the current project and chooses the matching validation path automatically.

## Installation

```bash
pnpm add -D stylelint stylelint-plugin-no-tailwindcss tailwindcss
```

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
