# stylelint-plugin-tailwindcss

Stylelint plugin for Tailwind CSS and utility-first selector policies.

## Included Rules

- `tailwindcss/no-atomic-class`

## Behavior

The plugin supports three modes:

- Tailwind CSS v3: resolved from the consuming project and validated against the installed runtime
- Tailwind CSS v4: resolved from the consuming project and validated against the installed runtime
- No Tailwind installed: falls back to heuristic utility-first selector detection, which is still useful for UnoCSS-style projects

## Installation

```bash
pnpm add -D stylelint stylelint-plugin-tailwindcss
```

If the consuming project uses Tailwind CSS and you want exact validation, install `tailwindcss` there as usual.

## Usage

```ts
import tailwindcssPlugin, { ruleName } from 'stylelint-plugin-tailwindcss'

export default {
  plugins: [tailwindcssPlugin],
  rules: {
    [ruleName]: true,
  },
}
```
