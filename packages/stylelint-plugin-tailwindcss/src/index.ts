import type { Rule, Warning } from 'stylelint'
import stylelint from 'stylelint'
import { noInvalidApplyRuleFunction } from './apply-rule'
import {
  NO_APPLY_RULE_NAME,
  NO_ARBITRARY_VALUE_RULE_NAME,
  NO_INVALID_APPLY_RULE_NAME,
  RULE_NAME,
} from './constants'
import {
  messages,
  noApplyMessages,
  noArbitraryValueMessages,
  noInvalidApplyMessages,
} from './messages'
import { noApplyRuleFunction } from './no-apply-rule'
import { noArbitraryValueRuleFunction } from './no-arbitrary-value-rule'
import { ruleFunction } from './rule'

export { noInvalidApplyRuleFunction } from './apply-rule'
export { messages } from './messages'
export { noApplyMessages } from './messages'
export { noArbitraryValueMessages } from './messages'
export { noInvalidApplyMessages } from './messages'
export { noApplyRuleFunction } from './no-apply-rule'
export { noArbitraryValueRuleFunction } from './no-arbitrary-value-rule'
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
const noApplyPlugin = stylelint.createPlugin(
  NO_APPLY_RULE_NAME,
  noApplyRuleFunction,
)
const noArbitraryValuePlugin = stylelint.createPlugin(
  NO_ARBITRARY_VALUE_RULE_NAME,
  noArbitraryValueRuleFunction,
)

noInvalidApplyRuleFunction.ruleName = NO_INVALID_APPLY_RULE_NAME
noInvalidApplyRuleFunction.messages = noInvalidApplyMessages as Rule['messages']
noInvalidApplyRuleFunction.meta = {
  url: 'https://github.com/sonofmagic/dev-configs',
}

noApplyRuleFunction.ruleName = NO_APPLY_RULE_NAME
noApplyRuleFunction.messages = noApplyMessages as Rule['messages']
noApplyRuleFunction.meta = {
  url: 'https://github.com/sonofmagic/dev-configs',
}

noArbitraryValueRuleFunction.ruleName = NO_ARBITRARY_VALUE_RULE_NAME
noArbitraryValueRuleFunction.messages = noArbitraryValueMessages as Rule['messages']
noArbitraryValueRuleFunction.meta = {
  url: 'https://github.com/sonofmagic/dev-configs',
}

export {
  noApplyPlugin,
  NO_APPLY_RULE_NAME as noApplyRuleName,
  noArbitraryValuePlugin,
  NO_ARBITRARY_VALUE_RULE_NAME as noArbitraryValueRuleName,
  noInvalidApplyPlugin,
  NO_INVALID_APPLY_RULE_NAME as noInvalidApplyRuleName,
  plugin,
  RULE_NAME as ruleName,
}
export type { Warning }

export default plugin
