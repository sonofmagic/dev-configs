# `unocss/no-invalid-apply`

Disallows invalid utility-like candidates inside `@apply` when they look like
UnoCSS or utility-first shorthand.

## Included In

- `base`: yes
- `recommended`: yes
- `strict`: yes

Reports examples like:

- `@apply bg-rd-500`
- `@apply justify-betwen items-cneter`

This rule focuses on candidate validity rather than banning `@apply` itself.

It only reports tokens that still look utility-like.

- semantic tokens such as `button-base` are ignored
- misspelled utility-like tokens such as `bg-rd-500` are reported
- bare-value forms such as `w-10px` and `text-rgb(255,0,0)` can also be
  reported here when they fail the validity check
- bracket-form arbitrary candidates such as `w-[10px]` are primarily covered by
  `unocss/no-arbitrary-value`

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
