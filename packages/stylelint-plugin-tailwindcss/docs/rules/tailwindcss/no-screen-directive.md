# `tailwindcss/no-screen-directive`

Disallows the Tailwind `@screen` directive.

## Included In

- `base`: no
- `recommended`: no
- `strict`: yes

Reports examples like:

- `@screen md { ... }`

Use this rule when breakpoint usage should stay on native `@media` or a
centralized responsive abstraction.

This rule is exported, but not enabled by the default `recommended` preset.

## Why

`@screen` hides the actual media query and makes responsive behavior more
Tailwind-specific inside authored stylesheets.

## When To Enable

Enable this when your team prefers native `@media` or another centralized
responsive layer instead of Tailwind screen aliases in CSS.

## Example

```css
@screen md {
  .button {
    color: red;
  }
}
```
