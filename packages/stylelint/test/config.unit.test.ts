import {
  PRESET_RECESS_ORDER,
  PRESET_STANDARD_SCSS,
  PRESET_VUE_SCSS,
} from '@/constants'

async function loadConfig() {
  return import('@/config')
}

describe('createIcebreakerStylelintConfig', () => {
  afterEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    vi.unmock('node:module')
    vi.unmock('node:url')
  })

  it('returns defaults with presets enabled', async () => {
    const { createIcebreakerStylelintConfig } = await loadConfig()
    const config = createIcebreakerStylelintConfig()

    expect(config.extends).toEqual([
      expect.stringContaining(PRESET_STANDARD_SCSS),
      expect.stringContaining(PRESET_VUE_SCSS),
      expect.stringContaining(PRESET_RECESS_ORDER),
    ])
    expect(config.overrides).toEqual([])
    expect(config.rules?.['selector-class-pattern']).toBeDefined()
  })

  it('toggles presets and merges extends', async () => {
    const { createIcebreakerStylelintConfig } = await loadConfig()
    const config = createIcebreakerStylelintConfig({
      presets: {
        scss: false,
        vue: false,
        order: false,
      },
      extends: [
        'custom',
        'custom',
        'extra',
      ],
    })

    expect(config.extends).toEqual([
      'custom',
      'extra',
    ])
  })

  it('merges overrides and rules', async () => {
    const { createIcebreakerStylelintConfig } = await loadConfig()
    const overrides = [
      {
        files: ['**/*.scss'],
        rules: {
          'unit-no-unknown': null,
        },
      },
    ]

    const config = createIcebreakerStylelintConfig({
      overrides,
      ignores: {
        units: ['upx'],
        addUnits: ['rpx'],
        atRules: ['tailwind'],
        addAtRules: ['uno-layer'],
      },
      rules: {
        'selector-class-pattern': null,
      },
    })

    expect(config.overrides).toEqual(overrides)
    expect(config.rules?.['selector-class-pattern']).toBeNull()
    expect(config.rules?.['unit-no-unknown']).toEqual([
      true,
      {
        ignoreUnits: ['upx', 'rpx'],
      },
    ])
    expect(config.rules?.['scss/at-rule-no-unknown']).toEqual([
      true,
      {
        ignoreAtRules: ['tailwind', 'uno-layer'],
      },
    ])
  })

  it('falls back to module specifiers when resolution fails', async () => {
    vi.doMock('node:module', () => {
      return {
        createRequire: () => {
          return {
            resolve: () => {
              throw new Error('resolve failed')
            },
          }
        },
      }
    })

    vi.doMock('node:url', () => {
      return {
        fileURLToPath: () => {
          throw new Error('toPath failed')
        },
      }
    })

    const { createIcebreakerStylelintConfig } = await loadConfig()
    const config = createIcebreakerStylelintConfig()

    expect(config.extends).toEqual([
      PRESET_STANDARD_SCSS,
      PRESET_VUE_SCSS,
      PRESET_RECESS_ORDER,
    ])
  })

  it('uses import.meta.resolve when require resolve throws', async () => {
    vi.doMock('node:module', () => {
      return {
        createRequire: () => {
          return {
            resolve: () => {
              throw new Error('resolve failed')
            },
          }
        },
      }
    })

    const { createIcebreakerStylelintConfig } = await loadConfig()
    const config = createIcebreakerStylelintConfig()

    expect(config.extends).toEqual([
      expect.stringContaining(PRESET_STANDARD_SCSS),
      expect.stringContaining(PRESET_VUE_SCSS),
      expect.stringContaining(PRESET_RECESS_ORDER),
    ])
  })
})
