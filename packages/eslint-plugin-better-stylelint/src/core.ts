import type { BetterStylelintMessage } from './types'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import process from 'node:process'

interface StylelintWarning {
  rule?: string
  severity?: 'error' | 'warning' | string
  text: string
  line?: number
  column?: number
  endLine?: number
  endColumn?: number
}

interface StylelintResult {
  warnings?: StylelintWarning[]
}

function createProjectRequire(cwd: string) {
  try {
    return createRequire(path.join(cwd, 'package.json'))
  }
  catch {
    return createRequire(import.meta.url)
  }
}

function resolveStylelintCli(cwd: string) {
  const projectRequire = createProjectRequire(cwd)
  const packageJsonPath = projectRequire.resolve('stylelint/package.json')
  return path.join(path.dirname(packageJsonPath), 'bin', 'stylelint.mjs')
}

function normalizeStylelintResults(
  output: string,
): BetterStylelintMessage[] {
  if (!output.trim()) {
    return []
  }

  const parsed = JSON.parse(output) as StylelintResult[]
  const firstResult = parsed[0]
  const warnings = firstResult?.warnings ?? []

  return warnings.map(warning => ({
    ruleId: warning.rule ?? 'stylelint',
    message: warning.text,
    line: warning.line ?? 1,
    column: warning.column ?? 1,
    ...(warning.endLine !== undefined ? { endLine: warning.endLine } : {}),
    ...(warning.endColumn !== undefined ? { endColumn: warning.endColumn } : {}),
    severity: warning.severity === 'warning' ? 1 : 2,
    ...(warning.rule === undefined ? { fatal: true } : {}),
  }))
}

export function runStylelintSync(
  code: string,
  filename: string,
  cwd = path.dirname(filename),
): BetterStylelintMessage[] {
  const stylelintCli = resolveStylelintCli(cwd)
  const result = spawnSync(
    process.execPath,
    [
      stylelintCli,
      '--formatter',
      'json',
      '--stdin-filename',
      filename,
      '--stdin',
      '--allow-empty-input',
    ],
    {
      cwd,
      encoding: 'utf8',
      input: code,
    },
  )

  if (result.error) {
    return [
      {
        ruleId: 'stylelint/bridge',
        message: result.error.message,
        line: 1,
        column: 1,
        severity: 2,
        fatal: true,
      },
    ]
  }

  if (result.stdout.trim()) {
    return normalizeStylelintResults(result.stdout)
  }

  if (result.status && result.stderr.trim()) {
    return [
      {
        ruleId: 'stylelint/bridge',
        message: result.stderr.trim(),
        line: 1,
        column: 1,
        severity: 2,
        fatal: true,
      },
    ]
  }

  return []
}
