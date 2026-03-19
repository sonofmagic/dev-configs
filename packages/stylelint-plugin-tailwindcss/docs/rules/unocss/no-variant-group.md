# `unocss/no-variant-group`

Disallows UnoCSS variant groups.

## Included In

- `base`: no
- `recommended`: yes

Reports examples like:

- `hover:(bg-red-500 text-white)`
- `sm:(flex items-center)`

Use this rule when grouped utility syntax should stay out of authored
stylesheets.

## Why

Variant groups are concise, but they also introduce a framework-specific mini
language into authored CSS.

## When To Enable

Enable this when UnoCSS grouped syntax should stay in markup or be avoided
entirely in stylesheet code.

## Example

```css
.button {
  @apply hover:(bg-red-500 text-white);
}
```
