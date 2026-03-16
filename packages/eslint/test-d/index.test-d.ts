import type {
  ConfigNames,
  FlatConfigComposer,
  TypedFlatConfigItem,
  UserConfigItem,
  UserDefinedOptions,
} from '@icebreakers/eslint-config'
import { getPresets, icebreaker, icebreakerLegacy } from '@icebreakers/eslint-config'
import { expectAssignable, expectType } from 'tsd'

expectAssignable<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>>(icebreaker())
expectAssignable<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>>(icebreakerLegacy())
expectType<[UserDefinedOptions, ...UserConfigItem[]]>(getPresets())
