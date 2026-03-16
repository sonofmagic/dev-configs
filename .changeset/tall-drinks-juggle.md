---
'@icebreakers/stylelint-config': patch
'stylelint-plugin-tailwindcss': patch
---

Add a dedicated Stylelint plugin that blocks authored Tailwind utility selectors
and enable it by default in `@icebreakers/stylelint-config`.

The new plugin supports both Tailwind CSS v3 and v4 projects by detecting the
installed major version at runtime.
