---
'postcss-tailwindcss': major
'stylelint-plugin-tailwindcss': major
---

Expand the Tailwind and utility-first analysis surface with new theme and
directive policy support.

For `stylelint-plugin-tailwindcss`, this release adds new exported rules and
recommended defaults for:

- `tailwindcss/no-theme-function`
- `tailwindcss/no-invalid-theme-function`
- `tailwindcss/no-screen-directive`
- `tailwindcss/no-css-layer`
- `unocss/no-variant-group`

This is marked as a major release because the default `recommended`
configuration now enables additional rules beyond the previous set.

For `postcss-tailwindcss`, this release is marked major to align with the new
theme and directive analysis expectations consumed by downstream tooling.
