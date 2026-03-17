# Stylelint Demo

Open these files in your IDE with the Stylelint extension enabled.

Expected behavior:

- semantic selectors such as `.page-shell`, `.card__body`, `.demo-panel`, `.button-primary` should pass
- Tailwind utility selectors such as `.flex`, `.grid`, `.hover\:bg-red-500`, `.w-\[10px\]` should fail with `tailwindcss/no-atomic-class`
- any `@apply` usage should fail with `tailwindcss/no-apply`
- invalid `@apply` candidates such as `bg-rd-500` should fail with `tailwindcss/no-invalid-apply`
- arbitrary values / arbitrary properties such as `.w-\[10px\]`, `.w-10px`, `.top--10px`, `.bg-\$brand`, `.text-rgb\(255\,0\,0\)`, `.translate-x-50\%`, `.\[mask-type\:luminance\]`, and `@apply w-[10px]` should fail with `tailwindcss/no-arbitrary-value`
- CSS, SCSS, and Vue SFC style blocks should all be checked

Files:

- `demo.css` focuses on selector pass/fail pairs
- `demo.scss` adds `@apply` pass/fail comparisons and arbitrary value cases
- `DemoStylelint.vue` shows the same rules inside Vue SFC `<style>` blocks
- `demo-css.md`, `demo-scss.md`, `demo-vue.md` are the GitHub-targeted walkthrough pages linked from the demo component

Terminal check:

```bash
pnpm --dir apps/mock run lint:styles:demo
```
