import type { UserConfigItem, UserDefinedOptions } from './types'
import { resolveAccessibilityPresets, resolveMdxPresets, resolveNestPresets, resolveQueryPresets, resolveStylelintBridgePresets, resolveTailwindPresets } from './features'
import { createBaseRuleSet, resolveUserOptions } from './options'

export function getPresets(options?: UserDefinedOptions, mode?: 'legacy'): [UserDefinedOptions, ...UserConfigItem[]] {
  const resolved = resolveUserOptions(options)
  const presets: UserConfigItem[] = [
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
