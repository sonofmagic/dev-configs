# `tailwindcss/no-css-layer`

Disallows authored `@layer` directives.

## Included In

- `base`: no
- `recommended`: no
- `strict`: yes

Reports examples like:

- `@layer utilities { ... }`
- `@layer components { ... }`

Use this rule when layer composition should stay centralized rather than spread
across feature stylesheets.

This rule is exported, but not enabled by the default `recommended` preset
because it can also match native CSS cascade layers.

## Why

Authored `@layer` blocks can make layer ordering and ownership harder to reason
about across a large codebase.

## When To Enable

Enable this when Tailwind layer declarations should stay in a central stylesheet
or build entry instead of feature-local CSS.

## Example

```css
@layer utilities {
  .button {
    color: red;
  }
}
```
