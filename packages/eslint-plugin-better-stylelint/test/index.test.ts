import { describe, expect, it, vi } from 'vitest'
import * as core from '@/core'
import plugin, { cssProcessor, lintRule } from '@/index'

describe('eslint-plugin-better-stylelint', () => {
  it('exports processors and rules', () => {
    expect(plugin.processors.css).toBe(cssProcessor)
    expect(plugin.rules.stylelint).toBe(lintRule)
  })

  it('processor forwards Stylelint diagnostics', () => {
    const spy = vi.spyOn(core, 'runStylelintSync').mockReturnValue([
      {
        ruleId: 'tailwindcss/no-apply',
        message: 'Unexpected Tailwind CSS @apply directive',
        line: 2,
        column: 3,
        severity: 2,
      },
    ])

    const filename = '/tmp/demo.css'
    cssProcessor.preprocess('.demo { @apply flex; }', filename)
    const messages = cssProcessor.postprocess([], filename)

    expect(spy).toHaveBeenCalledWith('.demo { @apply flex; }', filename)
    expect(messages).toHaveLength(1)
    expect(messages[0]?.ruleId).toBe('tailwindcss/no-apply')
  })

  it('vue rule reports Stylelint diagnostics', () => {
    const spy = vi.spyOn(core, 'runStylelintSync').mockReturnValue([
      {
        ruleId: 'tailwindcss/no-apply',
        message: 'Unexpected Tailwind CSS @apply directive',
        line: 4,
        column: 5,
        endLine: 4,
        endColumn: 11,
        severity: 2,
      },
    ])

    const report = vi.fn()
    const listeners = lintRule.create({
      filename: '/tmp/demo.vue',
      options: [],
      report,
      sourceCode: {
        text: '<style>.demo { @apply flex; }</style>',
      },
    })

    listeners.Program()

    expect(spy).toHaveBeenCalled()
    expect(report).toHaveBeenCalledTimes(1)
  })
})
