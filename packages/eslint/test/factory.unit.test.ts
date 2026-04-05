import type { TypedFlatConfigItem } from '@/types'
import { antfu } from '@/antfu'
import { icebreaker, icebreakerLegacy } from '@/factory'
import { getPresets } from '@/preset'
import { hasAllPackages } from '@/utils'

vi.mock('@/antfu', () => {
  const composer = {
    override: vi.fn(function override() {
      return this
    }),
  }
  return {
    antfu: vi.fn(() => composer),
  }
})

vi.mock('@/preset', () => {
  return {
    getPresets: vi.fn(() => [{}, { name: 'preset' }]),
  }
})

vi.mock('@/utils', () => {
  return {
    hasAllPackages: vi.fn(() => true),
  }
})

const antfuMock = vi.mocked(antfu)
const getPresetsMock = vi.mocked(getPresets)
const hasAllPackagesMock = vi.mocked(hasAllPackages)

function getComposerMock() {
  return antfuMock.mock.results.at(-1)?.value as {
    override: ReturnType<typeof vi.fn>
  }
}

describe('factory helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    hasAllPackagesMock.mockReturnValue(true)
  })

  it('passes presets and user configs into antfu', () => {
    const userConfig = { name: 'user' }
    const result = icebreaker({ vue: true }, userConfig)

    expect(getPresetsMock).toHaveBeenCalledWith({ vue: true })
    expect(antfuMock).toHaveBeenCalledWith({}, { name: 'preset' }, userConfig)
    expect(result).toBe(getComposerMock())
  })

  it('lifts ignores into a standalone config item before the user config', () => {
    const userConfig = {
      name: 'user',
      ignores: ['.agents/**'],
      rules: {
        'no-console': 'error' as const,
      },
    } satisfies TypedFlatConfigItem

    icebreaker({ vue: true }, userConfig)

    expect(antfuMock).toHaveBeenCalledWith(
      {},
      { name: 'preset' },
      [
        { name: 'user/ignores', ignores: ['.agents/**'] },
        {
          name: 'user',
          rules: {
            'no-console': 'error',
          },
        },
      ],
    )
  })

  it('keeps ignores scoped when the user config declares files', () => {
    const userConfig = {
      name: 'scoped-user',
      files: ['src/**/*.js'],
      ignores: ['**/vendor/**'],
      rules: {
        'no-console': 'error' as const,
      },
    } satisfies TypedFlatConfigItem

    icebreaker({ vue: true }, userConfig)

    expect(antfuMock).toHaveBeenCalledWith({}, { name: 'preset' }, userConfig)
  })

  it('passes legacy mode to getPresets', () => {
    const userConfig = { name: 'legacy-user' }
    const result = icebreakerLegacy({ react: true }, userConfig)

    expect(getPresetsMock).toHaveBeenCalledWith({ react: true }, 'legacy')
    expect(antfuMock).toHaveBeenCalledWith({}, { name: 'preset' }, userConfig)
    expect(result).toBe(getComposerMock())
  })

  it('disables optional antfu react and next features when their plugins are unavailable', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        react: true,
        nextjs: true,
      } as any,
      { name: 'preset' },
    ])
    hasAllPackagesMock.mockImplementation((packages) => {
      return !packages.includes('@eslint-react/eslint-plugin')
    })

    icebreaker({
      react: true,
      nextjs: true,
    } as any)

    expect(antfuMock).toHaveBeenCalledWith(
      {
        react: false,
        nextjs: true,
      },
      { name: 'preset' },
    )
  })

  it('disables optional antfu unocss feature when the plugin is unavailable', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        unocss: true,
      } as any,
      { name: 'preset' },
    ])
    hasAllPackagesMock.mockImplementation((packages) => {
      return !packages.includes('@unocss/eslint-plugin')
    })

    icebreaker({
      unocss: true,
    } as any)

    expect(antfuMock).toHaveBeenCalledWith(
      {
        unocss: false,
      },
      { name: 'preset' },
    )
  })

  it('maps unocss.configPath to settings.unocss.configPath', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        unocss: {
          strict: true,
          attributify: false,
          configPath: './uno.config.ts',
        },
      } as any,
      { name: 'preset' },
    ])

    icebreaker({
      unocss: {
        strict: true,
        attributify: false,
        configPath: './uno.config.ts',
      },
    } as any)

    expect(antfuMock).toHaveBeenCalledWith(
      {
        unocss: {
          strict: true,
          attributify: false,
        },
        settings: {
          unocss: {
            configPath: './uno.config.ts',
          },
        },
      },
      { name: 'preset' },
    )
  })

  it('keeps default unocss discovery behavior when configPath is omitted', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        unocss: {
          strict: true,
          attributify: false,
        },
      } as any,
      { name: 'preset' },
    ])

    icebreaker({
      unocss: {
        strict: true,
        attributify: false,
      },
    } as any)

    expect(antfuMock).toHaveBeenCalledWith(
      {
        unocss: {
          strict: true,
          attributify: false,
        },
      },
      { name: 'preset' },
    )
  })

  it('prefers wrapper configPath over settings.unocss.configPath', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        unocss: {
          strict: true,
          configPath: './preferred-uno.config.ts',
        },
        settings: {
          unocss: {
            configPath: './ignored-uno.config.ts',
          },
        },
      } as any,
      { name: 'preset' },
    ])

    icebreaker({
      unocss: {
        strict: true,
        configPath: './preferred-uno.config.ts',
      },
      settings: {
        unocss: {
          configPath: './ignored-uno.config.ts',
        },
      },
    } as any)

    expect(antfuMock).toHaveBeenCalledWith(
      {
        unocss: {
          strict: true,
        },
        settings: {
          unocss: {
            configPath: './preferred-uno.config.ts',
          },
        },
      },
      { name: 'preset' },
    )
  })

  it('drops injected settings.unocss when unocss is disabled due to missing plugin', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        unocss: {
          strict: true,
          configPath: './uno.config.ts',
        },
        settings: {
          unocss: {
            configPath: './uno.config.ts',
          },
          foo: {
            bar: true,
          },
        },
      } as any,
      { name: 'preset' },
    ])
    hasAllPackagesMock.mockImplementation((packages) => {
      return !packages.includes('@unocss/eslint-plugin')
    })

    icebreaker({
      unocss: {
        strict: true,
        configPath: './uno.config.ts',
      },
      settings: {
        unocss: {
          configPath: './uno.config.ts',
        },
        foo: {
          bar: true,
        },
      },
    } as any)

    expect(antfuMock).toHaveBeenCalledWith(
      {
        unocss: false,
        settings: {
          foo: {
            bar: true,
          },
        },
      },
      { name: 'preset' },
    )
  })

  it('maps unocss.configPath to settings.unocss.configPath in legacy mode', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        unocss: {
          strict: true,
          configPath: './legacy-uno.config.ts',
        },
      } as any,
      { name: 'preset' },
    ])

    icebreakerLegacy({
      unocss: {
        strict: true,
        configPath: './legacy-uno.config.ts',
      },
    } as any)

    expect(antfuMock).toHaveBeenCalledWith(
      {
        unocss: {
          strict: true,
        },
        settings: {
          unocss: {
            configPath: './legacy-uno.config.ts',
          },
        },
      },
      { name: 'preset' },
    )
  })

  it('disables unocss in legacy mode when the plugin is unavailable', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        unocss: true,
      } as any,
      { name: 'preset' },
    ])
    hasAllPackagesMock.mockImplementation((packages) => {
      return !packages.includes('@unocss/eslint-plugin')
    })

    icebreakerLegacy({
      unocss: true,
    } as any)

    expect(antfuMock).toHaveBeenCalledWith(
      {
        unocss: false,
      },
      { name: 'preset' },
    )
  })

  it('overrides css/html/graphql formatters to oxfmt when requested', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        formatters: {
          css: 'oxfmt',
          html: 'oxfmt',
          graphql: 'oxfmt',
          oxfmtOptions: {
            lineWidth: 100,
          },
        },
      } as any,
      { name: 'preset' },
    ])

    const result = icebreaker({
      formatters: {
        css: 'oxfmt',
        html: 'oxfmt',
        graphql: 'oxfmt',
        oxfmtOptions: {
          lineWidth: 100,
        },
      },
    } as any)

    const composer = result as unknown as { override: ReturnType<typeof vi.fn> }
    expect(composer.override).toHaveBeenCalledWith('antfu/formatter/css', expect.objectContaining({
      rules: expect.objectContaining({
        'format/oxfmt': ['error', { lineWidth: 100 }],
        'format/prettier': 'off',
      }),
    }))
    expect(composer.override).toHaveBeenCalledWith('antfu/formatter/scss', expect.any(Object))
    expect(composer.override).toHaveBeenCalledWith('antfu/formatter/less', expect.any(Object))
    expect(composer.override).toHaveBeenCalledWith('antfu/formatter/html', expect.any(Object))
    expect(composer.override).toHaveBeenCalledWith('antfu/formatter/graphql', expect.any(Object))
  })

  it('throws when markdown oxfmt is combined with slidev', () => {
    getPresetsMock.mockReturnValueOnce([
      {
        formatters: {
          markdown: 'oxfmt',
          slidev: true,
        },
      } as any,
      { name: 'preset' },
    ])

    expect(() => {
      icebreaker({
        formatters: {
          markdown: 'oxfmt',
          slidev: true,
        },
      } as any)
    }).toThrow(/markdown: "oxfmt".*slidev/u)
  })
})
