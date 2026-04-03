import type {
  ConfigNames,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type {
  NormalizableUserConfig,
  ResolvableUserConfig,
  UserConfigItem,
  UserDefinedOptions,
} from './types'
import { antfu } from './antfu'
import { getPresets } from './preset'
import { hasAllPackages } from './utils'
import './polyfills'

const OPTIONAL_ANTFU_FEATURE_PACKAGES = {
  react: [
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
  ],
  nextjs: ['@next/eslint-plugin-next'],
  unocss: ['@unocss/eslint-plugin'],
} as const

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && Object.prototype.toString.call(value) === '[object Object]'
}

function cloneUserDefinedOptions(
  options: UserDefinedOptions,
): UserDefinedOptions {
  const { settings, ...restOptions } = options
  if (settings === undefined) {
    return { ...restOptions }
  }

  return {
    ...restOptions,
    settings,
  }
}

function getSettingsRecord(
  settings: UserDefinedOptions['settings'],
): Record<string, unknown> {
  return isPlainObject(settings) ? settings : {}
}

function removeNamespacedSetting(
  options: UserDefinedOptions,
  namespace: string,
): UserDefinedOptions {
  if (!isPlainObject(options.settings)) {
    return options
  }

  const settings = getSettingsRecord(options.settings)
  if (!(namespace in settings)) {
    return options
  }

  const { [namespace]: _unusedNamespace, ...restSettings } = settings
  const { settings: _settings, ...restOptions } = options
  if (Object.keys(restSettings).length === 0) {
    return { ...restOptions }
  }

  return {
    ...restOptions,
    settings: restSettings as NonNullable<UserDefinedOptions['settings']>,
  }
}

function normalizeOptionalAntfuFeatures(
  options: UserDefinedOptions,
): UserDefinedOptions {
  const normalized = cloneUserDefinedOptions(options)

  if (normalized.react && !hasAllPackages([...OPTIONAL_ANTFU_FEATURE_PACKAGES.react])) {
    normalized.react = false
  }

  if (normalized.nextjs && !hasAllPackages([...OPTIONAL_ANTFU_FEATURE_PACKAGES.nextjs])) {
    normalized.nextjs = false
  }

  if (normalized.unocss && !hasAllPackages([...OPTIONAL_ANTFU_FEATURE_PACKAGES.unocss])) {
    normalized.unocss = false
    return removeNamespacedSetting(normalized, 'unocss')
  }

  return normalized
}

function mergeNamespacedSetting(
  options: UserDefinedOptions,
  namespace: string,
  value: Record<string, unknown>,
): UserDefinedOptions {
  const currentSettings = getSettingsRecord(options.settings)
  const currentNamespaceSettings = isPlainObject(currentSettings[namespace])
    ? currentSettings[namespace]
    : {}

  return {
    ...options,
    settings: {
      ...currentSettings,
      [namespace]: {
        ...currentNamespaceSettings,
        ...value,
      },
    } as NonNullable<UserDefinedOptions['settings']>,
  }
}

function normalizeUnoCssOptions(
  options: UserDefinedOptions,
): UserDefinedOptions {
  if (!options.unocss || typeof options.unocss !== 'object') {
    return options
  }

  const { configPath, ...unocssOptions } = options.unocss
  const { settings, ...restOptions } = options
  const normalized: UserDefinedOptions = settings === undefined
    ? {
        ...restOptions,
        unocss: unocssOptions,
      }
    : {
        ...restOptions,
        settings,
        unocss: unocssOptions,
      }

  if (!configPath) {
    return normalized
  }

  return mergeNamespacedSetting(normalized, 'unocss', { configPath })
}

function hasGlobalIgnoreShape(
  config: TypedFlatConfigItem,
): boolean {
  const keys = Object.keys(config).filter(key => key !== 'name')
  return keys.length === 1 && keys[0] === 'ignores'
}

function liftConfigIgnores(
  config: TypedFlatConfigItem,
): TypedFlatConfigItem | TypedFlatConfigItem[] {
  if (
    !('ignores' in config)
    || config.ignores == null
    || hasGlobalIgnoreShape(config)
    || 'files' in config
  ) {
    return config
  }

  const { ignores, name, ...rest } = config
  const ignoreConfig: TypedFlatConfigItem = {
    ...(name ? { name: `${name}/ignores` } : {}),
    ignores,
  }

  return [ignoreConfig, { ...(name ? { name } : {}), ...rest }]
}

function normalizeResolvedUserConfig(
  userConfig: NormalizableUserConfig,
): Exclude<ResolvableUserConfig, FlatConfigComposer<any, any>> {
  if (Array.isArray(userConfig)) {
    return userConfig.flatMap(config => liftConfigIgnores(config as TypedFlatConfigItem))
  }

  return liftConfigIgnores(userConfig as TypedFlatConfigItem)
}

function isComposer(
  value: unknown,
): value is FlatConfigComposer<any, any> {
  return !!value
    && typeof value === 'object'
    && 'toConfigs' in value
    && typeof value.toConfigs === 'function'
}

function normalizeUserConfig(
  userConfig: UserConfigItem,
): ResolvableUserConfig | Promise<ResolvableUserConfig> {
  if (typeof (userConfig as PromiseLike<Awaited<UserConfigItem>>)?.then === 'function') {
    return Promise.resolve(userConfig).then((resolved) => {
      return isComposer(resolved) ? resolved : normalizeResolvedUserConfig(resolved)
    })
  }

  const resolvedUserConfig = userConfig as ResolvableUserConfig

  return isComposer(resolvedUserConfig)
    ? resolvedUserConfig
    : normalizeResolvedUserConfig(resolvedUserConfig)
}

// for vue2 @see https://github.com/antfu/eslint-config/issues/367#issuecomment-1979646400
export function icebreaker(
  options: UserDefinedOptions = {},
  ...userConfigs: UserConfigItem[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const [resolved, ...presets] = getPresets(options)
  const normalized = normalizeUnoCssOptions(normalizeOptionalAntfuFeatures(resolved))
  return antfu(
    normalized,
    ...presets,
    ...userConfigs.map(normalizeUserConfig),
  )
}

export type IcebreakerEslintConfig = ReturnType<typeof icebreaker>

export function icebreakerLegacy(
  options: UserDefinedOptions = {},
  ...userConfigs: UserConfigItem[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const [resolved, ...presets] = getPresets(options, 'legacy')
  const normalized = normalizeUnoCssOptions(normalizeOptionalAntfuFeatures(resolved))
  return antfu(
    normalized,
    ...presets,
    ...userConfigs.map(normalizeUserConfig),
  )
}

export type IcebreakerLegacyEslintConfig = ReturnType<
  typeof icebreakerLegacy
>

export type {
  ConfigNames,
  FlatConfigComposer,
  TypedFlatConfigItem,
}
