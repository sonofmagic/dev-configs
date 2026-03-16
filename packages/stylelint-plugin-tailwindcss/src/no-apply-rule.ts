import type { Root as PostcssRoot } from 'postcss'
import type { Rule as StylelintRule } from 'stylelint'
import type stylelint from 'stylelint'
import stylelintModule from 'stylelint'
import { NO_APPLY_RULE_NAME } from './constants'
import { noApplyMessages } from './messages'

type RuleResult = stylelint.PostcssResult

export const noApplyRuleFunction = ((primary: unknown) => {
  return async (root: PostcssRoot, result: RuleResult) => {
    const validOptions = stylelintModule.utils.validateOptions(result, NO_APPLY_RULE_NAME, {
      actual: primary,
      possible: [true],
    })

    if (!validOptions || primary !== true) {
      return
    }

    root.walkAtRules('apply', (atRule) => {
      stylelintModule.utils.report({
        result,
        ruleName: NO_APPLY_RULE_NAME,
        message: noApplyMessages.rejected(),
        node: atRule as never,
      })
    })
  }
}) as unknown as StylelintRule
