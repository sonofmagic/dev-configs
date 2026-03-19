import stylelint from 'stylelint'
import {
  NO_APPLY_RULE_NAME,
  NO_ARBITRARY_VALUE_RULE_NAME,
  NO_ATOMIC_CLASS_RULE_NAME,
  NO_INVALID_APPLY_RULE_NAME,
} from './constants'

function getFrameworkDisplayName(ruleName: string) {
  return ruleName.startsWith('unocss/') ? 'UnoCSS' : 'Tailwind CSS'
}

export function createMessages(ruleName: string) {
  const framework = getFrameworkDisplayName(ruleName)
  return stylelint.utils.ruleMessages(ruleName, {
    rejected: (className: string) =>
      `Unexpected ${framework} utility selector ".${className}"`,
  })
}

export function createNoInvalidApplyMessages(ruleName: string) {
  const framework = getFrameworkDisplayName(ruleName)
  return stylelint.utils.ruleMessages(ruleName, {
    rejected: (className: string) =>
      `Unexpected invalid ${framework} @apply candidate "${className}"`,
  })
}

export function createNoApplyMessages(ruleName: string) {
  const framework = getFrameworkDisplayName(ruleName)
  return stylelint.utils.ruleMessages(ruleName, {
    rejected: () => `Unexpected ${framework} @apply directive`,
  })
}

export function createNoArbitraryValueMessages(ruleName: string) {
  const framework = getFrameworkDisplayName(ruleName)
  return stylelint.utils.ruleMessages(ruleName, {
    rejected: (className: string) =>
      `Unexpected ${framework} arbitrary value candidate "${className}"`,
  })
}

export const messages = createMessages(NO_ATOMIC_CLASS_RULE_NAME)

export const noInvalidApplyMessages = createNoInvalidApplyMessages(
  NO_INVALID_APPLY_RULE_NAME,
)

export const noApplyMessages = createNoApplyMessages(NO_APPLY_RULE_NAME)

export const noArbitraryValueMessages = createNoArbitraryValueMessages(
  NO_ARBITRARY_VALUE_RULE_NAME,
)
