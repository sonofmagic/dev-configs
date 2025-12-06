import type { Linter } from 'eslint'
import type { TypedFlatConfigItem, UserConfigItem, UserDefinedOptions } from './types'
import { interopDefault } from './antfu'
import { nestjsTypeScriptRules } from './defaults'

export function resolveTailwindPresets(option: UserDefinedOptions['tailwindcss']): UserConfigItem[] {
  if (!option) {
    return []
  }

  if (typeof option === 'object') {
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

export function resolveMdxPresets(isEnabled: UserDefinedOptions['mdx']): UserConfigItem[] {
  if (!isEnabled) {
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

  if (vueOption) {
    presets.push(
      interopDefault(
        import('eslint-plugin-vuejs-accessibility'),
      ).then((pluginVueA11y) => {
        return pluginVueA11y.configs['flat/recommended']
      }),
    )
  }

  if (reactOption) {
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

  return [
    interopDefault(
      import('@tanstack/eslint-plugin-query'),
    ).then(pluginQuery => pluginQuery.configs['flat/recommended']),
  ]
}
