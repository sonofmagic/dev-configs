import type { Config } from 'stylelint'

describe('mergeConfigs branches', () => {
  afterEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    vi.unmock('@/config')
  })

  it('handles missing rules on base and overrides', async () => {
    vi.doMock('@/config', () => {
      return {
        createIcebreakerStylelintConfig: vi.fn(() => ({
          extends: ['base'],
        })),
      }
    })

    const { icebreaker } = await import('@/index')
    const override: Config = {
      extends: ['override'],
    }

    const config = icebreaker(override)

    expect(config.extends).toEqual(['override'])
    expect(config.rules).toEqual({})
  })
})
