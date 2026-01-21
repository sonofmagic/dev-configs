import type { Config } from 'stylelint'
import type { IcebreakerStylelintOptions, PresetToggles } from './types'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { PRESET_RECESS_ORDER, PRESET_STANDARD_SCSS, PRESET_VUE_SCSS } from './constants'
import { normalizeExtends, resolveIgnoreList, toArray, unique } from './utils'

const requireFromConfig = createRequire(import.meta.url)

const BEM_OOCSS_CLASS_NAME_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)*(?:--[a-z0-9]+(?:-[a-z0-9]+)*)*$/

function resolvePresetPath(specifier: string): string {
  if (typeof import.meta.resolve === 'function') {
    try {
      const resolved = import.meta.resolve(specifier)
      return resolved.startsWith('file:') ? fileURLToPath(resolved) : resolved
    }
    catch {
      // fall through to require.resolve
    }
  }

  try {
    return requireFromConfig.resolve(specifier)
  }
  catch {
    return specifier
  }
}

const PRESET_PATH_STANDARD_SCSS = resolvePresetPath(PRESET_STANDARD_SCSS)
const PRESET_PATH_VUE_SCSS = resolvePresetPath(PRESET_VUE_SCSS)
const PRESET_PATH_RECESS_ORDER = resolvePresetPath(PRESET_RECESS_ORDER)

function resolvePresetExtends(presets: PresetToggles | undefined): string[] {
  const entries: string[] = []
  if (presets?.scss !== false) {
    entries.push(PRESET_PATH_STANDARD_SCSS)
  }
  if (presets?.vue !== false) {
    entries.push(PRESET_PATH_VUE_SCSS)
  }
  if (presets?.order !== false) {
    entries.push(PRESET_PATH_RECESS_ORDER)
  }
  return entries
}

function resolveExtends(options: IcebreakerStylelintOptions | undefined): Config['extends'] {
  const presets = resolvePresetExtends(options?.presets)
  const extras = toArray(options?.extends)
  const values = unique([...presets, ...extras])
  return normalizeExtends(values)
}

function resolveOverrides(options: IcebreakerStylelintOptions | undefined): Config['overrides'] | undefined {
  const overrides = options?.overrides
  if (!overrides || overrides.length === 0) {
    return []
  }

  return [...overrides]
}

function resolveRules(options: IcebreakerStylelintOptions | undefined): Config['rules'] {
  const ignoreUnits = resolveIgnoreList('units', options?.ignores)
  const ignoreTypes = resolveIgnoreList('types', options?.ignores)
  const ignoreAtRules = resolveIgnoreList('atRules', options?.ignores)

  const rules: Config['rules'] = {
    'function-name-case': null,
    'selector-class-pattern': [
      new RegExp(BEM_OOCSS_CLASS_NAME_PATTERN),
      {
        message: 'Use BEM/OOCSS-friendly class names',
        resolveNestedSelectors: true,
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits,
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes,
      },
    ],
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules,
      },
    ],
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules,
      },
    ],
  }

  if (options?.rules) {
    return {
      ...rules,
      ...options.rules,
    }
  }

  return rules
}

export function createIcebreakerStylelintConfig(options: IcebreakerStylelintOptions = {}): Config {
  return {
    extends: resolveExtends(options),
    overrides: resolveOverrides(options),
    rules: resolveRules(options),
  }
}
