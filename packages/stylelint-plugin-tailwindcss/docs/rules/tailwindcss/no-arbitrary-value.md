# `tailwindcss/no-arbitrary-value`

Disallows Tailwind-style arbitrary values and arbitrary properties.

Reports examples like:

- `w-[10px]`
- `[mask-type:luminance]`

This rule is scoped to Tailwind-style bracket syntax. UnoCSS bare-value forms
such as `w-10px` are handled by `unocss/no-arbitrary-value`.

## Why

Bracket arbitrary values are powerful, but they are also an easy escape hatch
that bypasses your token system and agreed utility surface.

## When To Enable

Enable this when you allow Tailwind utilities but want to restrict ad-hoc
values in authored stylesheets.

## Example

```css
.w-\[10px\] {
  width: 10px;
}

.\[mask-type\:luminance\] {
  mask-type: luminance;
}
```
