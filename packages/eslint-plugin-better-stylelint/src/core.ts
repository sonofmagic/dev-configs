import type { BetterStylelintMessage } from './types'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSyncFn } from 'synckit'

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
type RunStylelintWorker = (
  code: string,
  filename: string,
  cwd: string,
) => StylelintWorkerResponse

const MAX_CACHE_ENTRIES = 100
const CORE_TS_PATTERN = /core\.ts$/u
const CORE_JS_PATTERN = /core\.js$/u
const resultCache = new Map<string, BetterStylelintMessage[]>()
let runStylelintWorker: RunStylelintWorker | undefined

function normalizeStylelintResults(
  result: StylelintResult,
): BetterStylelintMessage[] {
  const warnings = [
    ...(result.warnings ?? []),
    ...(result.parseErrors ?? []),
  ]

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

function createBridgeError(message: string): BetterStylelintMessage[] {
  return [
    {
      ruleId: 'stylelint/bridge',
      message,
      line: 1,
      column: 1,
      severity: 2,
      fatal: true,
    },
  ]
}

function cloneMessages(messages: BetterStylelintMessage[]): BetterStylelintMessage[] {
  return messages.map(message => ({ ...message }))
}

function createCacheKey(code: string, filename: string, cwd: string): string {
  const codeHash = createHash('sha1').update(code).digest('hex')
  return `${cwd}\0${filename}\0${codeHash}`
}

function getCachedMessages(cacheKey: string): BetterStylelintMessage[] | undefined {
  const cached = resultCache.get(cacheKey)

  if (!cached) {
    return undefined
  }

  resultCache.delete(cacheKey)
  resultCache.set(cacheKey, cached)
  return cloneMessages(cached)
}

function setCachedMessages(cacheKey: string, messages: BetterStylelintMessage[]): BetterStylelintMessage[] {
  if (resultCache.has(cacheKey)) {
    resultCache.delete(cacheKey)
  }

  resultCache.set(cacheKey, messages)

  while (resultCache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = resultCache.keys().next().value
    if (oldestKey === undefined) {
      break
    }
    resultCache.delete(oldestKey)
  }

  return cloneMessages(messages)
}

function resolveWorkerPath() {
  const currentFilePath = fileURLToPath(import.meta.url)
  if (currentFilePath.endsWith('.ts')) {
    return currentFilePath.replace(CORE_TS_PATTERN, 'worker.ts')
  }
  return currentFilePath.replace(CORE_JS_PATTERN, 'worker.js')
}

function getRunStylelintWorker(): RunStylelintWorker {
  runStylelintWorker ??= createSyncFn<RunStylelintWorker>(resolveWorkerPath())
  return runStylelintWorker
}

export function runStylelintSync(
  code: string,
  filename: string,
  cwd = path.dirname(filename),
): BetterStylelintMessage[] {
  const cacheKey = createCacheKey(code, filename, cwd)
  const cached = getCachedMessages(cacheKey)

  if (cached) {
    return cached
  }

  const response = getRunStylelintWorker()(code, filename, cwd)

  if (!response.ok) {
    return setCachedMessages(cacheKey, createBridgeError(response.error))
  }

  return setCachedMessages(cacheKey, normalizeStylelintResults(response.result))
}

export function __clearStylelintResultCache() {
  resultCache.clear()
}

export function __getStylelintResultCacheSize() {
  return resultCache.size
}

export function __resetStylelintWorker() {
  runStylelintWorker = undefined
}
