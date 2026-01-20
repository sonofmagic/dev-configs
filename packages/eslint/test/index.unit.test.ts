import { icebreaker as icebreakerFromFactory, icebreakerLegacy as icebreakerLegacyFromFactory } from '@/factory'
import { getPresets, icebreaker, icebreakerLegacy } from '@/index'
import { getPresets as getPresetsFromPreset } from '@/preset'

describe('index exports', () => {
  it('re-exports factory helpers', () => {
    expect(icebreaker).toBe(icebreakerFromFactory)
    expect(icebreakerLegacy).toBe(icebreakerLegacyFromFactory)
  })

  it('re-exports preset helpers', () => {
    expect(getPresets).toBe(getPresetsFromPreset)
  })
})
