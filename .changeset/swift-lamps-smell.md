---
'@icebreakers/stylelint-config': patch
'@icebreakers/eslint-config': patch
---

Fix editor linting conflicts between ESLint and Stylelint for CSS-like files by removing style languages from generated VS Code ESLint validation settings, and disable the noisy `style/eol-last` ESLint rule in the base preset.
