import {
  resolveAccessibilityPresets,
  resolveMdxPresets,
  resolveNestPresets,
  resolveQueryPresets,
  resolveTailwindPresets,
} from '@/features'
import { getPresets } from '@/preset'

vi.mock('@/features', () => {
  return {
    resolveTailwindPresets: vi.fn(() => [{ name: 'tailwind' }]),
    resolveMdxPresets: vi.fn(() => [{ name: 'mdx' }]),
    resolveNestPresets: vi.fn(() => [{ name: 'nestjs' }]),
    resolveQueryPresets: vi.fn(() => [{ name: 'query' }]),
    resolveAccessibilityPresets: vi.fn(() => [{ name: 'a11y' }]),
  }
})

const resolveTailwindPresetsMock = vi.mocked(resolveTailwindPresets)
const resolveMdxPresetsMock = vi.mocked(resolveMdxPresets)
const resolveNestPresetsMock = vi.mocked(resolveNestPresets)
const resolveQueryPresetsMock = vi.mocked(resolveQueryPresets)
const resolveAccessibilityPresetsMock = vi.mocked(resolveAccessibilityPresets)

describe('getPresets', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns resolved options and base config', () => {
    const [resolved, baseConfig] = getPresets()

    expect(resolved.formatters).toBe(true)
    expect(baseConfig.rules?.['pnpm/json-enforce-catalog']).toBe('off')
  })

  it('appends feature presets in the expected order', () => {
    const [, baseConfig, ...presets] = getPresets({
      tailwindcss: true,
      mdx: true,
      nestjs: true,
      query: true,
      a11y: true,
      vue: true,
      react: true,
    })

    expect(baseConfig.rules?.['unicorn/prefer-number-properties']).toBe('warn')
    expect(resolveTailwindPresetsMock).toHaveBeenCalledWith(true)
    expect(resolveMdxPresetsMock).toHaveBeenCalledWith(true)
    expect(resolveNestPresetsMock).toHaveBeenCalledWith(true)
    expect(resolveQueryPresetsMock).toHaveBeenCalledWith(true)
    expect(resolveAccessibilityPresetsMock).toHaveBeenCalledWith(true, expect.any(Object), true)

    expect(presets.map(preset => preset.name)).toEqual([
      'tailwind',
      'mdx',
      'nestjs',
      'query',
      'a11y',
    ])
  })

  it('uses legacy rules when requested', () => {
    const [, baseConfig] = getPresets(undefined, 'legacy')

    expect(baseConfig.rules?.['perfectionist/sort-imports']).toBe('off')
  })
})
