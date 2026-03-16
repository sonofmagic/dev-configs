import type { Root as PostcssRoot } from 'postcss'
import type { Rule, Warning } from 'stylelint'
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import process from 'node:process'
import { collectUtilitySelectors } from 'postcss-tailwindcss'
import stylelint from 'stylelint'
import generateRulesModule from 'tailwindcss-v3/lib/lib/generateRules.js'
import setupContextUtils from 'tailwindcss-v3/lib/lib/setupContextUtils.js'
import resolveConfig from 'tailwindcss-v3/resolveConfig.js'
import defaultTailwindConfig from 'tailwindcss-v3/stubs/config.full.js'
import { RULE_NAME } from './constants'

const { generateRules } = generateRulesModule
const { createContext } = setupContextUtils
const requireFromPlugin = createRequire(import.meta.url)

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  rejected: (className: string) =>
    `Unexpected Tailwind CSS utility selector ".${className}"`,
})

type TailwindMajorVersion = 3 | 4
interface TailwindV4DesignSystem {
  candidatesToCss: (classes: string[]) => Array<string | null>
}

const tailwindV3Context = createContext(resolveConfig(defaultTailwindConfig))
const tailwindV3CandidateCache = new Map<string, boolean>()
const tailwindV4CandidateCache = new Map<string, boolean>()
const detectedVersionCache = new Map<string, Promise<TailwindMajorVersion>>()
let tailwindV4DesignSystemPromise: Promise<TailwindV4DesignSystem> | undefined

function resolveTailwindPackageJson(fromFile?: string): string | null {
  const candidates = [
    fromFile ? path.dirname(fromFile) : '',
    process.cwd(),
  ].filter(Boolean)

  for (const candidate of candidates) {
    try {
      return createRequire(path.join(candidate, 'package.json')).resolve('tailwindcss/package.json')
    }
    catch {
      // keep searching from the next candidate
    }
  }

  try {
    return requireFromPlugin.resolve('tailwindcss/package.json')
  }
  catch {
    return null
  }
}

async function detectTailwindMajorVersion(fromFile?: string): Promise<TailwindMajorVersion> {
  const resolvedPackageJson = resolveTailwindPackageJson(fromFile)
  const cacheKey = resolvedPackageJson ?? 'default'
  const cached = detectedVersionCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const detectionPromise = (async () => {
    if (!resolvedPackageJson) {
      return 4
    }

    const packageJson = JSON.parse(await fs.readFile(resolvedPackageJson, 'utf8')) as {
      version?: string
    }

    return packageJson.version?.startsWith('4.') ? 4 : 3
  })()

  detectedVersionCache.set(cacheKey, detectionPromise)
  return detectionPromise
}

function isTailwindUtilityClassV3(className: string): boolean {
  const cached = tailwindV3CandidateCache.get(className)
  if (cached !== undefined) {
    return cached
  }

  const matched = generateRules(new Set([className]), tailwindV3Context).length > 0
  tailwindV3CandidateCache.set(className, matched)
  return matched
}

async function getTailwindV4DesignSystem(): Promise<TailwindV4DesignSystem> {
  if (!tailwindV4DesignSystemPromise) {
    tailwindV4DesignSystemPromise = import('@tailwindcss/node').then((module) => {
      return module.__unstable__loadDesignSystem('@import "tailwindcss";', {
        base: process.cwd(),
      })
    })
  }

  return tailwindV4DesignSystemPromise
}

async function isTailwindUtilityClassV4(className: string): Promise<boolean> {
  const cached = tailwindV4CandidateCache.get(className)
  if (cached !== undefined) {
    return cached
  }

  const designSystem = await getTailwindV4DesignSystem()
  const matched = designSystem.candidatesToCss([className])[0] !== null
  tailwindV4CandidateCache.set(className, matched)
  return matched
}

export async function isTailwindUtilityClass(className: string, fromFile?: string): Promise<boolean> {
  const majorVersion = await detectTailwindMajorVersion(fromFile)
  return majorVersion === 4
    ? isTailwindUtilityClassV4(className)
    : isTailwindUtilityClassV3(className)
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
