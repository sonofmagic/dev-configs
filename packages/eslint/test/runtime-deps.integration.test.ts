import { createRequire } from 'node:module'
import path from 'node:path'

const packageRequire = createRequire(
  path.resolve(__dirname, '..', 'package.json'),
)

describe('runtime dependency contract', () => {
  it('keeps @typescript-eslint/utils resolvable from eslint-plugin-antfu', () => {
    const antfuPackageJsonPath = packageRequire.resolve(
      '@antfu/eslint-config/package.json',
    )
    const antfuRequire = createRequire(antfuPackageJsonPath)
    const pluginEntry = antfuRequire.resolve('eslint-plugin-antfu')
    const pluginRequire = createRequire(pluginEntry)

    expect(() => pluginRequire.resolve('@typescript-eslint/utils')).not.toThrow()
  })
})
