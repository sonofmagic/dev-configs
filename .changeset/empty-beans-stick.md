---
'@icebreakers/changelog-github': minor
---

pr: #5

Improve GitHub release note readability for Changesets

- Support summary directives: `pr:` / `pull request:`, `commit:`, `author:` / `user:` (case-insensitive)
- Prefer PR links over commit links; fall back to short SHA when no PR exists
- Render details as an indented list and keep inline Markdown (`code`, [links](https://example.com), #123, `packages/changelog-github/src/index.ts`)
- Auto-load `.env` via `dotenv/config` so local CLI runs behave like CI
- Drop redundant separators + release-type labels so entries stay scannable
- Format dependency bumps as `📦 Dependencies` (≤3) or `📦 Updated N dependencies` (>3)
