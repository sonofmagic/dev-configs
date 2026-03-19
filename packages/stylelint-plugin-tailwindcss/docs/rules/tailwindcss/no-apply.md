# `tailwindcss/no-apply`

Disallows any Tailwind `@apply` usage.

## Included In

- `base`: no
- `recommended`: yes
- `strict`: yes

Reports examples like:

- `@apply rounded-lg px-4`

Use this rule when your team wants utility composition to stay out of authored
stylesheets.

## Why

Banning `@apply` avoids a second composition system in CSS and keeps utility
usage in markup or component code.

## When To Enable

Enable this when your team has decided that `@apply` should not be part of the
authoring model at all.

## Example

```css
.button {
  @apply rounded-lg px-4;
}
```
