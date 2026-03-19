import type { Root as PostcssRoot } from 'postcss'
import type { Rule as StylelintRule } from 'stylelint'
import type stylelint from 'stylelint'
import { collectUtilitySelectors } from 'postcss-tailwindcss'
import stylelintModule from 'stylelint'
import { NO_ATOMIC_CLASS_RULE_NAME } from './constants'
import { createMessages, messages } from './messages'
import { isTailwindUtilityClass } from './runtime'

type RuleResult = stylelint.PostcssResult

export function createRuleFunction(ruleName: string) {
  const ruleMessages = createMessages(ruleName)
  return ((primary: unknown) => {
    return async (root: PostcssRoot, result: RuleResult) => {
      const validOptions = stylelintModule.utils.validateOptions(result, ruleName, {
        actual: primary,
        possible: [true],
      })

      if (!validOptions || primary !== true) {
        return
      }

      const filePath = root.source?.input.file
      const classEntries = collectUtilitySelectors(root as unknown as PostcssRoot).map((entry) => {
        const selectorIndex = entry.selector.indexOf(`.${entry.className}`)

        return {
          className: entry.className,
          endIndex: selectorIndex === -1
            ? undefined
            : selectorIndex + entry.className.length + 1,
          index: selectorIndex === -1 ? undefined : selectorIndex,
          rule: entry.rule,
        }
      })

      for (const entry of classEntries) {
        if (!await isTailwindUtilityClass(entry.className, filePath)) {
          continue
        }

        stylelintModule.utils.report({
          result,
          ruleName,
          message: ruleMessages.rejected(entry.className),
          node: entry.rule as never,
          ...(entry.index !== undefined ? { index: entry.index } : {}),
          ...(entry.endIndex !== undefined ? { endIndex: entry.endIndex } : {}),
        })
      }
    }
  }) as unknown as StylelintRule
}

export const ruleFunction = createRuleFunction(NO_ATOMIC_CLASS_RULE_NAME)
