# `demo-unocss.css` and `demo-unocss.scss`

These files isolate the `unocss/*` namespace by disabling the
`tailwindcss/*` rules at file level.

Passing cases:

- semantic selectors such as `.uno-shell`, `.uno-card__body--primary`,
  `.uno-demo-panel`, and `.uno-semantic-button`
- nested semantic selectors such as `&__content`
- UnoCSS at-rules such as `@unocss preflights`

Failing cases:

- utility selectors such as `.flex`, `.grid`, `.items-center`,
  `.hover\:bg-red-500`, `.md\:flex`
- arbitrary selectors such as `.w-\[10px\]`, `.w-10px`, `.top--10px`,
  `.bg-\$brand`, `.translate-x-50\%`, and `.\[mask-type\:luminance\]`
- `@apply` usage
- invalid utility-like `@apply` candidates such as `bg-rd-500`
- UnoCSS variant groups such as `hover:(bg-red-500 text-white)`

Rules demonstrated:

- `unocss/no-atomic-class`
- `unocss/no-invalid-apply`
- `unocss/no-apply`
- `unocss/no-arbitrary-value`
- `unocss/no-variant-group`
