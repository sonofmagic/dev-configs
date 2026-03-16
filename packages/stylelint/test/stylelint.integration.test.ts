import type { Config as StylelintConfig } from 'stylelint'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import stylelint from 'stylelint'
import {
  noInvalidApplyRuleName,
  ruleName as noTailwindcssRuleName,
} from 'stylelint-plugin-tailwindcss'
import { PRESET_RECESS_ORDER, PRESET_VUE_SCSS } from '@/constants'
import { createStylelintConfig, icebreaker } from '@/index'

const ROOT_DIR = path.resolve(__dirname, '..')
const FIXTURE_DIR = path.join(ROOT_DIR, 'fixtures')

describe('stylelint integration', () => {
  it('uses prefix media feature notation to stay aligned with prettier output', async () => {
    const validResult = await stylelint.lint({
      code: [
        '@media (max-width: 480px) {',
        '  .demo {',
        '    color: red;',
        '  }',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'media-query.css'),
      config: icebreaker() as StylelintConfig,
    })
    const invalidResult = await stylelint.lint({
      code: [
        '@media (width <= 480px) {',
        '  .demo {',
        '    color: red;',
        '  }',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'media-query.css'),
      config: icebreaker() as StylelintConfig,
    })

    expect(validResult.errored).toBe(false)
    expect(validResult.results[0]?.warnings ?? []).toEqual([])

    const mediaWarnings = (invalidResult.results[0]?.warnings ?? []).filter(
      warning => warning.rule === 'media-feature-range-notation',
    )

    expect(invalidResult.errored).toBe(true)
    expect(mediaWarnings).toHaveLength(1)
  })

  it('ignores rpx, page, and tailwind/unocss at-rules by default', async () => {
    const result = await stylelint.lint({
      code: [
        'page {',
        '  width: 10rpx;',
        '}',
        '',
        '@tailwind base;',
        '@unocss preflights;',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: icebreaker() as StylelintConfig,
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(result.errored).toBe(false)
    expect(warnings).toEqual([])
  })

  it('reports Tailwind utility selector declarations by default', async () => {
    const result = await stylelint.lint({
      code: [
        '.page-shell {',
        '  display: block;',
        '}',
        '',
        '.flex {',
        '  display: flex;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: icebreaker() as StylelintConfig,
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === noTailwindcssRuleName,
    )

    expect(result.errored).toBe(true)
    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.text).toContain('.flex')
  })

  it('reports invalid @apply candidates by default', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  @apply bg-rd-500 rounded-lg;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: icebreaker() as StylelintConfig,
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === noInvalidApplyRuleName,
    )

    expect(result.errored).toBe(true)
    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.text).toContain('bg-rd-500')
  })

  it('replaces ignore units and reports rpx when removed', async () => {
    const result = await stylelint.lint({
      code: [
        '.btn {',
        '  width: 1rpx;',
        '  height: 1upx;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: createStylelintConfig({
        ignores: {
          units: ['upx'],
        },
      }) as StylelintConfig,
    })

    const unitWarnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === 'unit-no-unknown',
    )

    expect(result.errored).toBe(true)
    expect(unitWarnings.length).toBe(1)
    expect(unitWarnings[0]?.text).toContain('rpx')
  })

  it('replaces at-rule ignores and keeps appended entries', async () => {
    const result = await stylelint.lint({
      code: [
        '@unocss preflights;',
        '@uno-layer utilities;',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.scss'),
      customSyntax: 'postcss-scss',
      config: createStylelintConfig({
        ignores: {
          atRules: ['tailwind'],
          addAtRules: ['uno-layer'],
        },
      }) as StylelintConfig,
    })

    const atRuleWarnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === 'scss/at-rule-no-unknown',
    )

    expect(atRuleWarnings.some(warning => warning.text.includes('unocss')))
      .toBe(true)
    expect(atRuleWarnings.some(warning => warning.text.includes('uno-layer')))
      .toBe(false)
  })

  it('drops vue/order presets when disabled', () => {
    const config = createStylelintConfig({
      presets: {
        vue: false,
        order: false,
      },
    })
    const extendsList = Array.isArray(config.extends)
      ? config.extends
      : config.extends
        ? [config.extends]
        : []

    expect(
      extendsList.some(entry => String(entry).includes(PRESET_VUE_SCSS)),
    ).toBe(false)
    expect(
      extendsList.some(entry => String(entry).includes(PRESET_RECESS_ORDER)),
    ).toBe(false)
  })

  it('writes vscode settings via the cli entry', async () => {
    const tempDir = await fs.mkdtemp(
      path.join(os.tmpdir(), 'icebreaker-stylelint-'),
    )
    const previousCwd = process.cwd()

    process.chdir(tempDir)
    try {
      vi.resetModules()
      await import('@/cli')

      const settingsPath = path.join(tempDir, '.vscode', 'settings.json')
      const settings = await fs.readFile(settingsPath, 'utf8')
      expect(settings).toContain('stylelint.validate')
    }
    finally {
      process.chdir(previousCwd)
    }
  })
})
