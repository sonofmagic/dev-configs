---
'stylelint-plugin-tailwindcss': minor
'@icebreakers/stylelint-config': minor
---

Refine the utility-policy preset layering for Stylelint packages.

For `stylelint-plugin-tailwindcss`:

- clarify the built-in `base` and `recommended` tiers
- add `strict`, `tailwindStrict`, and `unocssStrict`
- refresh rule docs and README guidance for the new preset boundaries
- expand the UnoCSS demo examples to show what `unocss/no-invalid-apply`
  reports and what it intentionally ignores

For `@icebreakers/stylelint-config`:

- change the default bundled utility-policy layer to the plugin package's
  `base` preset
- add `tailwindcssPreset: 'base' | 'recommended' | 'strict'`
- document how to opt into the broader `recommended` layer or the stricter
  architecture-oriented Tailwind layer
