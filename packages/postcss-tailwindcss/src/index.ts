import type { AtRule, Declaration, Node, Root, Rule } from 'postcss'
import postcss from 'postcss'
import valueParser from 'postcss-value-parser'

export type TailwindVersion = 3 | 4 | 'unknown'

const ESCAPED_BACKSLASH_RE = /\\\\/g
const ESCAPED_CHAR_RE = /\\(.)/g
const WHITESPACE_RE = /\s/
const IMPORT_TARGET_RE = /^['"]|['"]$/g
const SELECTOR_BREAK_RE = /[#.,\s>+~]/

export interface UtilityCandidate {
  candidate: string
  node: AtRule
  source?: Node['source']
}

export interface ThemeCall {
  raw: string
  path: string
  opacity: string | null
  node: Declaration | AtRule
  source?: Node['source']
}

export interface TailwindImportDirective {
  importTarget: string
  functions: Array<{
    name: string
    value: string
  }>
  hasLayerKeyword: boolean
  mediaQuery: string | null
  node: AtRule
  source?: Node['source']
}

export interface UtilitySelector {
  className: string
  rule: Rule
  selector: string
  source?: Node['source']
}

export interface TailwindAnalysis {
  version: TailwindVersion
  applyCandidates: UtilityCandidate[]
  themeCalls: ThemeCall[]
  importDirectives: TailwindImportDirective[]
  utilitySelectors: UtilitySelector[]
}

function unescapeCssIdentifier(value: string): string {
  return value
    .replace(ESCAPED_BACKSLASH_RE, '\\')
    .replace(ESCAPED_CHAR_RE, '$1')
}

function toRoot(input: Root | string): Root {
  return typeof input === 'string' ? postcss.parse(input) : input
}

export function parseTailwindCss(input: Root | string): Root {
  return toRoot(input)
}

function splitCandidateList(input: string): string[] {
  const candidates: string[] = []
  let current = ''
  let bracketDepth = 0
  let parenDepth = 0
  let quote: '"' | '\'' | null = null
  let escaped = false

  for (const char of input) {
    if (escaped) {
      current += char
      escaped = false
      continue
    }

    if (char === '\\') {
      current += char
      escaped = true
      continue
    }

    if (quote) {
      current += char
      if (char === quote) {
        quote = null
      }
      continue
    }

    if (char === '"' || char === '\'') {
      current += char
      quote = char
      continue
    }

    if (char === '[') {
      bracketDepth += 1
      current += char
      continue
    }

    if (char === ']') {
      bracketDepth = Math.max(0, bracketDepth - 1)
      current += char
      continue
    }

    if (char === '(') {
      parenDepth += 1
      current += char
      continue
    }

    if (char === ')') {
      parenDepth = Math.max(0, parenDepth - 1)
      current += char
      continue
    }

    if (WHITESPACE_RE.test(char) && bracketDepth === 0 && parenDepth === 0) {
      const value = current.trim()
      if (value) {
        candidates.push(value)
      }
      current = ''
      continue
    }

    current += char
  }

  const last = current.trim()
  if (last) {
    candidates.push(last)
  }

  return candidates
}

function parseThemeArgument(raw: string): Pick<ThemeCall, 'path' | 'opacity'> {
  let bracketDepth = 0
  let parenDepth = 0
  let slashIndex = -1

  for (let i = 0; i < raw.length; i += 1) {
    const char = raw[i]
    if (char === '[') {
      bracketDepth += 1
    }
    else if (char === ']') {
      bracketDepth = Math.max(0, bracketDepth - 1)
    }
    else if (char === '(') {
      parenDepth += 1
    }
    else if (char === ')') {
      parenDepth = Math.max(0, parenDepth - 1)
    }
    else if (char === '/' && bracketDepth === 0 && parenDepth === 0) {
      slashIndex = i
      break
    }
  }

  if (slashIndex === -1) {
    return {
      path: raw.trim(),
      opacity: null,
    }
  }

  return {
    path: raw.slice(0, slashIndex).trim(),
    opacity: raw.slice(slashIndex + 1).trim() || null,
  }
}

function hasTailwindV4Signals(root: Root): boolean {
  let found = false

  root.walkAtRules((atRule) => {
    if ([
      'theme',
      'source',
      'utility',
      'variant',
      'custom-variant',
      'plugin',
      'reference',
    ].includes(atRule.name)) {
      found = true
      return false
    }

    if (atRule.name === 'import' && atRule.params.includes('tailwindcss')) {
      found = true
      return false
    }

    return undefined
  })

  if (found) {
    return true
  }

  root.walkDecls((decl) => {
    if (decl.value.includes('--alpha(') || decl.value.includes('--spacing(')) {
      found = true
      return false
    }
    return undefined
  })

  return found
}

function hasTailwindV3Signals(root: Root): boolean {
  let found = false

  root.walkAtRules((atRule) => {
    if (['tailwind', 'config'].includes(atRule.name)) {
      found = true
      return false
    }
    return undefined
  })

  if (found) {
    return true
  }

  root.walkDecls((decl) => {
    if (decl.value.includes('theme(')) {
      found = true
      return false
    }
    return undefined
  })

  return found
}

export function detectTailwindVersion(input: Root | string): TailwindVersion {
  const root = toRoot(input)
  const hasV4 = hasTailwindV4Signals(root)
  const hasV3 = hasTailwindV3Signals(root)

  if (hasV4) {
    return 4
  }

  if (hasV3) {
    return 3
  }

  return 'unknown'
}

export function collectApplyCandidates(input: Root | string): UtilityCandidate[] {
  const root = toRoot(input)
  const candidates: UtilityCandidate[] = []

  root.walkAtRules('apply', (atRule) => {
    for (const candidate of splitCandidateList(atRule.params)) {
      candidates.push({
        candidate,
        node: atRule,
        source: atRule.source,
      })
    }
  })

  return candidates
}

function collectThemeCallsFromNode(
  node: Declaration | AtRule,
  rawValue: string,
  calls: ThemeCall[],
): void {
  const parsed = valueParser(rawValue)

  parsed.walk((valueNode) => {
    if (valueNode.type !== 'function' || valueNode.value !== 'theme') {
      return
    }

    const raw = valueParser.stringify(valueNode.nodes).trim()
    const { path, opacity } = parseThemeArgument(raw)

    calls.push({
      raw,
      path,
      opacity,
      node,
      source: node.source,
    })
  })
}

export function collectThemeCalls(input: Root | string): ThemeCall[] {
  const root = toRoot(input)
  const calls: ThemeCall[] = []

  root.walkDecls((decl) => {
    collectThemeCallsFromNode(decl, decl.value, calls)
  })

  root.walkAtRules((atRule) => {
    if (atRule.params.includes('theme(')) {
      collectThemeCallsFromNode(atRule, atRule.params, calls)
    }
  })

  return calls
}

export function collectImportDirectives(input: Root | string): TailwindImportDirective[] {
  const root = toRoot(input)
  const directives: TailwindImportDirective[] = []

  root.walkAtRules('import', (atRule) => {
    if (!atRule.params.includes('tailwindcss')) {
      return
    }

    const parsed = valueParser(atRule.params)
    let importTarget = ''
    const functions: TailwindImportDirective['functions'] = []
    let hasLayerKeyword = false
    let mediaQuery: string | null = null
    let sawImportTarget = false
    let mediaStartIndex = -1

    for (const [index, node] of parsed.nodes.entries()) {
      if (node.type === 'space') {
        continue
      }

      if (
        !sawImportTarget
        && (
          node.type === 'string'
          || (node.type === 'function' && node.value === 'url')
        )
      ) {
        importTarget = valueParser.stringify(node.type === 'function' ? node.nodes : [node]).trim().replace(IMPORT_TARGET_RE, '')
        sawImportTarget = true
        continue
      }

      if (node.type === 'function' && ['source', 'prefix', 'layer', 'supports'].includes(node.value)) {
        functions.push({
          name: node.value,
          value: valueParser.stringify(node.nodes).trim(),
        })
        continue
      }

      if (node.type === 'word' && node.value === 'layer') {
        hasLayerKeyword = true
        continue
      }

      mediaStartIndex = index
      break
    }

    if (mediaStartIndex !== -1) {
      mediaQuery = valueParser.stringify(parsed.nodes.slice(mediaStartIndex)).trim() || null
    }

    directives.push({
      importTarget,
      functions,
      hasLayerKeyword,
      mediaQuery,
      node: atRule,
      source: atRule.source,
    })
  })

  return directives
}

function collectClassNamesFromSelector(selector: string): string[] {
  const classNames: string[] = []

  for (let index = 0; index < selector.length; index += 1) {
    if (selector[index] !== '.') {
      continue
    }

    if (index > 0 && selector[index - 1] === '\\') {
      continue
    }

    let cursor = index + 1
    let rawClassName = ''

    while (cursor < selector.length) {
      const char = selector[cursor]
      if (!char) {
        break
      }

      if ((SELECTOR_BREAK_RE.test(char) || char === ':') && selector[cursor - 1] !== '\\') {
        break
      }

      rawClassName += char
      cursor += 1
    }

    if (rawClassName) {
      classNames.push(unescapeCssIdentifier(rawClassName))
    }

    index = cursor - 1
  }

  return classNames
}

export function collectUtilitySelectors(input: Root | string): UtilitySelector[] {
  const root = toRoot(input)
  const selectors: UtilitySelector[] = []

  root.walkRules((rule) => {
    for (const className of collectClassNamesFromSelector(rule.selector)) {
      selectors.push({
        className,
        rule,
        selector: rule.selector,
        source: rule.source,
      })
    }
  })

  return selectors
}

export function analyzeTailwindCss(input: Root | string): TailwindAnalysis {
  const root = toRoot(input)

  return {
    version: detectTailwindVersion(root),
    applyCandidates: collectApplyCandidates(root),
    themeCalls: collectThemeCalls(root),
    importDirectives: collectImportDirectives(root),
    utilitySelectors: collectUtilitySelectors(root),
  }
}
