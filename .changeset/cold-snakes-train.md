---
'@icebreakers/eslint-config': major
---

Raise the supported Node.js baseline for `@icebreakers/eslint-config` to Node.js
22 and newer.

Node.js 20 support is no longer treated as complete because the preset now
depends on packages whose published engine ranges exclude Node.js 20.
