import { nestjsTypeScriptRules } from '@/defaults'
import {
  resolveAccessibilityPresets,
  resolveMdxPresets,
  resolveNestPresets,
  resolveQueryPresets,
  resolveTailwindPresets,
} from '@/features'

vi.mock('@/antfu', () => {
  return {
    interopDefault: async <T>(loader: Promise<T>): Promise<T> => {
      const mod = await loader
      return (mod as any)?.default ?? mod
    },
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
  it('returns empty array when disabled', () => {
    expect(resolveTailwindPresets(false)).toEqual([])
  })

  it('wires up better-tailwindcss when an object config is provided', async () => {
    const [configPromise] = resolveTailwindPresets({
      entryPoint: 'src/main.css',
      tailwindConfig: 'tailwind.config.js',
    })

    const config = await configPromise
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
})

describe('resolveMdxPresets', () => {
  it('returns empty array when disabled', () => {
    expect(resolveMdxPresets(false)).toEqual([])
  })

  it('returns the mdx flat presets with a remark processor', async () => {
    const [mdxPromise] = resolveMdxPresets(true)
    const [lintConfig, blockConfig] = await mdxPromise

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
})

describe('resolveAccessibilityPresets', () => {
  it('early returns when disabled', () => {
    expect(resolveAccessibilityPresets(false, false, false)).toEqual([])
  })

  it('includes vue accessibility presets when vue is enabled', async () => {
    const [preset] = resolveAccessibilityPresets(true, true, false)
    await expect(preset).resolves.toMatchObject({ name: 'vue-a11y-flat' })
  })

  it('includes react accessibility presets when react is enabled', async () => {
    const [preset] = resolveAccessibilityPresets(true, false, true)
    await expect(preset).resolves.toMatchObject({ name: 'jsx-a11y-flat' })
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
  it('returns empty array when disabled', () => {
    expect(resolveQueryPresets(false)).toEqual([])
  })

  it('resolves the tanstack query recommended preset when enabled', async () => {
    const [preset] = resolveQueryPresets(true)
    await expect(preset).resolves.toMatchObject({ name: 'tanstack-query-flat' })
  })
})
