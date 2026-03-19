export const TAILWINDCSS_NAMESPACE = 'tailwindcss'
export const UNOCSS_NAMESPACE = 'unocss'

function createRuleName(namespace: string, ruleName: string) {
  return `${namespace}/${ruleName}`
}

export const TAILWINDCSS_NO_ATOMIC_CLASS_RULE_NAME = createRuleName(
  TAILWINDCSS_NAMESPACE,
  'no-atomic-class',
) as 'tailwindcss/no-atomic-class'
export const TAILWINDCSS_NO_INVALID_APPLY_RULE_NAME = createRuleName(
  TAILWINDCSS_NAMESPACE,
  'no-invalid-apply',
) as 'tailwindcss/no-invalid-apply'
export const TAILWINDCSS_NO_APPLY_RULE_NAME = createRuleName(
  TAILWINDCSS_NAMESPACE,
  'no-apply',
) as 'tailwindcss/no-apply'
export const TAILWINDCSS_NO_ARBITRARY_VALUE_RULE_NAME = createRuleName(
  TAILWINDCSS_NAMESPACE,
  'no-arbitrary-value',
) as 'tailwindcss/no-arbitrary-value'

export const UNOCSS_NO_ATOMIC_CLASS_RULE_NAME = createRuleName(
  UNOCSS_NAMESPACE,
  'no-atomic-class',
) as 'unocss/no-atomic-class'
export const UNOCSS_NO_INVALID_APPLY_RULE_NAME = createRuleName(
  UNOCSS_NAMESPACE,
  'no-invalid-apply',
) as 'unocss/no-invalid-apply'
export const UNOCSS_NO_APPLY_RULE_NAME = createRuleName(
  UNOCSS_NAMESPACE,
  'no-apply',
) as 'unocss/no-apply'
export const UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME = createRuleName(
  UNOCSS_NAMESPACE,
  'no-arbitrary-value',
) as 'unocss/no-arbitrary-value'

export const NO_ATOMIC_CLASS_RULE_NAME = TAILWINDCSS_NO_ATOMIC_CLASS_RULE_NAME
export const NO_INVALID_APPLY_RULE_NAME = TAILWINDCSS_NO_INVALID_APPLY_RULE_NAME
export const NO_APPLY_RULE_NAME = TAILWINDCSS_NO_APPLY_RULE_NAME
export const NO_ARBITRARY_VALUE_RULE_NAME = TAILWINDCSS_NO_ARBITRARY_VALUE_RULE_NAME
