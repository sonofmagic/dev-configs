import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import semver from 'semver'

const require = createRequire(import.meta.url)
const PACKAGE_DIR = path.resolve(__dirname, '..')
const packageJson = JSON.parse(
  fs.readFileSync(path.join(PACKAGE_DIR, 'package.json'), 'utf8'),
) as {
  dependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
}

const antfuPackageJson = require('@antfu/eslint-config/package.json') as {
  peerDependencies?: Record<string, string>
}

const BUNDLED_REACT_PACKAGES = [
  '@eslint-react/eslint-plugin',
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-react-hooks',
  'eslint-plugin-react-refresh',
] as const

function readInstalledPackageJson(name: string): { version: string } {
  const packageJsonPath = path.join(
    PACKAGE_DIR,
    'node_modules',
    ...name.split('/'),
    'package.json',
  )

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`Unable to locate package.json for ${name}`)
  }

  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as {
    version: string
  }
}

describe('peer compatibility', () => {
  it.each(BUNDLED_REACT_PACKAGES)('bundles %s as a runtime dependency', (name) => {
    expect(packageJson.dependencies?.[name]).toBeTruthy()
    expect(packageJson.optionalDependencies?.[name]).toBeUndefined()
  })

  it.each(BUNDLED_REACT_PACKAGES)(
    'keeps the installed %s version within the @antfu/eslint-config peer range',
    (name) => {
      const installedPackageJson = readInstalledPackageJson(name)
      const peerRange = antfuPackageJson.peerDependencies?.[name]

      expect(peerRange).toBeTruthy()
      expect(
        semver.satisfies(installedPackageJson.version, peerRange!, {
          includePrerelease: true,
        }),
      ).toBe(true)
    },
  )
})
