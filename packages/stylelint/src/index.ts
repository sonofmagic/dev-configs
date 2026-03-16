import type { StylelintConfig } from './types'
import { createIcebreakerStylelintConfig } from './config'

export { createIcebreakerStylelintConfig as createStylelintConfig } from './config'
export type {
  IcebreakerStylelintOptions,
  IgnoreListOptions,
  PresetToggles,
} from './types'

function mergeConfigs(base: StylelintConfig, overrides?: StylelintConfig): StylelintConfig {
  if (!overrides) {
    return base
  }

  const basePlugins = Array.isArray(base.plugins)
    ? base.plugins
    : base.plugins
      ? [base.plugins]
      : []
  const overridePlugins = Array.isArray(overrides.plugins)
    ? overrides.plugins
    : overrides.plugins
      ? [overrides.plugins]
      : []

  return {
    ...base,
    ...overrides,
    plugins: [...basePlugins, ...overridePlugins],
    rules: {
      ...(base.rules ?? {}),
      ...(overrides.rules ?? {}),
    },
  }
}

export function icebreaker(config?: StylelintConfig): StylelintConfig {
  const base = createIcebreakerStylelintConfig()
  return mergeConfigs(base, config)
}
