import type {
  ConfigNames,
  FlatConfigComposer,
  IcebreakerEslintConfig,
  IcebreakerLegacyEslintConfig,
  TypedFlatConfigItem,
  UserConfigItem,
  UserDefinedOptions,
} from '@icebreakers/eslint-config'
import { getPresets, icebreaker, icebreakerLegacy } from '@icebreakers/eslint-config'
import { expectAssignable, expectType } from 'tsd'

expectAssignable<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>>(icebreaker())
expectAssignable<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>>(icebreakerLegacy())
expectType<IcebreakerEslintConfig>(icebreaker())
expectType<IcebreakerLegacyEslintConfig>(icebreakerLegacy())
expectType<[UserDefinedOptions, ...UserConfigItem[]]>(getPresets())
