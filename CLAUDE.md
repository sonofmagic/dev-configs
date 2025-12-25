# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing ESLint, Stylelint, and Commitlint configuration presets published as `@icebreakers/*` packages. The ESLint config (`@icebreakers/eslint-config`) is the primary package and extends `@antfu/eslint-config` with additional rules and framework support.

**Key insight**: The ESLint config uses a **factory pattern** that returns a `FlatConfigComposer` from `eslint-flat-config-utils`. This allows users to compose configs and add overrides, rather than receiving a static array.

## Architecture

### ESLint Package (`packages/eslint/`)

**Factory Pattern** (packages/eslint/src/factory.ts):

- `icebreaker(options, ...userConfigs)` → `FlatConfigComposer`
- `icebreakerLegacy(options, ...userConfigs)` → `FlatConfigComposer` (for legacy array config)

Both call `antfu()` from `@antfu/eslint-config` after resolving presets via `getPresets()`.

**Configuration Flow**:

1. User calls `icebreaker({ vue: true, typescript: true })`
2. `getPresets()` resolves options and builds preset array
3. `antfu()` from upstream is called with presets + user configs
4. Returns composer that can be further extended

**Key Files**:

- `src/factory.ts` - Main entry point exports
- `src/preset.ts` - Composes features with base rules
- `src/options.ts` - Resolves user options with defaults, creates `BASE_RULES`
- `src/features.ts` - Optional feature resolvers (tailwindcss, mdx, a11y, nestjs, query)
- `src/types.ts` - TypeScript definitions
- `src/defaults.ts` - Framework-specific defaults (Vue, TypeScript, NestJS)
- `src/antfu.ts` - Re-exports everything from `@antfu/eslint-config`

**Important Pattern - BASE_RULES**:
Located in `src/options.ts`, this object defines rules that override `@antfu/eslint-config` defaults. When adding new rule overrides, add them here. For example, to disable all pnpm rules by default (because the upstream auto-enables the plugin when `pnpm-workspace.yaml` exists), all pnpm rules are set to `'off'` in `BASE_RULES`.

**Feature Presets**:
Each feature (tailwindcss, mdx, a11y, nestjs, query) has a resolver in `features.ts` that:

- Takes the user option (boolean or object config)
- Returns an array of config items or empty array
- Handles dynamic imports for optional peer dependencies

**Build**:

- Uses `tsup` to build ESM (`dist/index.js`), CJS (`dist/index.cjs`), and TypeScript declarations (`dist/index.d.ts`)
- Entry point: `src/index.ts` (re-exports from factory and preset)
- Watch mode: `pnpm dev` in the eslint package

### Other Packages

- `packages/commitlint/` - Commitlint preset extending `@commitlint/config-conventional`
- `packages/stylelint/` - Stylelint preset with SCSS/Vue/HTML support
- `packages/changelog-github/` - Changeset GitHub changelog generator

## Common Commands

**All commands run from monorepo root:**

```bash
# Install dependencies (pnpm is enforced via preinstall hook)
pnpm install

# Build all packages (turbo handles dependencies)
pnpm build

# Run tests for all packages (Vitest with project root detection)
pnpm test              # run once
pnpm test:dev          # watch mode

# Lint all packages
pnpm lint

# Run single package test
pnpm --filter @icebreakers/eslint-config test
pnpm --filter @icebreakers/eslint-config test:dev

# Watch mode for single package
cd packages/eslint && pnpm dev

# Update test snapshots
pnpm --filter @icebreakers/eslint-config test -u
```

**Build output verification**:

- After building, check `packages/eslint/dist/` contains `index.js`, `index.cjs`, and `index.d.ts`
- The `postinstall` hook in root package.json runs `pnpm build` automatically

## Testing

**Vitest Configuration**:

- Root `vitest.config.ts` dynamically discovers workspace projects from `pnpm-workspace.yaml`
- Each package has its own `vitest.config.ts` with project-specific settings
- Test files: `test/*.test.ts`
- Fixtures: `_fixtures/` or `fixtures/` depending on package
- Snapshots: `test/__snapshots__/*.snap`

**When tests fail**:

1. If snapshots are outdated (common after modifying options/features), run with `-u` flag
2. For unit tests in `test/options.unit.test.ts` or `test/features.unit.test.ts`, check the test logic
3. For integration tests in `test/fixtures.test.ts`, ensure fixtures are up to date

**Single test debugging**:

```bash
# Run a specific test file
pnpm --filter @icebreakers/eslint-config test test/preset.test.ts

# Run with debug output
pnpm --filter @icebreakers/eslint-config test --debug
```

## Package Publishing

**Using Changesets**:

```bash
# Add a changeset (interactive prompts for version bump type)
pnpm release

# Version packages (consumes changeset files)
pnpm cv

# Publish (builds, lints, tests, then publishes)
pnpm publish-packages
```

**Manual release** (single package):

```bash
cd packages/eslint
pnpm build
pnpm release  # runs pnpm publish
```

## Configuration Design Principles

1. **Upstream First**: Most rules come from `@antfu/eslint-config`. This package adds Icebreaker-specific defaults and framework presets.
2. **Opt-In Features**: All optional features (tailwindcss, mdx, a11y, etc.) are disabled by default. Users opt-in via options.
3. **Framework-Specific Defaults**: Vue, TypeScript, and NestJS have tailored rule overrides in `src/defaults.ts`.
4. **Flat Config Composer**: The factory returns a composer, not a static array, allowing users to extend configs.

## Common Tasks

**Adding a new rule override**:

1. Add to `BASE_RULES` in `src/options.ts` (if it should always apply)
2. Or add to feature-specific resolver in `src/features.ts`
3. Update snapshots with `pnpm test -u`
4. Run tests and fixtures tests

**Adding a new optional feature**:

1. Add option type to `UserDefinedOptions` in `src/types.ts`
2. Create resolver function in `src/features.ts` returning `UserConfigItem[]`
3. Call resolver in `getPresets()` in `src/preset.ts`
4. Add default value to `BASE_DEFAULTS` if needed
5. Update tests and snapshots

**Investigating plugin errors**:

- Error "could not find plugin X" means the plugin isn't installed but rules reference it
- Add peer dependency with `optional: true` to `package.json`
- Disable rules in `BASE_RULES` if plugin should be opt-in

**Working with @antfu/eslint-config auto-detection**:

- The upstream auto-enables pnpm plugin when `pnpm-workspace.yaml` exists
- To override this behavior, disable all plugin rules in `BASE_RULES`
- Pattern: set all `pnpm/*` rules to `'off'` to make the plugin effectively disabled even when loaded

## Important Notes

- **Node version**: Requires Node >= 18
- **pnpm**: Enforced via `preinstall` hook using `only-allow`
- **Turbo**: Handles task orchestration and caching
- **Husky**: Git hooks are set up on `prepare` (runs after install)
- **postinstall**: Automatically runs `pnpm build` to ensure packages are built
- **ESLint inspector**: Use `npx @eslint/config-inspector` or `pnpm build:inspector` for visual rule diffs
