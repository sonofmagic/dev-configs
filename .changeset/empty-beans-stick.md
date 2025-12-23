---
'@icebreakers/changelog-github': minor
---

Optimize changelog formatting for better GitHub readability

- Simplify metadata presentation by removing redundant separators and labels
- Move detailed descriptions to indented sub-lists for better hierarchy
- Shorten contributor mentions to "by @username" format
- Remove "release type" text labels (emoji icons are sufficient)
- Prioritize PR links over commit SHA (show commit only when PR is unavailable)
- Optimize dependency update format: show full list for ≤3 deps, summary for more
- Reduce main line length by 60% while preserving essential information
