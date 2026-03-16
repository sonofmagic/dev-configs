---
'postcss-tailwindcss': patch
'stylelint-plugin-no-tailwindcss': patch
---

Refine Tailwind runtime resolution to use lightweight tsconfig path matching
via `get-tsconfig` instead of `tsconfig-paths-webpack-plugin`.

Update `stylelint-plugin-no-tailwindcss` to resolve Tailwind CSS from the
consumer project at runtime, instead of bundling version-specific Tailwind
implementations inside the plugin package.
