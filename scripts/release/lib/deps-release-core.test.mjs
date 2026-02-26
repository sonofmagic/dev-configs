import assert from 'node:assert/strict'
import { it } from 'vitest'
import {
  collectChangedPackages,
  createChangesetMarkdown,
  normalizeDeps,
} from './deps-release-core.mjs'

it('normalizeDeps sorts keys', () => {
  const normalized = normalizeDeps({
    zeta: '^1.0.0',
    alpha: '^2.0.0',
  })

  assert.deepEqual(Object.keys(normalized), ['alpha', 'zeta'])
})

it('collectChangedPackages returns sorted unique changed packages', () => {
  const currentByFile = new Map([
    [
      'packages/eslint/package.json',
      {
        name: '@icebreakers/eslint-config',
        dependencies: {
          eslint: '^10.0.0',
        },
      },
    ],
    [
      'packages/stylelint/package.json',
      {
        name: '@icebreakers/stylelint-config',
        dependencies: {
          stylelint: '^17.0.0',
        },
      },
    ],
  ])

  const baseByFile = new Map([
    [
      'packages/eslint/package.json',
      {
        name: '@icebreakers/eslint-config',
        dependencies: {
          eslint: '^9.0.0',
        },
      },
    ],
    [
      'packages/stylelint/package.json',
      {
        name: '@icebreakers/stylelint-config',
        dependencies: {
          stylelint: '^17.0.0',
        },
      },
    ],
  ])

  const changed = collectChangedPackages({
    changedPackageJsonFiles: [
      'packages/stylelint/package.json',
      'packages/eslint/package.json',
      'packages/eslint/package.json',
    ],
    readCurrentPackage: file => currentByFile.get(file),
    readBasePackage: file => baseByFile.get(file),
    resolveDir: file => file.replace(/\/package\.json$/, ''),
  })

  assert.deepEqual(changed, [
    {
      name: '@icebreakers/eslint-config',
      dir: 'packages/eslint',
      file: 'packages/eslint/package.json',
    },
  ])
})

it('createChangesetMarkdown renders patch entries', () => {
  const markdown = createChangesetMarkdown(
    ['@icebreakers/eslint-config', '@icebreakers/stylelint-config'],
    'chore(deps): update package dependencies',
  )

  assert.equal(
    markdown,
    [
      '---',
      '\'@icebreakers/eslint-config\': patch',
      '\'@icebreakers/stylelint-config\': patch',
      '---',
      '',
      'chore(deps): update package dependencies',
      '',
    ].join('\n'),
  )
})
