import { antfu } from '@/antfu'
import { icebreaker, icebreakerLegacy } from '@/factory'
import { getPresets } from '@/preset'
import { hasAllPackages } from '@/utils'

vi.mock('@/antfu', () => {
  return {
    antfu: vi.fn(() => 'composer'),
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
    expect(result).toBe('composer')
  })

  it('passes legacy mode to getPresets', () => {
    const userConfig = { name: 'legacy-user' }
    const result = icebreakerLegacy({ react: true }, userConfig)

    expect(getPresetsMock).toHaveBeenCalledWith({ react: true }, 'legacy')
    expect(antfuMock).toHaveBeenCalledWith({}, { name: 'preset' }, userConfig)
    expect(result).toBe('composer')
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
})
