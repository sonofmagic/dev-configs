import type { UserConfig } from '@commitlint/types'
import {
  createIcebreakerCommitlintConfig,
  icebreaker,
  RuleConfigSeverity,
} from '@icebreakers/commitlint-config'
import { expectAssignable, expectType } from 'tsd'

expectType<UserConfig>(createIcebreakerCommitlintConfig())
expectType<UserConfig>(icebreaker({
  types: {
    severity: RuleConfigSeverity.Error,
  },
}))
expectAssignable<RuleConfigSeverity>(RuleConfigSeverity.Error)
