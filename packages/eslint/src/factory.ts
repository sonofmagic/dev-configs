import type {
  ConfigNames,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type { UserConfigItem, UserDefinedOptions } from './types'
import { antfu } from './antfu'
import { getPresets } from './preset'
import { hasAllPackages } from './utils'

const OPTIONAL_ANTFU_FEATURE_PACKAGES = {
  react: [
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
  ],
  nextjs: ['@next/eslint-plugin-next'],
} as const

function normalizeOptionalAntfuFeatures(
  options: UserDefinedOptions,
): UserDefinedOptions {
  const normalized = { ...options }

  if (normalized.react && !hasAllPackages([...OPTIONAL_ANTFU_FEATURE_PACKAGES.react])) {
    normalized.react = false
  }

  if (normalized.nextjs && !hasAllPackages([...OPTIONAL_ANTFU_FEATURE_PACKAGES.nextjs])) {
    normalized.nextjs = false
  }

  return normalized
}

// for vue2 @see https://github.com/antfu/eslint-config/issues/367#issuecomment-1979646400
export function icebreaker(
  options: UserDefinedOptions = {},
  ...userConfigs: UserConfigItem[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const [resolved, ...presets] = getPresets(options)
  return antfu(normalizeOptionalAntfuFeatures(resolved), ...presets, ...userConfigs)
}

export type IcebreakerEslintConfig = ReturnType<typeof icebreaker>

export function icebreakerLegacy(
  options: UserDefinedOptions = {},
  ...userConfigs: UserConfigItem[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const [resolved, ...presets] = getPresets(options, 'legacy')
  return antfu(normalizeOptionalAntfuFeatures(resolved), ...presets, ...userConfigs)
}

export type IcebreakerLegacyEslintConfig = ReturnType<
  typeof icebreakerLegacy
>

export type {
  ConfigNames,
  FlatConfigComposer,
  TypedFlatConfigItem,
}
