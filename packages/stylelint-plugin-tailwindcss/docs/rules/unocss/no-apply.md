# `unocss/no-apply`

Disallows any UnoCSS-oriented `@apply` usage.

## Included In

- `base`: no
- `recommended`: yes

Reports examples like:

- `@apply rounded-lg px-4`

Use this rule when utility composition should stay out of authored stylesheets.

## Why

Banning `@apply` removes one more stylesheet-level escape hatch and keeps
utility composition outside authored CSS.

## When To Enable

Enable this when your team does not want UnoCSS-style `@apply` usage at all.

## Example

```css
.button {
  @apply rounded-lg px-4;
}
```
