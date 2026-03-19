# `tailwindcss/no-tailwind-directive`

Disallows Tailwind entry directives inside authored stylesheets.

## Included In

- `base`: no
- `recommended`: yes

Reports examples like:

- `@tailwind base`
- `@tailwind utilities`

Use this rule when framework entrypoints should stay in dedicated setup files.

## Why

`@tailwind` directives are usually build-entry concerns rather than
feature-stylesheet concerns.

## When To Enable

Enable this when Tailwind setup should live in a dedicated global entry file,
not inside business or component stylesheets.

## Example

```css
@tailwind utilities;
```
