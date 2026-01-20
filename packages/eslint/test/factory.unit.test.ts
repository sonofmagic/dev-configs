import { antfu } from '@/antfu'
import { icebreaker, icebreakerLegacy } from '@/factory'
import { getPresets } from '@/preset'

vi.mock('@/antfu', () => {
  return {
    antfu: vi.fn(() => 'composer'),
  }
})

vi.mock('@/preset', () => {
  return {
    getPresets: vi.fn(() => ['resolved', { name: 'preset' }]),
  }
})

const antfuMock = vi.mocked(antfu)
const getPresetsMock = vi.mocked(getPresets)

describe('factory helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('passes presets and user configs into antfu', () => {
    const userConfig = { name: 'user' }
    const result = icebreaker({ vue: true }, userConfig)

    expect(getPresetsMock).toHaveBeenCalledWith({ vue: true })
    expect(antfuMock).toHaveBeenCalledWith('resolved', { name: 'preset' }, userConfig)
    expect(result).toBe('composer')
  })

  it('passes legacy mode to getPresets', () => {
    const userConfig = { name: 'legacy-user' }
    const result = icebreakerLegacy({ react: true }, userConfig)

    expect(getPresetsMock).toHaveBeenCalledWith({ react: true }, 'legacy')
    expect(antfuMock).toHaveBeenCalledWith('resolved', { name: 'preset' }, userConfig)
    expect(result).toBe('composer')
  })
})
