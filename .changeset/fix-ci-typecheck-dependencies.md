---
"@icebreakers/eslint-config": patch
"@icebreakers/stylelint-config": patch
"eslint-plugin-better-stylelint": patch
"lightningcss-tailwindcss": patch
"postcss-tailwindcss": patch
"stylelint-plugin-tailwindcss": patch
---

Fix CI typecheck compatibility with ESLint 10.6, declare the direct PostCSS dependency used by the Tailwind stylelint plugin, and keep Tailwind runtime and type tests resolvable.
