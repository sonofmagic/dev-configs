import { setVscodeSettingsJson } from '@/shared'

describe('setVscodeSettingsJson', () => {
  it('adds default validations when no stylelint.validate exists', () => {
    const result = setVscodeSettingsJson({})

    expect(result['css.validate']).toBe(false)
    expect(result['less.validate']).toBe(false)
    expect(result['scss.validate']).toBe(false)
    expect(result['stylelint.validate']).toEqual(expect.arrayContaining(['vue', 'css', 'scss']))
  })

  it('keeps existing validate entries and filters non-string items', () => {
    const result = setVscodeSettingsJson({
      'stylelint.validate': ['css', 123, null, 'custom'],
    })

    expect(result['stylelint.validate']).toEqual(expect.arrayContaining(['css', 'custom', 'vue', 'scss']))
  })

  it('handles non-array values gracefully', () => {
    const result = setVscodeSettingsJson({
      'stylelint.validate': 'scss',
    })

    expect(result['stylelint.validate']).toEqual(expect.arrayContaining(['vue', 'css', 'scss']))
  })
})
