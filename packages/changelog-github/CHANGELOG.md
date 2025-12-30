# @icebreakers/changelog-github

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
