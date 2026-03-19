# `tailwindcss/no-theme-function`

Disallows any `theme(...)` usage in declarations and at-rule params.

Reports examples like:

- `color: theme(colors.gray.900 / 75%)`
- `margin: theme(spacing[2.5])`

Use this rule when token access should be mediated through CSS variables or
other project-specific abstractions.

## Why

Direct `theme(...)` calls couple authored stylesheets to Tailwind theme lookup
syntax.

## When To Enable

Enable this when tokens should flow through CSS variables, design-system mixins,
or another project-specific layer instead of raw Tailwind theme lookups.

## Example

```css
.button {
  color: theme(colors.gray.900 / 75%);
}
```
