import defaultConfig, {
  base,
  isTailwindUtilityClass,
  noApplyPlugin,
  noApplyRuleName,
  noAtomicClassPlugin,
  noAtomicClassRuleName,
  recommended,
} from 'stylelint-plugin-tailwindcss'
import { expectAssignable, expectType } from 'tsd'

expectAssignable<{ plugins: unknown[], rules: Record<string, true> }>(defaultConfig)
expectAssignable<{ plugins: unknown[], rules: Record<string, true> }>(base)
expectAssignable<{ plugins: unknown[], rules: Record<string, true> }>(recommended)
expectAssignable<object>(noAtomicClassPlugin)
expectAssignable<object>(noApplyPlugin)
expectType<'tailwindcss/no-atomic-class'>(noAtomicClassRuleName)
expectType<'tailwindcss/no-apply'>(noApplyRuleName)
expectType<Promise<boolean>>(isTailwindUtilityClass('flex'))
