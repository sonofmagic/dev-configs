---
'@icebreakers/changelog-github': minor
---

pr: #5
Commit: 1d5f8910823e330f331d5ee30cc518d3392f27cd

feat(changelog): repo-aware GitHub formatting + summary directives

- Recognize summary directives (case-insensitive): `pr:`, `pull request:`,
  `commit:`, `author:` / `user:`
- Prefer PR links over commit links; fall back to short SHA when no PR exists
- Normalize detail lines from `-` / `*` / plain text into a single indented list
- Keep inline Markdown intact: `code`, [links](https://example.com), issue refs
  like #123, and monorepo paths such as `packages/changelog-github/src/index.ts`
- Drop redundant separators and release-type labels so entries stay scannable
- Dependency section stays compact:
  - ≤3 bumps: show `📦 Dependencies` + first commit + an inline list
  - >3 bumps: collapse to `📦 Updated N dependencies` + first commit
