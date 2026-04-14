---
'@icebreakers/eslint-config': patch
---

Limit `eslint-plugin-better-tailwindcss` to source-like files when
`tailwindcss` is configured with an object, and pass a stable
`better-tailwindcss.cwd` derived from the explicit `cwd`, the Tailwind entry
point directory, or `process.cwd()`.

This avoids loading Tailwind rules for files such as `package.json` and reduces
crashes in pnpm workspace and broken symlink resolution scenarios while keeping
existing Tailwind rule behavior for source files.
