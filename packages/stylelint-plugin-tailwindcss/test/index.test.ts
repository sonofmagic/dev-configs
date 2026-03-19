import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import stylelint from 'stylelint'
import defaultConfig, {
  base,
  isTailwindUtilityClass,
  noApplyPlugin,
  noApplyRuleName,
  noArbitraryValuePlugin,
  noArbitraryValueRuleName,
  noAtomicClassPlugin,
  noAtomicClassRuleName,
  noCssLayerPlugin,
  noCssLayerRuleName,
  noImportDirectivePlugin,
  noImportDirectiveRuleName,
  noInvalidApplyPlugin,
  noInvalidApplyRuleName,
  noInvalidThemeFunctionPlugin,
  noInvalidThemeFunctionRuleName,
  noScreenDirectivePlugin,
  noScreenDirectiveRuleName,
  noTailwindDirectivePlugin,
  noTailwindDirectiveRuleName,
  noThemeFunctionPlugin,
  noThemeFunctionRuleName,
  recommended,
  strict,
  tailwindBase,
  tailwindRecommended,
  tailwindStrict,
  UNOCSS_NO_APPLY_RULE_NAME,
  UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME,
  UNOCSS_NO_ATOMIC_CLASS_RULE_NAME,
  UNOCSS_NO_INVALID_APPLY_RULE_NAME,
  UNOCSS_NO_VARIANT_GROUP_RULE_NAME,
  unocssBase,
  unocssRecommended,
  unocssStrict,
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

  it('exports base, recommended, and strict configs', () => {
    expect(base).toEqual({
      plugins: [
        noAtomicClassPlugin,
        noInvalidApplyPlugin,
        unocssBase.plugins[0],
        unocssBase.plugins[1],
      ],
      rules: {
        [noAtomicClassRuleName]: true,
        [noInvalidApplyRuleName]: true,
        [UNOCSS_NO_ATOMIC_CLASS_RULE_NAME]: true,
        [UNOCSS_NO_INVALID_APPLY_RULE_NAME]: true,
      },
    })
    expect(recommended).toEqual(defaultConfig)
    expect(recommended.rules).toEqual({
      [noAtomicClassRuleName]: true,
      [noInvalidApplyRuleName]: true,
      [noApplyRuleName]: true,
      [noArbitraryValueRuleName]: true,
      [noInvalidThemeFunctionRuleName]: true,
      [UNOCSS_NO_ATOMIC_CLASS_RULE_NAME]: true,
      [UNOCSS_NO_INVALID_APPLY_RULE_NAME]: true,
      [UNOCSS_NO_APPLY_RULE_NAME]: true,
      [UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME]: true,
      [UNOCSS_NO_VARIANT_GROUP_RULE_NAME]: true,
    })
    expect(tailwindBase.rules).toEqual({
      [noAtomicClassRuleName]: true,
      [noInvalidApplyRuleName]: true,
    })
    expect(tailwindRecommended.rules).toEqual({
      [noAtomicClassRuleName]: true,
      [noInvalidApplyRuleName]: true,
      [noApplyRuleName]: true,
      [noArbitraryValueRuleName]: true,
      [noInvalidThemeFunctionRuleName]: true,
    })
    expect(strict.rules).toEqual({
      [noAtomicClassRuleName]: true,
      [noInvalidApplyRuleName]: true,
      [noApplyRuleName]: true,
      [noArbitraryValueRuleName]: true,
      [noThemeFunctionRuleName]: true,
      [noInvalidThemeFunctionRuleName]: true,
      [noScreenDirectiveRuleName]: true,
      [noTailwindDirectiveRuleName]: true,
      [noImportDirectiveRuleName]: true,
      [noCssLayerRuleName]: true,
      [UNOCSS_NO_ATOMIC_CLASS_RULE_NAME]: true,
      [UNOCSS_NO_INVALID_APPLY_RULE_NAME]: true,
      [UNOCSS_NO_APPLY_RULE_NAME]: true,
      [UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME]: true,
      [UNOCSS_NO_VARIANT_GROUP_RULE_NAME]: true,
    })
    expect(tailwindStrict.rules).toEqual({
      [noAtomicClassRuleName]: true,
      [noInvalidApplyRuleName]: true,
      [noApplyRuleName]: true,
      [noArbitraryValueRuleName]: true,
      [noThemeFunctionRuleName]: true,
      [noInvalidThemeFunctionRuleName]: true,
      [noScreenDirectiveRuleName]: true,
      [noTailwindDirectiveRuleName]: true,
      [noImportDirectiveRuleName]: true,
      [noCssLayerRuleName]: true,
    })
    expect(unocssBase.rules).toEqual({
      [UNOCSS_NO_ATOMIC_CLASS_RULE_NAME]: true,
      [UNOCSS_NO_INVALID_APPLY_RULE_NAME]: true,
    })
    expect(unocssRecommended.rules).toEqual({
      [UNOCSS_NO_ATOMIC_CLASS_RULE_NAME]: true,
      [UNOCSS_NO_INVALID_APPLY_RULE_NAME]: true,
      [UNOCSS_NO_APPLY_RULE_NAME]: true,
      [UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME]: true,
      [UNOCSS_NO_VARIANT_GROUP_RULE_NAME]: true,
    })
    expect(unocssStrict).toEqual(unocssRecommended)
  })

  it('works with the exported recommended config directly', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  @apply rounded-lg;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: recommended,
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(result.errored).toBe(true)
    expect(warnings.some(warning => warning.rule === noApplyRuleName)).toBe(true)
  })

  it('supports disabling one namespace while keeping the other', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  @apply rounded-lg;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        ...recommended,
        rules: {
          ...recommended.rules,
          [UNOCSS_NO_APPLY_RULE_NAME]: false,
          [UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME]: false,
          [UNOCSS_NO_ATOMIC_CLASS_RULE_NAME]: false,
          [UNOCSS_NO_INVALID_APPLY_RULE_NAME]: false,
        },
      },
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(warnings.some(warning => warning.rule === noApplyRuleName)).toBe(true)
    expect(warnings.some(warning => warning.rule === UNOCSS_NO_APPLY_RULE_NAME)).toBe(false)
  })

  it('reports the Tailwind architecture rules when strict is used', async () => {
    const result = await stylelint.lint({
      code: [
        '@import "tailwindcss";',
        '@tailwind utilities;',
        '@screen md {',
        '  .button {',
        '    color: theme(colors.gray.900 / 75%);',
        '  }',
        '}',
        '@layer utilities {',
        '  .button {',
        '    color: red;',
        '  }',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: strict,
    })

    const warnings = result.results[0]?.warnings ?? []

    expect(warnings.some(warning => warning.rule === noImportDirectiveRuleName)).toBe(true)
    expect(warnings.some(warning => warning.rule === noTailwindDirectiveRuleName)).toBe(true)
    expect(warnings.some(warning => warning.rule === noScreenDirectiveRuleName)).toBe(true)
    expect(warnings.some(warning => warning.rule === noThemeFunctionRuleName)).toBe(true)
    expect(warnings.some(warning => warning.rule === noCssLayerRuleName)).toBe(true)
  })

  it('reports with the unocss namespace when only unocss rules are enabled', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  @apply rounded-lg;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: unocssRecommended,
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(result.errored).toBe(true)
    expect(warnings.some(warning => warning.rule === UNOCSS_NO_APPLY_RULE_NAME)).toBe(true)
    expect(warnings.some(warning => warning.text.includes('UnoCSS'))).toBe(true)
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
        plugins: [noAtomicClassPlugin],
        rules: {
          [noAtomicClassRuleName]: true,
        },
      },
    })

    const warnings = result.results[0]?.warnings ?? []
    expect(result.errored).toBe(true)
    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.rule).toBe(noAtomicClassRuleName)
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
        plugins: [noAtomicClassPlugin],
        rules: {
          [noAtomicClassRuleName]: true,
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
      await expect(isTailwindUtilityClass('w-10px', cssFile)).resolves.toBe(true)
      await expect(isTailwindUtilityClass('top--10px', cssFile)).resolves.toBe(true)
      await expect(isTailwindUtilityClass('bg-$brand', cssFile)).resolves.toBe(true)
      await expect(isTailwindUtilityClass('text-rgb(255,0,0)', cssFile)).resolves.toBe(true)
      await expect(isTailwindUtilityClass('translate-x-50%', cssFile)).resolves.toBe(true)
      await expect(isTailwindUtilityClass('[&>*]:w-10px', cssFile)).resolves.toBe(true)
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

  it('reports theme() calls when no-theme-function is enabled', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  color: theme(colors.gray.900 / 75%);',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noThemeFunctionPlugin],
        rules: {
          [noThemeFunctionRuleName]: true,
        },
      },
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === noThemeFunctionRuleName,
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.text).toContain('colors.gray.900 / 75%')
  })

  it('does not enable the opinionated Tailwind migration rules in tailwindRecommended', async () => {
    const result = await stylelint.lint({
      code: [
        '@import "tailwindcss";',
        '@tailwind utilities;',
        '@screen md {',
        '  .button {',
        '    color: theme(colors.gray.900 / 75%);',
        '  }',
        '}',
        '@layer utilities {',
        '  .button {',
        '    color: red;',
        '  }',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: tailwindRecommended,
    })

    const warnings = result.results[0]?.warnings ?? []

    expect(warnings.some(warning => warning.rule === noTailwindDirectiveRuleName)).toBe(false)
    expect(warnings.some(warning => warning.rule === noImportDirectiveRuleName)).toBe(false)
    expect(warnings.some(warning => warning.rule === noScreenDirectiveRuleName)).toBe(false)
    expect(warnings.some(warning => warning.rule === noThemeFunctionRuleName)).toBe(false)
    expect(warnings.some(warning => warning.rule === noCssLayerRuleName)).toBe(false)
  })

  it('reports invalid theme() calls when no-invalid-theme-function is enabled', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  color: theme(colors.not-exist.123);',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noInvalidThemeFunctionPlugin],
        rules: {
          [noInvalidThemeFunctionRuleName]: true,
        },
      },
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === noInvalidThemeFunctionRuleName,
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.text).toContain('colors.not-exist.123')
  })

  it('reports @screen directives when no-screen-directive is enabled', async () => {
    const result = await stylelint.lint({
      code: [
        '@screen md {',
        '  .button {',
        '    color: red;',
        '  }',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noScreenDirectivePlugin],
        rules: {
          [noScreenDirectiveRuleName]: true,
        },
      },
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === noScreenDirectiveRuleName,
    )

    expect(warnings).toHaveLength(1)
  })

  it('reports @tailwind directives when no-tailwind-directive is enabled', async () => {
    const result = await stylelint.lint({
      code: '@tailwind utilities;',
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noTailwindDirectivePlugin],
        rules: {
          [noTailwindDirectiveRuleName]: true,
        },
      },
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === noTailwindDirectiveRuleName,
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.text).not.toContain('Unknown rule')
    expect(warnings[0]?.text).toContain('@tailwind')
  })

  it('reports tailwind imports when no-import-directive is enabled', async () => {
    const result = await stylelint.lint({
      code: '@import "tailwindcss";',
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noImportDirectivePlugin],
        rules: {
          [noImportDirectiveRuleName]: true,
        },
      },
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === noImportDirectiveRuleName,
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.text).not.toContain('Unknown rule')
    expect(warnings[0]?.text).toContain('tailwindcss')
  })

  it('reports @layer directives when no-css-layer is enabled', async () => {
    const result = await stylelint.lint({
      code: [
        '@layer utilities {',
        '  .button {',
        '    color: red;',
        '  }',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: {
        plugins: [noCssLayerPlugin],
        rules: {
          [noCssLayerRuleName]: true,
        },
      },
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === noCssLayerRuleName,
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.text).toContain('utilities')
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
        '.w-10px {',
        '  width: 10px;',
        '}',
        '',
        '.w-50\\% {',
        '  width: 50%;',
        '}',
        '',
        '.top--10px {',
        '  top: -10px;',
        '}',
        '',
        '.bg-\\$brand {',
        '  background: var(--brand);',
        '}',
        '',
        '.text-rgb\\(255\\,0\\,0\\) {',
        '  color: rgb(255 0 0);',
        '}',
        '',
        '.translate-x-50\\% {',
        '  translate: 50% 0;',
        '}',
        '',
        '.outline-\\#fff {',
        '  outline-color: #fff;',
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
        '  @apply w-[10px] w-10px w-50% top--10px bg-$brand text-rgb(255,0,0) translate-x-50% outline-#fff [&>*]:w-10px [mask-type:luminance];',
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

  it('reports unocss bare arbitrary value selectors only in the unocss namespace', async () => {
    const result = await stylelint.lint({
      code: [
        '.w-10px {',
        '  width: 10px;',
        '}',
        '',
        '.w-50\\% {',
        '  width: 50%;',
        '}',
        '',
        '.top--10px {',
        '  top: -10px;',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: unocssRecommended,
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME,
    )

    expect(result.errored).toBe(true)
    expect(warnings).toHaveLength(3)
    expect(warnings[0]?.text).toContain('w-10px')
    expect(warnings[1]?.text).toContain('w-50%')
    expect(warnings[2]?.text).toContain('top--10px')
  })

  it('reports unocss variant groups only in the unocss namespace', async () => {
    const result = await stylelint.lint({
      code: [
        '.button {',
        '  @apply hover:(bg-red-500 text-white);',
        '}',
      ].join('\n'),
      codeFilename: path.join(FIXTURE_DIR, 'sample.css'),
      config: unocssRecommended,
    })

    const warnings = (result.results[0]?.warnings ?? []).filter(
      warning => warning.rule === UNOCSS_NO_VARIANT_GROUP_RULE_NAME,
    )

    expect(warnings).toHaveLength(1)
    expect(warnings[0]?.text).toContain('hover:(bg-red-500 text-white)')
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
