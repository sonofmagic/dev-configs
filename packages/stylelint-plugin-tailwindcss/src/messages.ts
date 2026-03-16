import stylelint from 'stylelint'
import { NO_INVALID_APPLY_RULE_NAME, RULE_NAME } from './constants'

export const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  rejected: (className: string) =>
    `Unexpected Tailwind CSS utility selector ".${className}"`,
})

export const noInvalidApplyMessages = stylelint.utils.ruleMessages(NO_INVALID_APPLY_RULE_NAME, {
  rejected: (className: string) =>
    `Unexpected invalid Tailwind CSS @apply candidate "${className}"`,
})
