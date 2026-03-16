# `demo.scss`

This file focuses on SCSS nesting and `@apply` policy checks.

Passing cases:

- semantic selectors such as `.demo-panel` and `.semantic-button`
- nested semantic selectors such as `&__content`

Failing cases:

- `.button-with-apply` because `@apply` is disallowed
- `.button-with-invalid-apply` because `bg-rd-500` is not a valid Tailwind candidate
- `.button-with-arbitrary-apply` because arbitrary values are disallowed
- utility selectors such as `.grid`, `.items-center`, `.md\:flex`, `.w-\[10px\]`

Rules demonstrated:

- `tailwindcss/no-apply`
- `tailwindcss/no-invalid-apply`
- `tailwindcss/no-atomic-class`
- `tailwindcss/no-arbitrary-value`
