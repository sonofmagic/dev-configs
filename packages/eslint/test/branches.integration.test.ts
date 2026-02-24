import type { Linter } from 'eslint'
import fs from 'node:fs/promises'
import path from 'node:path'
import { ESLint } from 'eslint'
import { icebreaker } from '@/index'

const ROOT_DIR = path.resolve(__dirname, '..')
let tempDir = ''

describe('eslint branch config behavior', () => {
  let eslint: ESLint

  beforeAll(async () => {
    tempDir = await fs.mkdtemp(path.join(ROOT_DIR, '.tmp-eslint-branches-'))
    await fs.writeFile(
      path.join(tempDir, 'sample.vue'),
      '<template><text>Hello</text></template>\n',
      'utf8',
    )
    await fs.writeFile(
      path.join(tempDir, 'sample.ts'),
      'export class Sample {}\n',
      'utf8',
    )

    const configs = await icebreaker({
      vue: true,
      typescript: true,
      weapp: true,
      ionic: true,
      nestjs: true,
    }).toConfigs()

    eslint = new ESLint({
      cwd: tempDir,
      overrideConfig: stripUnsupportedRules(configs),
      overrideConfigFile: true,
    })
  })

  afterAll(async () => {
    if (!tempDir) {
      return
    }
    await fs.rm(tempDir, { recursive: true, force: true })
  })

  it('enables weapp ignores for inline elements', async () => {
    const config = await eslint.calculateConfigForFile(
      path.join(tempDir, 'sample.vue'),
    )
    const rule = config.rules?.['vue/singleline-html-element-content-newline'] as
      | [string, { ignores?: string[] }]
      | undefined

    expect(rule).toBeDefined()
    expect([1, 'warn']).toContain(rule?.[0])
    expect(rule?.[1]?.ignores).toEqual(
      expect.arrayContaining(['text']),
    )
  })

  it('disables deprecated slot attribute rule for ionic', async () => {
    const config = await eslint.calculateConfigForFile(
      path.join(tempDir, 'sample.vue'),
    )

    const slotRule = config.rules?.['vue/no-deprecated-slot-attribute']
    const slotRuleDisabled = slotRule === 'off'
      || (Array.isArray(slotRule) && slotRule[0] === 0)
    expect(slotRuleDisabled).toBe(true)
  })

  it('applies nestjs overrides for no-empty-function', async () => {
    const config = await eslint.calculateConfigForFile(
      path.join(tempDir, 'sample.ts'),
    )
    const rule = config.rules?.['ts/no-empty-function'] as
      | [string, { allow?: string[] }]
      | undefined

    expect([2, 'error']).toContain(rule?.[0])
    expect(rule?.[1]?.allow).toEqual(
      expect.arrayContaining(['decoratedFunctions']),
    )
  })
})

function stripUnsupportedRules(configs: Linter.Config[]): Linter.Config[] {
  return configs.map((config) => {
    if (!config.rules) {
      return config
    }
    if (!Object.prototype.hasOwnProperty.call(config.rules, 'ts/ban-types')) {
      return config
    }
    const { 'ts/ban-types': _banTypes, ...rest } = config.rules
    return {
      ...config,
      ...(Object.keys(rest).length > 0 ? { rules: rest } : {}),
    }
  })
}
