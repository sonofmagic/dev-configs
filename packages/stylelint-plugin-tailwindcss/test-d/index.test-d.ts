import defaultConfig, {
  base,
  isTailwindUtilityClass,
  noApplyPlugin,
  noApplyRuleName,
  noAtomicClassPlugin,
  noAtomicClassRuleName,
  recommended,
  tailwindRecommended,
  UNOCSS_NO_APPLY_RULE_NAME,
  unocssRecommended,
} from 'stylelint-plugin-tailwindcss'
import { expectAssignable, expectType } from 'tsd'

expectAssignable<{ plugins: unknown[], rules: Record<string, true> }>(defaultConfig)
expectAssignable<{ plugins: unknown[], rules: Record<string, true> }>(base)
expectAssignable<{ plugins: unknown[], rules: Record<string, true> }>(recommended)
expectAssignable<{ plugins: unknown[], rules: Record<string, true> }>(tailwindRecommended)
expectAssignable<{ plugins: unknown[], rules: Record<string, true> }>(unocssRecommended)
expectAssignable<object>(noAtomicClassPlugin)
expectAssignable<object>(noApplyPlugin)
expectType<'tailwindcss/no-atomic-class'>(noAtomicClassRuleName)
expectType<'tailwindcss/no-apply'>(noApplyRuleName)
expectType<'unocss/no-apply'>(UNOCSS_NO_APPLY_RULE_NAME)
expectType<Promise<boolean>>(isTailwindUtilityClass('flex'))
