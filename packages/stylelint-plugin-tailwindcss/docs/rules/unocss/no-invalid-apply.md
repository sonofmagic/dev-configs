# `unocss/no-invalid-apply`

Disallows invalid utility-like candidates inside `@apply` when they look like
UnoCSS or utility-first shorthand.

## Included In

- `base`: yes
- `recommended`: yes

Reports examples like:

- `@apply bg-rd-500`

This rule focuses on candidate validity rather than banning `@apply` itself.

## Why

Invalid utility candidates inside `@apply` are hard to spot and often look
close enough to real utilities.

## When To Enable

Enable this when `@apply` is still allowed for UnoCSS-style usage but you want
candidate validation.

## Example

```css
.button {
  @apply bg-rd-500 rounded-lg;
}
```
