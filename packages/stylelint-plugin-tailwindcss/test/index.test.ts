import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import stylelint from 'stylelint'
import plugin, {
  noApplyPlugin,
  noApplyRuleName,
  noArbitraryValuePlugin,
  noArbitraryValueRuleName,
  isTailwindUtilityClass,
  noInvalidApplyPlugin,
  noInvalidApplyRuleName,
  ruleName,
} from '@/index'

const FIXTURE_DIR = path.resolve(__dirname, '..', 'fixtures')

describe('stylelint-plugin-tailwindcss', () => {
  it('detects utility class candidates', async () => {
    await expect(isTailwindUtilityClass('flex')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('hover:bg-red-500')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('!mt-4')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('w-[10px]')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('[mask-type:luminance]')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('card__body')).resolves.toBe(false)
  })

  it('reports declared utility selectors', async () => {
    const result = await stylelint.lint({
      code: [
        '.card {',
        '  color: red;',
        '}',
        '',
        '.flex {',
        '  display: flex;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [plugin],
        rules: {
          [ruleName]: true,
        },
      },
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(result.errored).toBe(true)
    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.rule).toBe(ruleName)
    expect(warnings[0]?.text).toContain('.flex')
  })

  it('allows non-utility selectors', async () => {
    const result = await stylelint.lint({
      code: [
        '.page-shell {',
        '  display: grid;',
        '}',
        '',
        '.card__body--primary {',
        '  color: red;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [plugin],
        rules: {
          [ruleName]: true,
        },
      },
    })

    expect(result.errored).toBe(false)
    expect(result.results[0]?.warnings ?? []).toEqual([])
  })

  it('falls back to heuristic detection when tailwindcss is not installed', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'stylelint-tailwindcss-'))
    const cssFile = path.join(tempDir, 'sample.css')
    await fs.writeFile(cssFile, '.demo {}', 'utf8')

    try {
      await expect(isTailwindUtilityClass('flex', cssFile)).resolves.toBe(true)
      await expect(isTailwindUtilityClass('hover:bg-red-500', cssFile)).resolves.toBe(true)
      await expect(isTailwindUtilityClass('w-[10px]', cssFile)).resolves.toBe(true)
      await expect(isTailwindUtilityClass('card__body', cssFile)).resolves.toBe(false)
    }
    finally {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
  })

  it('reports invalid @apply utility candidates', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  @apply bg-rd-500 rounded-lg;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noInvalidApplyPlugin],
        rules: {
          [noInvalidApplyRuleName]: true,
        },
      },
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(result.errored).toBe(true)
    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.rule).toBe(noInvalidApplyRuleName)
    expect(warnings[0]?.text).toContain('bg-rd-500')
  })

  it('ignores semantic @apply candidates that do not look utility-like', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  @apply button-base;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noInvalidApplyPlugin],
        rules: {
          [noInvalidApplyRuleName]: true,
        },
      },
    })

    expect(result.errored).toBe(false)
    expect(result.results[0]?.warnings ?? []).toEqual([])
  })

  it('reports any @apply usage when no-apply is enabled', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  @apply rounded-lg px-4;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noApplyPlugin],
        rules: {
          [noApplyRuleName]: true,
        },
      },
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(result.errored).toBe(true)
    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.rule).toBe(noApplyRuleName)
    expect(warnings[0]?.text).toContain('@apply')
  })

  it('reports arbitrary value selectors when no-arbitrary-value is enabled', async () => {
    const result = await stylelint.lint({
      code: [
        '.card {',
        '  color: red;',
        '}',
        '',
        '.w-\\[10px\\] {',
        '  width: 10px;',
        '}',
        '',
        '.\\[mask-type\\:luminance\\] {',
        '  mask-type: luminance;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noArbitraryValuePlugin],
        rules: {
          [noArbitraryValueRuleName]: true,
        },
      },
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(result.errored).toBe(true)
    expect(warnings).toHaveLength(2)
    expect(warnings[0]?.rule).toBe(noArbitraryValueRuleName)
    expect(warnings[0]?.text).toContain('w-[10px]')
    expect(warnings[1]?.text).toContain('[mask-type:luminance]')
  })

  it('reports arbitrary value @apply candidates when no-arbitrary-value is enabled', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  @apply w-[10px] [mask-type:luminance];',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noArbitraryValuePlugin],
        rules: {
          [noArbitraryValueRuleName]: true,
        },
      },
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(result.errored).toBe(true)
    expect(warnings).toHaveLength(2)
    expect(warnings[0]?.rule).toBe(noArbitraryValueRuleName)
    expect(warnings[0]?.text).toContain('w-[10px]')
    expect(warnings[1]?.text).toContain('[mask-type:luminance]')
  })

  it('ignores semantic selectors when no-arbitrary-value is enabled', async () => {
    const result = await stylelint.lint({
      code: [
        '.card-[featured] {',
        '  color: red;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noArbitraryValuePlugin],
        rules: {
          [noArbitraryValueRuleName]: true,
        },
      },
    })

    expect(result.errored).toBe(false)
    expect(result.results[0]?.warnings ?? []).toEqual([])
  })
})
