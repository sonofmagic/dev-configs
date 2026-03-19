---
'stylelint-plugin-tailwindcss': minor
'@icebreakers/stylelint-config': minor
---

Split the utility-first rules into `tailwindcss/*` and `unocss/*`
namespaces.

Default `base` and `recommended` configs now enable both namespaces,
while still allowing each rule to be disabled independently.

Add explicit single-namespace exports for consumers that want one side
only, including:

- `tailwindBase`
- `tailwindRecommended`
- `unocssBase`
- `unocssRecommended`
- `unocssNoAtomicClassPlugin`
- `unocssNoInvalidApplyPlugin`
- `unocssNoApplyPlugin`
- `unocssNoArbitraryValuePlugin`

Also add the matching `UNOCSS_NO_*` rule-name exports and document how
to disable either namespace or individual rules one by one.

Update `@icebreakers/stylelint-config` so its default preset enables
both the `tailwindcss/*` and `unocss/*` rule sets, and add matching
mock demo files that isolate each namespace in the IDE.
