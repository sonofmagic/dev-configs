# `tailwindcss/no-invalid-apply`

Disallows invalid Tailwind utility candidates inside `@apply`.

Reports examples like:

- `@apply bg-rd-500`

This rule uses the resolved Tailwind runtime when available, so validation is
based on the consuming project's actual Tailwind version and config.

## Why

Typos inside `@apply` are easy to miss because they still look like valid
utility syntax.

## When To Enable

Enable this when `@apply` is still allowed in your codebase but you want
runtime-aware validation for candidates.

## Example

```css
.button {
  @apply bg-rd-500 rounded-lg;
}
```
