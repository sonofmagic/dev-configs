import type { IcebreakerStylelintOptions } from '@icebreakers/stylelint-config'
import {
  createStylelintConfig,
  icebreaker,
} from '@icebreakers/stylelint-config'
import { expectAssignable, expectType } from 'tsd'

const options: IcebreakerStylelintOptions = {
  presets: {
    vue: false,
  },
}

expectType<IcebreakerStylelintOptions>(options)
expectAssignable<{ rules?: Record<string, unknown>, plugins?: unknown }>(createStylelintConfig())
expectAssignable<{ rules?: Record<string, unknown>, plugins?: unknown }>(icebreaker())
