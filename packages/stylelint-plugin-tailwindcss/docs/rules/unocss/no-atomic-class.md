# `unocss/no-atomic-class`

Disallows authored UnoCSS-style utility selectors in stylesheets.

## Included In

- `base`: yes
- `recommended`: yes

Reports examples like:

- `.flex`
- `.grid`
- `.hover\:bg-red-500`

Use this rule when utility selectors should stay in templates or markup.

## Why

This keeps UnoCSS-style utilities from becoming authored selector APIs inside
stylesheets.

## When To Enable

Enable this when utility selectors belong in templates only and stylesheet code
should stay semantic.

## Example

```css
.card {
  padding: 16px;
}

.flex {
  display: flex;
}
```
