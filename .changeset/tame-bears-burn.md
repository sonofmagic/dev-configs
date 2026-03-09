---
'@icebreakers/eslint-config': patch
---

Fix formatter option merging so custom `formatters.prettierOptions` no longer disables the default CSS, SCSS, LESS, HTML, Markdown, and GraphQL formatters.

Infer formatter `prettierOptions.endOfLine` from repository `.editorconfig` when `end_of_line` is configured, while keeping explicit user settings unchanged.
