import type { Root as PostcssRoot } from 'postcss'
import type { Rule as StylelintRule } from 'stylelint'
import type stylelint from 'stylelint'
import { collectApplyCandidates } from 'postcss-tailwindcss'
import stylelintModule from 'stylelint'
import { NO_INVALID_APPLY_RULE_NAME } from './constants'
import { isLikelyUtilityClass } from './heuristics'
import { noInvalidApplyMessages } from './messages'
import { isTailwindUtilityClass } from './runtime'

type RuleResult = stylelint.PostcssResult

export const noInvalidApplyRuleFunction = ((primary: unknown) => {
  return async (root: PostcssRoot, result: RuleResult) => {
    const validOptions = stylelintModule.utils.validateOptions(result, NO_INVALID_APPLY_RULE_NAME, {
      actual: primary,
      possible: [true],
    })

    if (!validOptions || primary !== true) {
      return
    }

    const filePath = root.source?.input.file
    const applyEntries = collectApplyCandidates(root as unknown as PostcssRoot)

    for (const entry of applyEntries) {
      if (!isLikelyUtilityClass(entry.candidate)) {
        continue
      }

      if (await isTailwindUtilityClass(entry.candidate, filePath)) {
        continue
      }

      const params = entry.node.params
      const index = params.indexOf(entry.candidate)
      const endIndex = index === -1 ? undefined : index + entry.candidate.length

      stylelintModule.utils.report({
        result,
        ruleName: NO_INVALID_APPLY_RULE_NAME,
        message: noInvalidApplyMessages.rejected(entry.candidate),
        node: entry.node as never,
        ...(index !== -1 ? { index } : {}),
        ...(endIndex !== undefined ? { endIndex } : {}),
      })
    }
  }
}) as unknown as StylelintRule
