import type { Root as PostcssRoot } from 'postcss'
import type { Rule as StylelintRule } from 'stylelint'
import type stylelint from 'stylelint'
import {
  collectApplyCandidates,
  collectUtilitySelectors,
} from 'postcss-tailwindcss'
import stylelintModule from 'stylelint'
import { NO_ARBITRARY_VALUE_RULE_NAME } from './constants'
import { isArbitraryValueUtilityClass } from './heuristics'
import { noArbitraryValueMessages } from './messages'

type RuleResult = stylelint.PostcssResult

export const noArbitraryValueRuleFunction = ((primary: unknown) => {
  return async (root: PostcssRoot, result: RuleResult) => {
    const validOptions = stylelintModule.utils.validateOptions(result, NO_ARBITRARY_VALUE_RULE_NAME, {
      actual: primary,
      possible: [true],
    })

    if (!validOptions || primary !== true) {
      return
    }

    const utilitySelectors = collectUtilitySelectors(root as unknown as PostcssRoot)

    for (const entry of utilitySelectors) {
      if (!isArbitraryValueUtilityClass(entry.className)) {
        continue
      }

      const selectorIndex = entry.selector.indexOf(`.${entry.className}`)
      const index = selectorIndex === -1 ? undefined : selectorIndex
      const endIndex = selectorIndex === -1
        ? undefined
        : selectorIndex + entry.className.length + 1

      stylelintModule.utils.report({
        result,
        ruleName: NO_ARBITRARY_VALUE_RULE_NAME,
        message: noArbitraryValueMessages.rejected(entry.className),
        node: entry.rule as never,
        ...(index !== undefined ? { index } : {}),
        ...(endIndex !== undefined ? { endIndex } : {}),
      })
    }

    const applyEntries = collectApplyCandidates(root as unknown as PostcssRoot)

    for (const entry of applyEntries) {
      if (!isArbitraryValueUtilityClass(entry.candidate)) {
        continue
      }

      const params = entry.node.params
      const index = params.indexOf(entry.candidate)
      const endIndex = index === -1 ? undefined : index + entry.candidate.length

      stylelintModule.utils.report({
        result,
        ruleName: NO_ARBITRARY_VALUE_RULE_NAME,
        message: noArbitraryValueMessages.rejected(entry.candidate),
        node: entry.node as never,
        ...(index !== -1 ? { index } : {}),
        ...(endIndex !== undefined ? { endIndex } : {}),
      })
    }
  }
}) as unknown as StylelintRule
