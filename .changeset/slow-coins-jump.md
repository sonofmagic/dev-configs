---
'@icebreakers/eslint-config': patch
---

Disable core `dot-notation` in the base preset to avoid conflicts with TypeScript `noPropertyAccessFromIndexSignature` (`ts(4111)`) when bracket notation is required for index-signature properties.
