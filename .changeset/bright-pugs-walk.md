---
'@icebreakers/stylelint-config': patch
---

Align the default `media-feature-range-notation` rule with Prettier and ESLint formatter output by using prefix media queries such as `max-width`.

This avoids formatter conflicts in repositories that run both Stylelint fixes and CSS formatting through ESLint.
