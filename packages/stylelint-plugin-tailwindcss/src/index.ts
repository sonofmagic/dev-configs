import type { Rule, Warning } from 'stylelint'
import stylelint from 'stylelint'
import { noInvalidApplyRuleFunction } from './apply-rule'
import { NO_INVALID_APPLY_RULE_NAME, RULE_NAME } from './constants'
import { messages, noInvalidApplyMessages } from './messages'
import { ruleFunction } from './rule'

export { noInvalidApplyRuleFunction } from './apply-rule'
export { messages } from './messages'
export { noInvalidApplyMessages } from './messages'
export { ruleFunction } from './rule'
export { isTailwindUtilityClass } from './runtime'

ruleFunction.ruleName = RULE_NAME
ruleFunction.messages = messages as Rule['messages']
ruleFunction.meta = {
  url: 'https://github.com/sonofmagic/dev-configs',
}

const plugin = stylelint.createPlugin(RULE_NAME, ruleFunction)
const noInvalidApplyPlugin = stylelint.createPlugin(
  NO_INVALID_APPLY_RULE_NAME,
  noInvalidApplyRuleFunction,
)

noInvalidApplyRuleFunction.ruleName = NO_INVALID_APPLY_RULE_NAME
noInvalidApplyRuleFunction.messages = noInvalidApplyMessages as Rule['messages']
noInvalidApplyRuleFunction.meta = {
  url: 'https://github.com/sonofmagic/dev-configs',
}

export {
  noInvalidApplyPlugin,
  NO_INVALID_APPLY_RULE_NAME as noInvalidApplyRuleName,
  plugin,
  RULE_NAME as ruleName,
}
export type { Warning }

export default plugin
