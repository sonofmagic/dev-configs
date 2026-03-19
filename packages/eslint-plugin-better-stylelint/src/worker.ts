import { createRequire } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { runAsWorker } from 'synckit'

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
  parseErrors?: StylelintWarning[]
}

interface StylelintWorkerSuccess {
  ok: true
  result: StylelintResult
}

interface StylelintWorkerFailure {
  ok: false
  error: string
}

type StylelintWorkerResponse = StylelintWorkerSuccess | StylelintWorkerFailure

function createProjectRequire(cwd: string) {
  try {
    return createRequire(path.join(cwd, 'package.json'))
  }
  catch {
    return createRequire(import.meta.url)
  }
}

function resolveStylelintEntry(cwd: string) {
  const projectRequire = createProjectRequire(cwd)

  try {
    return projectRequire.resolve('stylelint')
  }
  catch {
    const localRequire = createRequire(import.meta.url)
    return localRequire.resolve('stylelint')
  }
}

async function runStylelint(
  code: string,
  filename: string,
  cwd: string,
): Promise<StylelintWorkerResponse> {
  try {
    const stylelintEntry = resolveStylelintEntry(cwd)
    const stylelintModule = await import(pathToFileURL(stylelintEntry).href)
    const stylelint = stylelintModule.default ?? stylelintModule
    const lintResult = await stylelint.lint({
      allowEmptyInput: true,
      code,
      codeFilename: filename,
      cwd,
    })

    return {
      ok: true,
      result: lintResult.results[0] ?? { warnings: [] },
    }
  }
  catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

runAsWorker(runStylelint)

export {
  createProjectRequire as __createProjectRequire,
  resolveStylelintEntry as __resolveStylelintEntry,
}
