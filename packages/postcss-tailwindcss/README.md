# postcss-tailwindcss

PostCSS AST utilities for analyzing Tailwind CSS syntax.

## API

- `parseTailwindCss(input)`
- `detectTailwindVersion(input)`
- `collectApplyCandidates(input)`
- `collectThemeCalls(input)`
- `collectImportDirectives(input)`
- `collectUtilitySelectors(input)`
- `analyzeTailwindCss(input)`

`input` can be a CSS string or an existing PostCSS `Root`.
