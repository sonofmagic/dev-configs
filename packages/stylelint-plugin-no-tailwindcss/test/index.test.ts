import path from 'node:path'
import stylelint from 'stylelint'
import plugin, { isTailwindUtilityClass, ruleName } from '@/index'

const FIXTURE_DIR = path.resolve(__dirname, '..', 'fixtures')

describe('stylelint-plugin-no-tailwindcss', () => {
  it('detects Tailwind utility class candidates', async () => {
    await expect(isTailwindUtilityClass('flex')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('hover:bg-red-500')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('!mt-4')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('w-[10px]')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('[mask-type:luminance]')).resolves.toBe(true)
    await expect(isTailwindUtilityClass('card__body')).resolves.toBe(false)
  })

  it('reports declared Tailwind utility selectors', async () => {
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

  it('allows non-Tailwind selectors', async () => {
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
})
