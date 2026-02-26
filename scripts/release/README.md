# Release Scripts

This folder keeps the package dependency release logic used by:

- `.github/workflows/packages-deps-check.yml`
- `.github/workflows/packages-deps-publish.yml`

## Scripts

- `detect-deps-changes.mjs`
  - Input: `BASE_SHA`
  - Output (`GITHUB_OUTPUT`): `has_changes`, `changed_matrix`, `changed_names`
  - Purpose: compare `packages/*/package.json` dependency changes between
    `BASE_SHA..HEAD`

- `create-temp-changeset.mjs`
  - Input: `CHANGED_MATRIX`, optional `GITHUB_RUN_ID`
  - Output: a temporary `.changeset/packages-deps-<id>.md` file
  - Purpose: create patch release entries for changed packages

- `publish-changed-packages.mjs`
  - Input: `CHANGED_MATRIX`
  - Purpose: sequentially publish changed packages with
    `pnpm --filter <name> publish --access public --no-git-checks`

- `write-run-metadata.mjs`
  - Input: `HAS_CHANGES`, `CHANGED_MATRIX`
  - Output: `.release-metadata/metadata.json`
  - Purpose: persist release metadata as an artifact payload

- `read-run-metadata.mjs`
  - Input: `.release-metadata/metadata.json`
  - Output (`GITHUB_OUTPUT`): `has_changes`, `changed_matrix`
  - Purpose: restore release metadata in the publish workflow

## Test

Run:

```bash
pnpm run test:release-scripts
```
