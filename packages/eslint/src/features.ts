import type { Linter } from 'eslint'
import type {
  StylelintBridgeOption,
  TypedFlatConfigItem,
  UserConfigItem,
  UserDefinedOptions,
} from './types'
import { interopDefault } from './antfu'
import { nestjsTypeScriptRules } from './defaults'
import { hasAllPackages } from './utils'

const BETTER_TAILWIND_PACKAGES = ['eslint-plugin-better-tailwindcss']
const TAILWIND_PACKAGES = ['eslint-plugin-tailwindcss']
const STYLELINT_BRIDGE_PACKAGES = ['eslint-plugin-better-stylelint']
const MDX_PACKAGES = ['eslint-plugin-mdx']
const VUE_A11Y_PACKAGES = ['eslint-plugin-vuejs-accessibility']
const REACT_A11Y_PACKAGES = ['eslint-plugin-jsx-a11y']
const QUERY_PACKAGES = ['@tanstack/eslint-plugin-query']

function resolveStylelintConfigLoader() {
  return import.meta.url.endsWith('.ts')
    ? new URL('./stylelint.ts', import.meta.url).href
    : new URL('./stylelint.js', import.meta.url).href
}

export function resolveTailwindPresets(option: UserDefinedOptions['tailwindcss']): UserConfigItem[] {
  if (!option) {
    return []
  }

  if (typeof option === 'object') {
    if (!hasAllPackages(BETTER_TAILWIND_PACKAGES)) {
      return []
    }

    return [
      interopDefault(
        import('eslint-plugin-better-tailwindcss'),
      ).then((eslintPluginBetterTailwindcss) => {
        const betterTailwindcssRules: Linter.RulesRecord = {
          ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
          ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
        }

        return {
          name: 'icebreaker/better-tailwindcss',
          plugins: {
            'better-tailwindcss': eslintPluginBetterTailwindcss,
          },
          rules: betterTailwindcssRules,
          settings: {
            'better-tailwindcss': {
              entryPoint: option.entryPoint,
              tailwindConfig: option.tailwindConfig,
            },
          },
        } satisfies TypedFlatConfigItem
      }),
    ]
  }

  if (!hasAllPackages(TAILWIND_PACKAGES)) {
    return []
  }

  return [
    // @ts-ignore optional dependency shape
    interopDefault(
      import('eslint-plugin-tailwindcss'),
    ).then((tailwind) => {
      return tailwind.configs['flat/recommended']
    }),
    {
      rules: {
        'tailwindcss/no-custom-classname': 'off',
      },
    },
  ]
}

function resolveStylelintBridgeOptions(
  option: UserDefinedOptions['stylelint'],
) {
  const bridgeOptions = typeof option === 'object'
    ? option
    : {} as StylelintBridgeOption
  const { cwd, ...stylelintConfigOptions } = bridgeOptions

  return {
    ...(cwd ? { cwd } : {}),
    configLoader: resolveStylelintConfigLoader(),
    configOptions: stylelintConfigOptions as unknown as Record<string, unknown>,
  }
}

export function resolveStylelintBridgePresets(option: UserDefinedOptions['stylelint']): UserConfigItem[] {
  if (!option) {
    return []
  }

  if (!hasAllPackages(STYLELINT_BRIDGE_PACKAGES)) {
    return []
  }

  const pluginModulePromise = import('eslint-plugin-better-stylelint')
  const stylelintOptions = resolveStylelintBridgeOptions(option)

  return [
    pluginModulePromise.then((pluginModule) => {
      return {
        files: ['**/*.{css,pcss,postcss}'],
        plugins: {
          stylelint: pluginModule.default,
        },
        processor: pluginModule.createStylelintProcessor(stylelintOptions) as any,
      } satisfies TypedFlatConfigItem
    }),
    pluginModulePromise.then((pluginModule) => {
      return {
        files: ['**/*.{scss,sass}'],
        plugins: {
          stylelint: pluginModule.default,
        },
        processor: pluginModule.createStylelintProcessor(stylelintOptions) as any,
      } satisfies TypedFlatConfigItem
    }),
    pluginModulePromise.then((pluginModule) => {
      return {
        files: ['**/*.vue'],
        plugins: {
          stylelint: pluginModule.default,
        },
        rules: {
          'stylelint/stylelint': ['error', stylelintOptions],
        },
      } satisfies TypedFlatConfigItem
    }),
  ]
}

export function resolveMdxPresets(isEnabled: UserDefinedOptions['mdx']): UserConfigItem[] {
  if (!isEnabled) {
    return []
  }

  if (!hasAllPackages(MDX_PACKAGES)) {
    return []
  }

  return [
    interopDefault(import('eslint-plugin-mdx')).then((mdx) => {
      return [
        {
          ...mdx.flat,
          processor: mdx.createRemarkProcessor({
            lintCodeBlocks: true,
            languageMapper: {},
          }),
        },
        {
          ...mdx.flatCodeBlocks,
          rules: {
            ...mdx.flatCodeBlocks.rules,
          },
        },
      ]
    }),
  ]
}

export function resolveAccessibilityPresets(
  isEnabled: UserDefinedOptions['a11y'],
  vueOption: UserDefinedOptions['vue'],
  reactOption: UserDefinedOptions['react'],
): UserConfigItem[] {
  if (!isEnabled) {
    return []
  }

  const presets: UserConfigItem[] = []

  if (vueOption && hasAllPackages(VUE_A11Y_PACKAGES)) {
    presets.push(
      interopDefault(
        import('eslint-plugin-vuejs-accessibility'),
      ).then((pluginVueA11y) => {
        return pluginVueA11y.configs['flat/recommended']
      }),
    )
  }

  if (reactOption && hasAllPackages(REACT_A11Y_PACKAGES)) {
    presets.push(
      interopDefault(
        // @ts-ignore optional dependency shape
        import('eslint-plugin-jsx-a11y'),
      ).then((jsxA11y) => {
        return jsxA11y.flatConfigs.recommended
      }),
    )
  }

  return presets
}

export function resolveNestPresets(isEnabled: UserDefinedOptions['nestjs']): UserConfigItem[] {
  if (!isEnabled) {
    return []
  }

  return [{
    name: 'icebreaker/nestjs/rules',
    rules: nestjsTypeScriptRules,
  }]
}

export function resolveQueryPresets(isEnabled: UserDefinedOptions['query']): UserConfigItem[] {
  if (!isEnabled) {
    return []
  }

  if (!hasAllPackages(QUERY_PACKAGES)) {
    return []
  }

  return [
    interopDefault(
      import('@tanstack/eslint-plugin-query'),
    ).then(pluginQuery => pluginQuery.configs['flat/recommended']),
  ]
}
