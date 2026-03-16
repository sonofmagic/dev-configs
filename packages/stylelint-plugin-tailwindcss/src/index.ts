import type { Rule, Warning } from 'stylelint'
import stylelint from 'stylelint'
import { RULE_NAME } from './constants'
import { messages } from './messages'
import { ruleFunction } from './rule'

export { messages } from './messages'
export { ruleFunction } from './rule'
export { isTailwindUtilityClass } from './runtime'

ruleFunction.ruleName = RULE_NAME
ruleFunction.messages = messages as Rule['messages']
ruleFunction.meta = {
  url: 'https://github.com/sonofmagic/dev-configs',
}

const plugin = stylelint.createPlugin(RULE_NAME, ruleFunction)

export { plugin, RULE_NAME as ruleName }
export type { Warning }

export default plugin
