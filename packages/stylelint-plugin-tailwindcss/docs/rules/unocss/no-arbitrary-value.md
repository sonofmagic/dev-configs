# `unocss/no-arbitrary-value`

Disallows UnoCSS arbitrary values, arbitrary properties, and bare-value forms.

## Included In

- `base`: no
- `recommended`: yes

Reports examples like:

- `w-[10px]`
- `w-10px`
- `w-50%`
- `top--10px`
- `bg-$brand`

This rule intentionally covers forms that are valid in UnoCSS but are outside
Tailwind's bracket-only arbitrary value style.

## Why

UnoCSS makes it easy to reach for raw values, but that can quickly bypass token
usage and consistency rules.

## When To Enable

Enable this when you want to allow utility-first styling but still block ad-hoc
values in authored stylesheets.

## Example

```css
.w-10px {
  width: 10px;
}

.top--10px {
  top: -10px;
}
```
