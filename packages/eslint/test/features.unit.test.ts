import type { TypedFlatConfigItem } from '@/types'
import { nestjsTypeScriptRules } from '@/defaults'
import {
  resolveAccessibilityPresets,
  resolveMdxPresets,
  resolveNestPresets,
  resolveQueryPresets,
  resolveStylelintBridgePresets,
  resolveTailwindPresets,
} from '@/features'
import * as utils from '@/utils'

const createStylelintProcessorMock = vi.fn((options?: Record<string, unknown>) => {
  return {
    __processor: 'stylelint',
    options,
  }
})

vi.mock('@/antfu', () => {
  return {
    interopDefault: async <T>(loader: Promise<T>): Promise<T> => {
      const mod = await loader
      return (mod as any)?.default ?? mod
    },
  }
})

const hasAllPackagesMock = vi.spyOn(utils, 'hasAllPackages')

vi.mock('eslint-plugin-better-stylelint', () => {
  return {
    default: {
      meta: {
        name: 'stylelint',
        version: '0.0.1',
      },
      processors: {
        css: {},
        scss: {},
      },
      rules: {
        stylelint: {},
      },
    },
    createStylelintProcessor: createStylelintProcessorMock,
  }
})

const mockRemarkProcessor = vi.fn((options: Record<string, unknown>) => {
  return { __processor: 'mdx', options }
})

vi.mock('eslint-plugin-better-tailwindcss', () => {
  const plugin = {
    configs: {
      'recommended-warn': {
        rules: {
          'better/warn': 'warn',
        },
      },
      'recommended-error': {
        rules: {
          'better/error': 'error',
        },
      },
    },
  }
  return { default: plugin }
})

vi.mock('eslint-plugin-tailwindcss', () => {
  const plugin = {
    configs: {
      'flat/recommended': {
        name: 'tailwind-flat',
        rules: {
          'tailwindcss/classnames-order': 'error',
        },
      },
    },
  }
  return { default: plugin }
})

vi.mock('eslint-plugin-mdx', () => {
  const plugin = {
    flat: {
      name: 'mdx-flat',
      rules: {
        'mdx/no-jsx-curly': 'off',
      },
    },
    flatCodeBlocks: {
      name: 'mdx-code-blocks',
      rules: {
        'mdx/no-unescaped-entities': 'warn',
      },
    },
    createRemarkProcessor: mockRemarkProcessor,
  }
  return { default: plugin }
})

vi.mock('eslint-plugin-vuejs-accessibility', () => {
  const plugin = {
    configs: {
      'flat/recommended': {
        name: 'vue-a11y-flat',
      },
    },
  }
  return { default: plugin }
})

vi.mock('eslint-plugin-jsx-a11y', () => {
  const plugin = {
    flatConfigs: {
      recommended: {
        name: 'jsx-a11y-flat',
      },
    },
  }
  return { default: plugin }
})

vi.mock('@tanstack/eslint-plugin-query', () => {
  const plugin = {
    configs: {
      'flat/recommended': {
        name: 'tanstack-query-flat',
      },
    },
  }
  return { default: plugin }
})

describe('resolveTailwindPresets', () => {
  beforeEach(() => {
    hasAllPackagesMock.mockReturnValue(true)
  })

  it('returns empty array when disabled', () => {
    expect(resolveTailwindPresets(false)).toEqual([])
  })

  it('returns empty array when undefined', () => {
    expect(resolveTailwindPresets(undefined)).toEqual([])
  })

  it('wires up better-tailwindcss when an object config is provided', async () => {
    const [configPromise] = resolveTailwindPresets({
      entryPoint: 'src/main.css',
      tailwindConfig: 'tailwind.config.js',
    })

    const config = await configPromise as TypedFlatConfigItem
    expect(config.plugins?.['better-tailwindcss']).toBeDefined()
    expect(config.rules).toMatchObject({
      'better/warn': 'warn',
      'better/error': 'error',
    })
    expect(config.settings?.['better-tailwindcss']).toEqual({
      entryPoint: 'src/main.css',
      tailwindConfig: 'tailwind.config.js',
    })
  })

  it('falls back to eslint-plugin-tailwindcss when enabled as boolean', async () => {
    const [tailwindPreset, overrides] = resolveTailwindPresets(true)

    await expect(tailwindPreset).resolves.toMatchObject({ name: 'tailwind-flat' })
    expect(overrides).toEqual({
      rules: {
        'tailwindcss/no-custom-classname': 'off',
      },
    })
  })

  it('returns empty array when the requested tailwind plugin is unavailable', () => {
    hasAllPackagesMock.mockReturnValue(false)

    expect(resolveTailwindPresets(true)).toEqual([])
    expect(resolveTailwindPresets({ tailwindConfig: 'tailwind.config.js' })).toEqual([])
  })
})

describe('resolveMdxPresets', () => {
  beforeEach(() => {
    hasAllPackagesMock.mockReturnValue(true)
  })

  it('returns empty array when disabled', () => {
    expect(resolveMdxPresets(false)).toEqual([])
  })

  it('returns the mdx flat presets with a remark processor', async () => {
    const [mdxPromise] = resolveMdxPresets(true)
    const [lintConfig, blockConfig] = await mdxPromise as TypedFlatConfigItem[]

    expect(mockRemarkProcessor).toHaveBeenCalledWith({
      lintCodeBlocks: true,
      languageMapper: {},
    })
    expect(lintConfig).toMatchObject({
      name: 'mdx-flat',
      processor: {
        __processor: 'mdx',
        options: {
          lintCodeBlocks: true,
          languageMapper: {},
        },
      },
    })
    expect(blockConfig).toMatchObject({
      name: 'mdx-code-blocks',
      rules: {
        'mdx/no-unescaped-entities': 'warn',
      },
    })
  })

  it('returns empty array when the mdx plugin is unavailable', () => {
    hasAllPackagesMock.mockReturnValue(false)

    expect(resolveMdxPresets(true)).toEqual([])
  })
})

describe('resolveAccessibilityPresets', () => {
  beforeEach(() => {
    hasAllPackagesMock.mockReturnValue(true)
  })

  it('early returns when disabled', () => {
    expect(resolveAccessibilityPresets(false, false, false)).toEqual([])
  })

  it('returns empty array when enabled without frameworks', () => {
    expect(resolveAccessibilityPresets(true, false, false)).toEqual([])
  })

  it('includes vue accessibility presets when vue is enabled', async () => {
    const [preset] = resolveAccessibilityPresets(true, true, false)
    await expect(preset).resolves.toMatchObject({ name: 'vue-a11y-flat' })
  })

  it('includes react accessibility presets when react is enabled', async () => {
    const [preset] = resolveAccessibilityPresets(true, false, true)
    await expect(preset).resolves.toMatchObject({ name: 'jsx-a11y-flat' })
  })

  it('returns both vue and react presets when enabled', async () => {
    const [vuePreset, reactPreset] = resolveAccessibilityPresets(true, true, true)
    await expect(vuePreset).resolves.toMatchObject({ name: 'vue-a11y-flat' })
    await expect(reactPreset).resolves.toMatchObject({ name: 'jsx-a11y-flat' })
  })

  it('skips unavailable accessibility plugins without throwing', () => {
    hasAllPackagesMock.mockReturnValue(false)

    expect(resolveAccessibilityPresets(true, true, true)).toEqual([])
  })
})

describe('resolveNestPresets', () => {
  it('returns empty array when disabled', () => {
    expect(resolveNestPresets(false)).toEqual([])
  })

  it('provides the nest specific rules when enabled', () => {
    expect(resolveNestPresets(true)).toEqual([
      {
        name: 'icebreaker/nestjs/rules',
        rules: nestjsTypeScriptRules,
      },
    ])
  })
})

describe('resolveQueryPresets', () => {
  beforeEach(() => {
    hasAllPackagesMock.mockReturnValue(true)
  })

  it('returns empty array when disabled', () => {
    expect(resolveQueryPresets(false)).toEqual([])
  })

  it('resolves the tanstack query recommended preset when enabled', async () => {
    const [preset] = resolveQueryPresets(true)
    await expect(preset).resolves.toMatchObject({ name: 'tanstack-query-flat' })
  })

  it('returns empty array when the tanstack query plugin is unavailable', () => {
    hasAllPackagesMock.mockReturnValue(false)

    expect(resolveQueryPresets(true)).toEqual([])
  })
})

describe('resolveStylelintBridgePresets', () => {
  beforeEach(() => {
    createStylelintProcessorMock.mockClear()
    hasAllPackagesMock.mockReturnValue(true)
  })

  it('returns empty array when disabled', () => {
    expect(resolveStylelintBridgePresets(false)).toEqual([])
  })

  it('returns empty array when the stylelint bridge plugin is unavailable', () => {
    hasAllPackagesMock.mockReturnValue(false)

    expect(resolveStylelintBridgePresets(true)).toEqual([])
  })

  it('returns async presets for css, scss, and vue when enabled', async () => {
    const presets = resolveStylelintBridgePresets({
      cwd: '/tmp/project',
      presets: {
        order: false,
      },
      rules: {
        'color-named': 'never',
      },
    })
    expect(presets).toHaveLength(3)

    const [cssPreset, scssPreset, vuePreset] = await Promise.all(presets as Promise<TypedFlatConfigItem>[])
    const expectedStylelintOptions = {
      cwd: '/tmp/project',
      configLoader: expect.stringMatching(/stylelint\.(ts|js)$/u),
      configOptions: {
        presets: {
          order: false,
        },
        rules: {
          'color-named': 'never',
        },
      },
    }

    expect(createStylelintProcessorMock).toHaveBeenCalledTimes(2)
    expect(createStylelintProcessorMock).toHaveBeenNthCalledWith(1, expectedStylelintOptions)
    expect(createStylelintProcessorMock).toHaveBeenNthCalledWith(2, expectedStylelintOptions)

    expect(cssPreset).toMatchObject({
      files: ['**/*.{css,pcss,postcss}'],
      processor: {
        __processor: 'stylelint',
        options: expectedStylelintOptions,
      },
    })
    expect(scssPreset).toMatchObject({
      files: ['**/*.{scss,sass}'],
      processor: {
        __processor: 'stylelint',
        options: expectedStylelintOptions,
      },
    })
    expect(vuePreset).toMatchObject({
      files: ['**/*.vue'],
      rules: {
        'stylelint/stylelint': ['error', expectedStylelintOptions],
      },
    })
  })

  it('omits cwd from stylelint bridge options when not provided', async () => {
    vi.doMock('eslint-plugin-better-stylelint', () => {
      return {
        default: {
          meta: {
            name: 'stylelint',
            version: '0.0.1',
          },
          processors: {
            css: {},
            scss: {},
          },
          rules: {
            stylelint: {},
          },
        },
        createStylelintProcessor: createStylelintProcessorMock,
      }
    })

    const presets = resolveStylelintBridgePresets(true)
    await Promise.all(presets as Promise<TypedFlatConfigItem>[])

    expect(createStylelintProcessorMock).toHaveBeenNthCalledWith(1, {
      configLoader: expect.stringMatching(/stylelint\.(ts|js)$/u),
      configOptions: {},
    })
  })

  it('supports an object form with only stylelint config options', async () => {
    vi.doMock('eslint-plugin-better-stylelint', () => {
      return {
        default: {
          meta: {
            name: 'stylelint',
            version: '0.0.1',
          },
          processors: {
            css: {},
            scss: {},
          },
          rules: {
            stylelint: {},
          },
        },
        createStylelintProcessor: createStylelintProcessorMock,
      }
    })

    const presets = resolveStylelintBridgePresets({
      rules: {
        'color-named': 'never',
      },
    })
    await Promise.all(presets as Promise<TypedFlatConfigItem>[])

    expect(createStylelintProcessorMock).toHaveBeenNthCalledWith(1, {
      configLoader: expect.stringMatching(/stylelint\.(ts|js)$/u),
      configOptions: {
        rules: {
          'color-named': 'never',
        },
      },
    })
  })
})
