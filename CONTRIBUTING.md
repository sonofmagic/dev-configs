# Contributing

## Release Flow

This repository uses Changesets for package releases.

- Add a `.changeset/*.md` file in every pull request that changes a published
  package under `packages/`.
- Merging a PR with a changeset into `main` creates or updates the release PR.
- Merging the generated release PR publishes the versioned packages to npm.

Pull requests that touch publishable package files without a changeset will fail
the `Changeset Check` workflow.

## Build Artifacts

Generated build outputs such as `packages/*/dist` should not be committed to
Git. Keep source changes in `src/`, run the package build when you need to
verify publish output locally, and rely on the package `files` field plus
`pnpm pack`/release automation to include `dist` in the published tarball.

## Publishing Auth

The release workflow supports two npm authentication modes:

- Preferred: npm Trusted Publishing with GitHub Actions OIDC
- Fallback: repository secret `NPM_TOKEN`

If Trusted Publishing is not configured for the published packages in npm, set
`NPM_TOKEN` in the repository secrets before merging a release PR.
