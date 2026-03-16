export interface StylelintRuleOptions {
  [key: string]: unknown
}

export type StylelintRuleSetting
  = | null
    | undefined
    | string
    | number
    | boolean
    | RegExp
    | StylelintRuleOptions
    | [unknown]
    | [unknown, StylelintRuleOptions]

export interface StylelintOverride {
  files: string | string[]
  name?: string
  customSyntax?: string
  extends?: string | string[]
  plugins?: Array<string | object>
  rules?: Record<string, StylelintRuleSetting>
}

export interface StylelintConfig {
  extends?: string | string[]
  plugins?: string | object | Array<string | object>
  overrides?: StylelintOverride[]
  rules?: Record<string, StylelintRuleSetting>
  customSyntax?: string
  ignoreFiles?: string | string[]
}

export interface PresetToggles {
  /** Include rules for SCSS syntax. Enabled by default. */
  scss?: boolean
  /** Include Vue-specific recommendations. Enabled by default. */
  vue?: boolean
  /** Enforce property ordering via recess-order. Enabled by default. */
  order?: boolean
}

export interface IgnoreListOptions {
  /** Replace the default ignore-at-rules list. */
  atRules?: string[]
  /** Replace the default ignore selector types list. */
  types?: string[]
  /** Replace the default ignore units list. */
  units?: string[]
  /** Additional at-rules to ignore. */
  addAtRules?: string[]
  /** Additional selector types to ignore. */
  addTypes?: string[]
  /** Additional units to ignore. */
  addUnits?: string[]
}

export interface IcebreakerStylelintOptions {
  /** Toggle built-in preset bundles. */
  presets?: PresetToggles
  /** Append extra extends entries. */
  extends?: StylelintConfig['extends']
  /** Append override entries. */
  overrides?: StylelintConfig['overrides']
  /** Provide additional or replacement rule ignore lists. */
  ignores?: IgnoreListOptions
  /** Override or add rules. */
  rules?: StylelintConfig['rules']
}

export type ResolvedIgnoreKind = 'atRules' | 'types' | 'units'
