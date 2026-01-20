import { PRESET_RECESS_ORDER, PRESET_STANDARD_SCSS, PRESET_VUE_SCSS } from '@/constants'
import { createStylelintConfig, icebreaker } from '@/index'
import { setVscodeSettingsJson } from '@/shared'

function normalizePresetPath(value: string) {
  if (value.includes(PRESET_STANDARD_SCSS)) {
    return PRESET_STANDARD_SCSS
  }
  if (value.includes(PRESET_VUE_SCSS)) {
    return PRESET_VUE_SCSS
  }
  if (value.includes(PRESET_RECESS_ORDER)) {
    return PRESET_RECESS_ORDER
  }
  return value
}

describe('index', () => {
  it('setVscodeSettingsJson case 0', () => {
    expect(setVscodeSettingsJson()).toMatchSnapshot()
  })

  it('setVscodeSettingsJson case 1', () => {
    expect(setVscodeSettingsJson({
      'stylelint.validate': [
        'vue',
        'scss',
        'css',
      ],
    })).toMatchSnapshot()
  })

  it('common', () => {
    const config = icebreaker()

    expect(config.extends).toEqual([
      expect.stringContaining(PRESET_STANDARD_SCSS),
      expect.stringContaining(PRESET_VUE_SCSS),
      expect.stringContaining(PRESET_RECESS_ORDER),
    ])

    expect({
      ...config,
      extends: (config.extends ?? []).map((item) => {
        return typeof item === 'string' ? normalizePresetPath(item) : item
      }),
    }).toMatchSnapshot()
  })

  it('createStylelintConfig toggles presets', () => {
    const config = createStylelintConfig({
      presets: {
        vue: false,
        order: false,
      },
      extends: 'my-custom-config',
    })

    expect(config.extends).toEqual([
      expect.stringContaining(PRESET_STANDARD_SCSS),
      'my-custom-config',
    ])
  })

  it('createStylelintConfig custom ignores', () => {
    const config = createStylelintConfig({
      ignores: {
        units: [],
        addUnits: ['upx'],
        atRules: ['tailwind'],
        addAtRules: ['uno-layer'],
      },
    })

    expect(config.rules?.['unit-no-unknown']).toEqual([
      true,
      {
        ignoreUnits: ['upx'],
      },
    ])

    expect(config.rules?.['scss/at-rule-no-unknown']).toEqual([
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'uno-layer',
        ],
      },
    ])
  })

  it('merges overrides in icebreaker configs', () => {
    const config = icebreaker({
      rules: {
        'selector-class-pattern': null,
      },
    })

    expect(config.rules?.['selector-class-pattern']).toBeNull()
  })
})
