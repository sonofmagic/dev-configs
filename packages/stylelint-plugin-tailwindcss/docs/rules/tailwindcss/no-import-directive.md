# `tailwindcss/no-import-directive`

Disallows Tailwind entry imports such as `@import "tailwindcss"`.

Reports examples like:

- `@import "tailwindcss"`
- `@import "tailwindcss/utilities.css"`

Use this rule when Tailwind imports should stay in dedicated entry stylesheets.

## Why

Tailwind entry imports are part of framework bootstrapping and are easy to
scatter accidentally across feature stylesheets.

## When To Enable

Enable this when only a small number of entry files should be responsible for
loading Tailwind.

## Example

```css
@import 'tailwindcss';
```
