# eslint-plugin-better-stylelint

Bridge Stylelint diagnostics into ESLint for style files.

This package provides:

- ESLint processors for `*.css` and `*.scss`
- an ESLint rule for `.vue` files that forwards Stylelint diagnostics from
  `<style>` blocks

## Why

Use this when you want style issues to show up in the same ESLint diagnostic
stream as the rest of your project.

## Installation

```bash
pnpm add -D eslint stylelint eslint-plugin-better-stylelint
```

## Usage

```js
import betterStylelint from 'eslint-plugin-better-stylelint'

export default [
  {
    files: ['**/*.css'],
    plugins: {
      stylelint: betterStylelint,
    },
    processor: 'stylelint/css',
  },
  {
    files: ['**/*.scss'],
    plugins: {
      stylelint: betterStylelint,
    },
    processor: 'stylelint/scss',
  },
  {
    files: ['**/*.vue'],
    plugins: {
      stylelint: betterStylelint,
    },
    rules: {
      'stylelint/stylelint': 'error',
    },
  },
]
```

The plugin relies on the consuming project's Stylelint configuration and
installed Stylelint binary.
