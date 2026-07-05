---
"@icebreakers/eslint-config": major
---

Split Tailwind lint integrations into separate options.

`tailwindcss` now represents `eslint-plugin-tailwindcss` only, while the new
`betterTailwindcss` option enables `eslint-plugin-better-tailwindcss`. Existing
runtime configs that pass an object to `tailwindcss` are still normalized to
`betterTailwindcss`, but typed configs should migrate to the new option.
