# postcss-tailwindcss

用于分析 Tailwind CSS 语法的 PostCSS AST 工具集。

## API

- `parseTailwindCss(input)`
- `detectTailwindVersion(input)`
- `collectApplyCandidates(input)`
- `collectThemeCalls(input)`
- `collectImportDirectives(input)`
- `collectUtilitySelectors(input)`
- `analyzeTailwindCss(input)`

`input` 可以是 CSS 字符串，也可以是已有的 PostCSS `Root`。
