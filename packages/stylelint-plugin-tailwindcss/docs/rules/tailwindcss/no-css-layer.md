# `tailwindcss/no-css-layer`

Disallows authored `@layer` directives.

Reports examples like:

- `@layer utilities { ... }`
- `@layer components { ... }`

Use this rule when layer composition should stay centralized rather than spread
across feature stylesheets.

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
