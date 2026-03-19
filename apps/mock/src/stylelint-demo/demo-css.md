# `demo.css`

This file focuses on authored selector examples for the `tailwindcss/*`
namespace. The `unocss/*` rules are disabled at file level so the IDE
output stays focused.

Passing cases:

- semantic selectors such as `.page-shell`
- BEM/OOCSS selectors such as `.card__body--primary`
- regular authored selectors such as `.button-primary`

Failing cases:

- `.flex`
- `.hover\:bg-red-500`
- `.w-\[10px\]`
- `.\[mask-type\:luminance\]`

Rules demonstrated:

- `tailwindcss/no-atomic-class`
- `tailwindcss/no-arbitrary-value`
