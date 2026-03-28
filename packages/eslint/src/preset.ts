import type { UserConfigItem, UserDefinedOptions } from './types'
import { resolveAccessibilityPresets, resolveMdxPresets, resolveNestPresets, resolveQueryPresets, resolveStylelintBridgePresets, resolveTailwindPresets } from './features'
import { createBaseRuleSet, resolveUserOptions } from './options'

const MINI_PROGRAM_IGNORES = [
  'dist/**',
  '.weapp-vite/**',
  'miniprogram_npm/**',
  'node_modules/**',
  'project.config.json',
  'project.private.config.json',
] as const

const MINI_PROGRAM_GLOBALS = {
  wx: 'readonly',
  Page: 'readonly',
  App: 'readonly',
  Component: 'readonly',
  getApp: 'readonly',
  getCurrentPages: 'readonly',
  requirePlugin: 'readonly',
  WechatMiniprogram: 'readonly',
} as const

export function getPresets(options?: UserDefinedOptions, mode?: 'legacy'): [UserDefinedOptions, ...UserConfigItem[]] {
  const resolved = resolveUserOptions(options)
  const presets: UserConfigItem[] = [
    ...(resolved.miniProgram
      ? [
          {
            ignores: [...MINI_PROGRAM_IGNORES],
          },
          {
            files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}'],
            languageOptions: {
              globals: MINI_PROGRAM_GLOBALS,
            },
          },
        ]
      : []),
    {
      rules: createBaseRuleSet(mode === 'legacy'),
    },
    {
      files: ['**/*.{css,scss,sass,less,pcss,postcss,json,jsonc,json5}'],
      rules: {
        'style/eol-last': 'off',
      },
    },
  ]

  presets.push(
    ...resolveStylelintBridgePresets(resolved.stylelint),
    ...resolveTailwindPresets(resolved.tailwindcss),
    ...resolveMdxPresets(resolved.mdx),
    ...resolveNestPresets(resolved.nestjs),
    ...resolveQueryPresets(resolved.query),
    ...resolveAccessibilityPresets(resolved.a11y, resolved.vue, resolved.react),
  )

  return [resolved, ...presets]
}
