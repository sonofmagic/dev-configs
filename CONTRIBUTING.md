# Contributing

## Release Flow

This repository uses pnpm's native workspace release management orchestrated by
repoctl.

- Run `pnpm change` and commit the generated `.changeset/*.md` release intent in
  every pull request that changes a published workspace package.
- Merging a PR with a release intent into `main` creates or updates the pnpm
  Version Packages PR.
- Merging the generated release PR publishes the versioned packages to npm.

The main release workflow uses npm Trusted Publishing through GitHub Actions
OIDC. The legacy `v4` branch keeps its independent Changesets workflow and is
not handled by the main-branch repoctl workflow.

The repoctl-managed workflow is validated with `pnpm check:workflows`. Keep the
workflow on the `release/v2` contract when upgrading repoctl: full Git history,
SHA-pinned actions, stable and prerelease branch triggers, and the
`REPOCTL_RELEASE_TOKEN` / `CHANGESETS_RELEASE_TOKEN` / `github.token` fallback.

Pull requests that touch publishable package files without a release intent will
fail the `Release Intent Check` workflow.

## Build Artifacts

Generated build outputs such as `packages/*/dist` should not be committed to
Git. Keep source changes in `src/`, run the package build when you need to
verify publish output locally, and rely on the package `files` field plus
`pnpm pack`/release automation to include `dist` in the published tarball.

## Publishing Auth

The main release workflow requires npm Trusted Publishing to be configured for
each published package with the repository's GitHub Actions workflow as its
OIDC publisher.
