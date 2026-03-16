import type { Rule, Warning } from 'stylelint'
import stylelint from 'stylelint'
import { noInvalidApplyRuleFunction } from './apply-rule'
import {
  NO_APPLY_RULE_NAME,
  NO_ARBITRARY_VALUE_RULE_NAME,
  NO_ATOMIC_CLASS_RULE_NAME,
  NO_INVALID_APPLY_RULE_NAME,
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

interface StylelintPluginConfig {
  plugins: unknown[]
  rules: Record<string, true>
}

export { noInvalidApplyRuleFunction } from './apply-rule'
export { messages } from './messages'
export { noApplyMessages } from './messages'
export { noArbitraryValueMessages } from './messages'
export { noInvalidApplyMessages } from './messages'
export { noApplyRuleFunction } from './no-apply-rule'
export { noArbitraryValueRuleFunction } from './no-arbitrary-value-rule'
export { ruleFunction } from './rule'
export { isTailwindUtilityClass } from './runtime'

ruleFunction.ruleName = NO_ATOMIC_CLASS_RULE_NAME
ruleFunction.messages = messages as Rule['messages']
ruleFunction.meta = {
  url: 'https://github.com/sonofmagic/dev-configs',
}

const noAtomicClassPlugin = stylelint.createPlugin(NO_ATOMIC_CLASS_RULE_NAME, ruleFunction)
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

const base: StylelintPluginConfig = {
  plugins: [
    noAtomicClassPlugin,
    noInvalidApplyPlugin,
  ],
  rules: {
    [NO_ATOMIC_CLASS_RULE_NAME]: true,
    [NO_INVALID_APPLY_RULE_NAME]: true,
  },
}

const recommended: StylelintPluginConfig = {
  plugins: [
    noAtomicClassPlugin,
    noInvalidApplyPlugin,
    noApplyPlugin,
    noArbitraryValuePlugin,
  ],
  rules: {
    [NO_ATOMIC_CLASS_RULE_NAME]: true,
    [NO_INVALID_APPLY_RULE_NAME]: true,
    [NO_APPLY_RULE_NAME]: true,
    [NO_ARBITRARY_VALUE_RULE_NAME]: true,
  },
}

export {
  base,
  noApplyPlugin,
  NO_APPLY_RULE_NAME as noApplyRuleName,
  noArbitraryValuePlugin,
  NO_ARBITRARY_VALUE_RULE_NAME as noArbitraryValueRuleName,
  noAtomicClassPlugin,
  NO_ATOMIC_CLASS_RULE_NAME as noAtomicClassRuleName,
  noInvalidApplyPlugin,
  NO_INVALID_APPLY_RULE_NAME as noInvalidApplyRuleName,
  recommended,
}
export type { Warning }

export default recommended
