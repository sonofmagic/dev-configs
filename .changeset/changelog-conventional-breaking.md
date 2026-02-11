---
'@icebreakers/changelog-github': minor
---

feat: parse conventional commit headlines and detect breaking changes

- Strip `type(scope):` prefix from headlines, render scope as bold label (e.g. `chore(deps): upgrade` → `**deps:** upgrade`)
- Detect breaking changes via `!` suffix or `BREAKING CHANGE:` in body, show 💥 icon with ⚠️ prefix
