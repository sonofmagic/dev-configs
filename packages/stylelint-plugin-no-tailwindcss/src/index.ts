import type { Root as PostcssRoot } from 'postcss'
import type { Rule, Warning } from 'stylelint'
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import {
  collectUtilitySelectors,
  detectInstalledTailwindVersion,
  resolveTailwindRuntime,
} from 'postcss-tailwindcss'
import stylelint from 'stylelint'
import { RULE_NAME } from './constants'

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  rejected: (className: string) =>
    `Unexpected Tailwind CSS utility selector ".${className}"`,
})

type TailwindMajorVersion = 3 | 4
interface TailwindRuntimeContextV3 {
  candidateRuleContext: object
  generateRules: (candidates: Set<string>, context: object) => unknown[]
}

interface TailwindV4DesignSystem {
  candidatesToCss: (classes: string[]) => Array<string | null>
}

interface TailwindV4ModuleLoaderResult {
  base: string
  module: unknown
}

const tailwindV3ContextCache = new Map<string, Promise<TailwindRuntimeContextV3>>()
const tailwindV3CandidateCache = new Map<string, Map<string, boolean>>()
const detectedVersionCache = new Map<string, Promise<TailwindMajorVersion>>()
const tailwindV4DesignSystemCache = new Map<string, Promise<TailwindV4DesignSystem>>()
const tailwindV4CandidateCacheByRuntime = new Map<string, Map<string, boolean>>()

function createContextFromFile(filePath: string) {
  return createRequire(filePath)
}

function resolveRuntimeCwd(fromFile?: string): string {
  return fromFile ? path.dirname(fromFile) : process.cwd()
}

async function detectTailwindMajorVersion(fromFile?: string): Promise<TailwindMajorVersion> {
  const runtime = resolveTailwindRuntime({
    cwd: resolveRuntimeCwd(fromFile),
  })
  const cacheKey = runtime.packageJsonPath ?? 'default'
  const cached = detectedVersionCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const detectionPromise = (async () => {
    const installedVersion = detectInstalledTailwindVersion({
      cwd: resolveRuntimeCwd(fromFile),
    })

    if (installedVersion === 'unknown') {
      return 4
    }

    return installedVersion
  })()

  detectedVersionCache.set(cacheKey, detectionPromise)
  return detectionPromise
}

async function getTailwindV3RuntimeContext(fromFile?: string): Promise<TailwindRuntimeContextV3> {
  const runtime = resolveTailwindRuntime({
    cwd: resolveRuntimeCwd(fromFile),
  })
  const cacheKey = runtime.packageJsonPath ?? 'default'
  const cached = tailwindV3ContextCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const runtimePromise = (async () => {
    if (!runtime.installationPath) {
      throw new Error('Unable to resolve Tailwind CSS v3 from the current project.')
    }

    const defaultConfigModule = await import(pathToFileURL(
      `${runtime.installationPath}/defaultConfig.js`,
    ).href)
    const loadConfigModule = await import(pathToFileURL(
      `${runtime.installationPath}/loadConfig.js`,
    ).href)
    const resolveConfigModule = await import(pathToFileURL(
      `${runtime.installationPath}/resolveConfig.js`,
    ).href)
    const setupContextUtilsModule = await import(pathToFileURL(
      `${runtime.installationPath}/lib/lib/setupContextUtils.js`,
    ).href)
    const generateRulesModule = await import(pathToFileURL(
      `${runtime.installationPath}/lib/lib/generateRules.js`,
    ).href)

    const defaultConfig = defaultConfigModule.default
    const loadConfig = loadConfigModule.default
    const resolveConfig = resolveConfigModule.default
    const createContext = setupContextUtilsModule.createContext
      ?? setupContextUtilsModule.default?.createContext
    const generateRules = generateRulesModule.generateRules
      ?? generateRulesModule.default?.generateRules

    const config = resolveConfig(
      runtime.configPath
        ? loadConfig(runtime.configPath)
        : defaultConfig,
    )

    return {
      candidateRuleContext: createContext(config),
      generateRules,
    }
  })()

  tailwindV3ContextCache.set(cacheKey, runtimePromise)
  return runtimePromise
}

async function isTailwindUtilityClassV3(className: string, fromFile?: string): Promise<boolean> {
  const runtime = resolveTailwindRuntime({
    cwd: resolveRuntimeCwd(fromFile),
  })
  const cacheKey = runtime.packageJsonPath ?? 'default'
  const cache = tailwindV3CandidateCache.get(cacheKey) ?? new Map<string, boolean>()

  if (tailwindV3CandidateCache.get(cacheKey) === undefined) {
    tailwindV3CandidateCache.set(cacheKey, cache)
  }

  const cached = cache.get(className)
  if (cached !== undefined) {
    return cached
  }

  const context = await getTailwindV3RuntimeContext(fromFile)
  const matched = context.generateRules(
    new Set([className]),
    context.candidateRuleContext,
  ).length > 0

  cache.set(className, matched)
  return matched
}

async function getTailwindV4DesignSystem(fromFile?: string): Promise<TailwindV4DesignSystem> {
  const cwd = resolveRuntimeCwd(fromFile)
  const runtime = resolveTailwindRuntime({ cwd })
  const cacheKey = runtime.packageJsonPath ?? 'default'
  const cached = tailwindV4DesignSystemCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const designSystemPromise = (async () => {
    if (!runtime.packageJsonPath) {
      throw new Error('Unable to resolve Tailwind CSS v4 from the current project.')
    }

    const packageJsonPath = runtime.packageJsonPath
    const tailwindEntry = createContextFromFile(packageJsonPath).resolve('tailwindcss')
    const tailwindModule = await import(pathToFileURL(tailwindEntry).href)

    const cssSource = '@import "tailwindcss";'
    return tailwindModule.__unstable__loadDesignSystem(cssSource, {
      base: cwd,
      loadModule: async (
        id: string,
        base: string,
      ): Promise<TailwindV4ModuleLoaderResult> => {
        const resolver = createContextFromFile(path.join(base, 'package.json'))
        const resolvedPath = resolver.resolve(id)
        return {
          base: path.dirname(resolvedPath),
          module: await import(pathToFileURL(resolvedPath).href),
        }
      },
      loadStylesheet: async (
        id: string,
        base: string,
      ): Promise<{ base: string, content: string }> => {
        let resolvedPath: string

        if (id === 'tailwindcss' && runtime.cssEntryPath) {
          resolvedPath = runtime.cssEntryPath
        }
        else if (id.startsWith('.')) {
          resolvedPath = path.resolve(base, id)
        }
        else {
          try {
            resolvedPath = createContextFromFile(packageJsonPath).resolve(id)
          }
          catch {
            resolvedPath = path.resolve(base, id)
          }
        }

        return {
          base: path.dirname(resolvedPath),
          content: await fs.readFile(resolvedPath, 'utf8'),
        }
      },
    })
  })()

  tailwindV4DesignSystemCache.set(cacheKey, designSystemPromise)
  return designSystemPromise
}

async function isTailwindUtilityClassV4(className: string, fromFile?: string): Promise<boolean> {
  const runtime = resolveTailwindRuntime({
    cwd: resolveRuntimeCwd(fromFile),
  })
  const cacheKey = runtime.packageJsonPath ?? 'default'
  const cache = tailwindV4CandidateCacheByRuntime.get(cacheKey) ?? new Map<string, boolean>()

  if (tailwindV4CandidateCacheByRuntime.get(cacheKey) === undefined) {
    tailwindV4CandidateCacheByRuntime.set(cacheKey, cache)
  }

  const cached = cache.get(className)
  if (cached !== undefined) {
    return cached
  }

  const designSystem = await getTailwindV4DesignSystem(fromFile)
  const matched = designSystem.candidatesToCss([className])[0] !== null
  cache.set(className, matched)
  return matched
}

export async function isTailwindUtilityClass(className: string, fromFile?: string): Promise<boolean> {
  const majorVersion = await detectTailwindMajorVersion(fromFile)
  return majorVersion === 4
    ? isTailwindUtilityClassV4(className, fromFile)
    : isTailwindUtilityClassV3(className, fromFile)
}

const ruleFunction: Rule = (primary) => {
  return async (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, RULE_NAME, {
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

      stylelint.utils.report({
        result,
        ruleName: RULE_NAME,
        message: messages.rejected(entry.className),
        node: entry.rule as never,
        ...(entry.index !== undefined ? { index: entry.index } : {}),
        ...(entry.endIndex !== undefined ? { endIndex: entry.endIndex } : {}),
      })
    }
  }
}

ruleFunction.ruleName = RULE_NAME
ruleFunction.messages = messages as Rule['messages']
ruleFunction.meta = {
  url: 'https://github.com/sonofmagic/dev-configs',
}

const plugin = stylelint.createPlugin(RULE_NAME, ruleFunction)

export { messages, plugin, RULE_NAME as ruleName }
export type { Warning }

export default plugin
