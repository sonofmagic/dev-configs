# Stylelint Demo

Open these files in your IDE with the Stylelint extension enabled.

Expected behavior:

- semantic selectors such as `.page-shell`, `.card__body`, `.demo-panel` should pass
- Tailwind utility selectors such as `.flex`, `.grid`, `.hover\:bg-red-500`, `.w-\[10px\]` should fail
- CSS, SCSS, and Vue SFC style blocks should all be checked

Files:

- `demo.css`
- `demo.scss`
- `DemoStylelint.vue`

Terminal check:

```bash
pnpm --dir apps/mock run lint:styles:demo
```
