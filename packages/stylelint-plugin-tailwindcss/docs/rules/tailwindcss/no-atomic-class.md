# `tailwindcss/no-atomic-class`

Disallows authored Tailwind utility selectors in stylesheets.

## Included In

- `base`: yes
- `recommended`: yes
- `strict`: yes

Reports examples like:

- `.flex`
- `.grid`
- `.hover\:bg-red-500`

Allows semantic selectors such as:

- `.page-shell`
- `.card__body`

Use this rule when utility classes should stay in template or markup code.

## Why

This keeps authored styles semantic and prevents utility selectors from
becoming an alternate styling layer inside CSS files.

## When To Enable

Enable this when your team wants utility classes in templates only and
semantic class names in authored stylesheets.

## Example

```css
.card {
  padding: 16px;
}

.flex {
  display: flex;
}
```
