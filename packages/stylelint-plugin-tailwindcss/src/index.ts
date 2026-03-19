import type { Config, Plugin, Rule, Warning } from 'stylelint'
import stylelint from 'stylelint'
import {
  createNoInvalidApplyRuleFunction,
  noInvalidApplyRuleFunction,
} from './apply-rule'
import {
  NO_APPLY_RULE_NAME,
  NO_ARBITRARY_VALUE_RULE_NAME,
  NO_ATOMIC_CLASS_RULE_NAME,
  NO_INVALID_APPLY_RULE_NAME,
  TAILWINDCSS_NO_APPLY_RULE_NAME,
  TAILWINDCSS_NO_ARBITRARY_VALUE_RULE_NAME,
  TAILWINDCSS_NO_ATOMIC_CLASS_RULE_NAME,
  TAILWINDCSS_NO_INVALID_APPLY_RULE_NAME,
  UNOCSS_NO_APPLY_RULE_NAME,
  UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME,
  UNOCSS_NO_ATOMIC_CLASS_RULE_NAME,
  UNOCSS_NO_INVALID_APPLY_RULE_NAME,
} from './constants'
import {
  createMessages,
  createNoApplyMessages,
  createNoArbitraryValueMessages,
  createNoInvalidApplyMessages,
  messages,
  noApplyMessages,
  noArbitraryValueMessages,
  noInvalidApplyMessages,
} from './messages'
import { createNoApplyRuleFunction, noApplyRuleFunction } from './no-apply-rule'
import {
  createNoArbitraryValueRuleFunction,
  noArbitraryValueRuleFunction,
} from './no-arbitrary-value-rule'
import { createRuleFunction, ruleFunction } from './rule'

interface StylelintPluginConfig {
  plugins: Plugin[]
  rules: NonNullable<Config['rules']>
}

function createPluginBundle(names: {
  noApply: string
  noArbitraryValue: string
  noAtomicClass: string
  noInvalidApply: string
}) {
  const noAtomicClassRuleFunction = createRuleFunction(names.noAtomicClass)
  noAtomicClassRuleFunction.ruleName = names.noAtomicClass
  noAtomicClassRuleFunction.messages = createMessages(names.noAtomicClass) as Rule['messages']
  noAtomicClassRuleFunction.meta = {
    url: 'https://github.com/sonofmagic/dev-configs',
  }

  const noInvalidApplyRule = createNoInvalidApplyRuleFunction(names.noInvalidApply)
  noInvalidApplyRule.ruleName = names.noInvalidApply
  noInvalidApplyRule.messages = createNoInvalidApplyMessages(names.noInvalidApply) as Rule['messages']
  noInvalidApplyRule.meta = {
    url: 'https://github.com/sonofmagic/dev-configs',
  }

  const noApplyRule = createNoApplyRuleFunction(names.noApply)
  noApplyRule.ruleName = names.noApply
  noApplyRule.messages = createNoApplyMessages(names.noApply) as Rule['messages']
  noApplyRule.meta = {
    url: 'https://github.com/sonofmagic/dev-configs',
  }

  const noArbitraryValueRule = createNoArbitraryValueRuleFunction(names.noArbitraryValue)
  noArbitraryValueRule.ruleName = names.noArbitraryValue
  noArbitraryValueRule.messages = createNoArbitraryValueMessages(
    names.noArbitraryValue,
  ) as Rule['messages']
  noArbitraryValueRule.meta = {
    url: 'https://github.com/sonofmagic/dev-configs',
  }

  return {
    noApplyPlugin: stylelint.createPlugin(names.noApply, noApplyRule),
    noApplyRule,
    noArbitraryValuePlugin: stylelint.createPlugin(
      names.noArbitraryValue,
      noArbitraryValueRule,
    ),
    noArbitraryValueRule,
    noAtomicClassPlugin: stylelint.createPlugin(names.noAtomicClass, noAtomicClassRuleFunction),
    noAtomicClassRule: noAtomicClassRuleFunction,
    noInvalidApplyPlugin: stylelint.createPlugin(
      names.noInvalidApply,
      noInvalidApplyRule,
    ),
    noInvalidApplyRule,
  }
}

function createBaseConfig(plugins: {
  noAtomicClassPlugin: Plugin
  noInvalidApplyPlugin: Plugin
}, names: {
  noAtomicClass: string
  noInvalidApply: string
}): StylelintPluginConfig {
  return {
    plugins: [
      plugins.noAtomicClassPlugin,
      plugins.noInvalidApplyPlugin,
    ],
    rules: {
      [names.noAtomicClass]: true,
      [names.noInvalidApply]: true,
    },
  }
}

function createRecommendedConfig(plugins: {
  noApplyPlugin: Plugin
  noArbitraryValuePlugin: Plugin
  noAtomicClassPlugin: Plugin
  noInvalidApplyPlugin: Plugin
}, names: {
  noApply: string
  noArbitraryValue: string
  noAtomicClass: string
  noInvalidApply: string
}): StylelintPluginConfig {
  return {
    plugins: [
      plugins.noAtomicClassPlugin,
      plugins.noInvalidApplyPlugin,
      plugins.noApplyPlugin,
      plugins.noArbitraryValuePlugin,
    ],
    rules: {
      [names.noAtomicClass]: true,
      [names.noInvalidApply]: true,
      [names.noApply]: true,
      [names.noArbitraryValue]: true,
    },
  }
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

const unocssBundle = createPluginBundle({
  noApply: UNOCSS_NO_APPLY_RULE_NAME,
  noArbitraryValue: UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME,
  noAtomicClass: UNOCSS_NO_ATOMIC_CLASS_RULE_NAME,
  noInvalidApply: UNOCSS_NO_INVALID_APPLY_RULE_NAME,
})

const base: StylelintPluginConfig = {
  plugins: [
    noAtomicClassPlugin,
    noInvalidApplyPlugin,
    unocssBundle.noAtomicClassPlugin,
    unocssBundle.noInvalidApplyPlugin,
  ],
  rules: {
    [TAILWINDCSS_NO_ATOMIC_CLASS_RULE_NAME]: true,
    [TAILWINDCSS_NO_INVALID_APPLY_RULE_NAME]: true,
    [UNOCSS_NO_ATOMIC_CLASS_RULE_NAME]: true,
    [UNOCSS_NO_INVALID_APPLY_RULE_NAME]: true,
  },
}

const recommended: StylelintPluginConfig = {
  plugins: [
    noAtomicClassPlugin,
    noInvalidApplyPlugin,
    noApplyPlugin,
    noArbitraryValuePlugin,
    unocssBundle.noAtomicClassPlugin,
    unocssBundle.noInvalidApplyPlugin,
    unocssBundle.noApplyPlugin,
    unocssBundle.noArbitraryValuePlugin,
  ],
  rules: {
    [TAILWINDCSS_NO_ATOMIC_CLASS_RULE_NAME]: true,
    [TAILWINDCSS_NO_INVALID_APPLY_RULE_NAME]: true,
    [TAILWINDCSS_NO_APPLY_RULE_NAME]: true,
    [TAILWINDCSS_NO_ARBITRARY_VALUE_RULE_NAME]: true,
    [UNOCSS_NO_ATOMIC_CLASS_RULE_NAME]: true,
    [UNOCSS_NO_INVALID_APPLY_RULE_NAME]: true,
    [UNOCSS_NO_APPLY_RULE_NAME]: true,
    [UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME]: true,
  },
}

const tailwindBase = createBaseConfig(
  {
    noAtomicClassPlugin,
    noInvalidApplyPlugin,
  },
  {
    noAtomicClass: TAILWINDCSS_NO_ATOMIC_CLASS_RULE_NAME,
    noInvalidApply: TAILWINDCSS_NO_INVALID_APPLY_RULE_NAME,
  },
)

const tailwindRecommended = createRecommendedConfig(
  {
    noApplyPlugin,
    noArbitraryValuePlugin,
    noAtomicClassPlugin,
    noInvalidApplyPlugin,
  },
  {
    noApply: TAILWINDCSS_NO_APPLY_RULE_NAME,
    noArbitraryValue: TAILWINDCSS_NO_ARBITRARY_VALUE_RULE_NAME,
    noAtomicClass: TAILWINDCSS_NO_ATOMIC_CLASS_RULE_NAME,
    noInvalidApply: TAILWINDCSS_NO_INVALID_APPLY_RULE_NAME,
  },
)

const unocssBase = createBaseConfig(
  {
    noAtomicClassPlugin: unocssBundle.noAtomicClassPlugin,
    noInvalidApplyPlugin: unocssBundle.noInvalidApplyPlugin,
  },
  {
    noAtomicClass: UNOCSS_NO_ATOMIC_CLASS_RULE_NAME,
    noInvalidApply: UNOCSS_NO_INVALID_APPLY_RULE_NAME,
  },
)

const unocssRecommended = createRecommendedConfig(
  {
    noApplyPlugin: unocssBundle.noApplyPlugin,
    noArbitraryValuePlugin: unocssBundle.noArbitraryValuePlugin,
    noAtomicClassPlugin: unocssBundle.noAtomicClassPlugin,
    noInvalidApplyPlugin: unocssBundle.noInvalidApplyPlugin,
  },
  {
    noApply: UNOCSS_NO_APPLY_RULE_NAME,
    noArbitraryValue: UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME,
    noAtomicClass: UNOCSS_NO_ATOMIC_CLASS_RULE_NAME,
    noInvalidApply: UNOCSS_NO_INVALID_APPLY_RULE_NAME,
  },
)

const unocssNoAtomicClassPlugin = unocssBundle.noAtomicClassPlugin
const unocssNoInvalidApplyPlugin = unocssBundle.noInvalidApplyPlugin
const unocssNoApplyPlugin = unocssBundle.noApplyPlugin
const unocssNoArbitraryValuePlugin = unocssBundle.noArbitraryValuePlugin

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
  tailwindBase,
  TAILWINDCSS_NO_APPLY_RULE_NAME,
  TAILWINDCSS_NO_ARBITRARY_VALUE_RULE_NAME,
  TAILWINDCSS_NO_ATOMIC_CLASS_RULE_NAME,
  TAILWINDCSS_NO_INVALID_APPLY_RULE_NAME,
  tailwindRecommended,
  unocssBundle as unoBundle,
  UNOCSS_NO_APPLY_RULE_NAME,
  UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME,
  UNOCSS_NO_ATOMIC_CLASS_RULE_NAME,
  UNOCSS_NO_INVALID_APPLY_RULE_NAME,
  unocssBase,
  unocssBundle,
  unocssNoApplyPlugin,
  UNOCSS_NO_APPLY_RULE_NAME as unocssNoApplyRuleName,
  unocssNoArbitraryValuePlugin,
  UNOCSS_NO_ARBITRARY_VALUE_RULE_NAME as unocssNoArbitraryValueRuleName,
  unocssNoAtomicClassPlugin,
  UNOCSS_NO_ATOMIC_CLASS_RULE_NAME as unocssNoAtomicClassRuleName,
  unocssNoInvalidApplyPlugin,
  UNOCSS_NO_INVALID_APPLY_RULE_NAME as unocssNoInvalidApplyRuleName,
  unocssBundle as unocssPlugins,
  unocssRecommended,
  unocssBundle as unoPlugins,
}
export type { Warning }

export default recommended
