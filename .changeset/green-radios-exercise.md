---
'stylelint-plugin-tailwindcss': patch
'@icebreakers/stylelint-config': patch
---

Disallow more UnoCSS-style arbitrary value selectors and candidates in the built-in Tailwind utility rules, including bare values such as `w-10px`, `top--10px`, `bg-$brand`, and `[&>*]:w-10px`.
