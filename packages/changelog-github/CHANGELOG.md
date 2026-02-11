# @icebreakers/changelog-github

## 0.2.0

### Minor Changes

- ✨ **parse conventional commit headlines and detect breaking changes** [`e0b7039`](https://github.com/sonofmagic/dev-configs/commit/e0b7039253361fafd71db453d77dfb7f2748e2c1) by @sonofmagic
  - Strip `type(scope):` prefix from headlines, render scope as bold label (e.g. `chore(deps): upgrade` → `**deps:** upgrade`)
  - Detect breaking changes via `!` suffix or `BREAKING CHANGE:` in body, show 💥 icon with ⚠️ prefix

- ✨ **show full dependency list in collapsible details block when more than 3 packages are updated** [`54b92e2`](https://github.com/sonofmagic/dev-configs/commit/54b92e2c8bed80f27124ba0fec4a50872a5fc96b) by @sonofmagic

### Patch Changes

- 🐛 **deduplicate dependency commit references and preserve intentional line breaks in detail blocks** [`b0d23ea`](https://github.com/sonofmagic/dev-configs/commit/b0d23ea181952d217f7c966edd7f07ac568017a3) by @sonofmagic

- 🐛 **replace deprecated trimRight with trimEnd and fix nested bold markup when scope is present** [`3d73a16`](https://github.com/sonofmagic/dev-configs/commit/3d73a161bf889fe643b3967ecc07580bd666f60b) by @sonofmagic

## 0.1.1

### Patch Changes

- 🐛 **chore(deps): upgrade** [`c3c641e`](https://github.com/sonofmagic/dev-configs/commit/c3c641e119faf2e0d0ffa64cd8610cf17eed9952) by @sonofmagic

## 0.1.0

### Minor Changes

- ✨ **Improve GitHub release note readability for Changesets** [#5](https://github.com/sonofmagic/dev-configs/pull/5) by @github-actions
  - Support summary directives: `pr:` / `pull request:`, `commit:`, `author:` / `user:` (case-insensitive)
  - Prefer PR links over commit links; fall back to short SHA when no PR exists
  - Render details as an indented list and keep inline Markdown (`code`, [links](https://example.com), #123, `packages/changelog-github/src/index.ts`)
  - Auto-load `.env` via `dotenv/config` so local CLI runs behave like CI
  - Drop redundant separators + release-type labels so entries stay scannable
  - Format dependency bumps as `📦 Dependencies` (≤3) or `📦 Updated N dependencies` (>3)

## 0.0.2

### Patch Changes

- 🐛 **chore(deps): upgrade** — [`a24c546`](https://github.com/sonofmagic/dev-configs/commit/a24c546f6e01352b09fb5b219b7b867b22a96da3) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release

## 0.0.1

### Patch Changes

- 🐛 **docs: reflow package READMEs for better rendering** — [`44d4b37`](https://github.com/sonofmagic/dev-configs/commit/44d4b37a47e0a0c327fedce97d3d04ce36425a87) · Thanks [@sonofmagic](https://github.com/sonofmagic) · Patch release
