import type { BetterStylelintRuleOptions } from './types'
import { runStylelintSync } from './core'

interface RuleContext {
  filename: string
  options: BetterStylelintRuleOptions[]
  report: (descriptor: {
    loc: {
      start: { line: number, column: number }
      end?: { line: number, column: number }
    }
    message: string
  }) => void
  sourceCode: {
    text: string
  }
}

function getColumn(value: number | undefined) {
  return Math.max(0, (value ?? 1) - 1)
}

export const lintRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Run Stylelint and surface its diagnostics through ESLint',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          cwd: {
            type: 'string',
          },
        },
      },
    ],
  },
  create(context: RuleContext) {
    return {
      Program() {
        if (!context.filename.endsWith('.vue')) {
          return
        }

        const options = context.options[0]
        const cwd = options?.cwd
        const diagnostics = runStylelintSync(
          context.sourceCode.text,
          context.filename,
          cwd,
        )

        for (const diagnostic of diagnostics) {
          context.report({
            loc: {
              start: {
                line: diagnostic.line,
                column: getColumn(diagnostic.column),
              },
              ...(diagnostic.endLine !== undefined || diagnostic.endColumn !== undefined
                ? {
                    end: {
                      line: diagnostic.endLine ?? diagnostic.line,
                      column: getColumn(diagnostic.endColumn ?? diagnostic.column),
                    },
                  }
                : {}),
            },
            message: diagnostic.ruleId
              ? `${diagnostic.message} (${diagnostic.ruleId})`
              : diagnostic.message,
          })
        }
      },
    }
  },
}
