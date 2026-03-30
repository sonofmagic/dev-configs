---
'@icebreakers/eslint-config': patch
---

Bundle the React ESLint plugins into `@icebreakers/eslint-config`, align
`@eslint-react/eslint-plugin` with the peer range required by
`@antfu/eslint-config`, and harden optional package detection for packages
without a root export entry.

Add regression coverage to verify bundled React plugin peer compatibility and
consumer-side `react` preset resolution.
