import stylelint from 'stylelint'
import { RULE_NAME } from './constants'

export const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  rejected: (className: string) =>
    `Unexpected Tailwind CSS utility selector ".${className}"`,
})
