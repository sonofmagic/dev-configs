const UTILITY_PREFIXES = [
  'absolute',
  'relative',
  'fixed',
  'sticky',
  'static',
  'block',
  'inline',
  'inline-block',
  'inline-flex',
  'inline-grid',
  'flex',
  'grid',
  'hidden',
  'contents',
  'table',
  'sr-only',
  'not-sr-only',
  'container',
  'items-',
  'justify-',
  'content-',
  'self-',
  'place-',
  'gap-',
  'space-x-',
  'space-y-',
  'p-',
  'px-',
  'py-',
  'pt-',
  'pr-',
  'pb-',
  'pl-',
  'm-',
  'mx-',
  'my-',
  'mt-',
  'mr-',
  'mb-',
  'ml-',
  'w-',
  'h-',
  'min-w-',
  'min-h-',
  'max-w-',
  'max-h-',
  'text-',
  'font-',
  'leading-',
  'tracking-',
  'bg-',
  'from-',
  'via-',
  'to-',
  'border-',
  'rounded',
  'shadow',
  'ring',
  'opacity-',
  'overflow-',
  'object-',
  'z-',
  'order-',
  'col-',
  'row-',
  'aspect-',
  'cursor-',
  'select-',
  'align-',
  'whitespace-',
  'break-',
  'truncate',
  'line-clamp-',
  'transition',
  'duration-',
  'ease-',
  'delay-',
  'animate-',
  'transform',
  'scale-',
  'rotate-',
  'translate-',
  'skew-',
  'origin-',
  'filter',
  'backdrop-',
  'pointer-events-',
  'appearance-',
  'accent-',
  'caret-',
  'fill-',
  'stroke-',
] as const

const VARIANT_PREFIX_RE = /^(?:[a-z0-9-]+:)+/
const ARBITRARY_VALUE_RE = /\[[^\]]+\]/
const FRACTIONAL_VALUE_RE = /^\d+\/\d+$/
const NEGATIVE_UTILITY_RE = /^-[a-z]/
const IMPORTANT_UTILITY_RE = /^![a-z]/
const IMPORTANT_PREFIX_RE = /^!/

const heuristicCandidateCache = new Map<string, boolean>()

function normalizeUtilityCandidate(className: string): string {
  let normalized = className
    .replace(VARIANT_PREFIX_RE, '')
    .replace(IMPORTANT_PREFIX_RE, '')

  if (normalized.startsWith('-')) {
    normalized = normalized.slice(1)
  }

  return normalized
}

export function getNormalizedUtilityCandidate(className: string): string {
  return normalizeUtilityCandidate(className)
}

export function isArbitraryValueUtilityClass(className: string): boolean {
  const normalized = normalizeUtilityCandidate(className)

  if (!ARBITRARY_VALUE_RE.test(normalized)) {
    return false
  }

  if (normalized.startsWith('[') && normalized.endsWith(']')) {
    return true
  }

  const arbitraryStartIndex = normalized.indexOf('[')
  if (arbitraryStartIndex === -1) {
    return false
  }

  const utilityPrefix = normalized.slice(0, arbitraryStartIndex)
  return UTILITY_PREFIXES.some(prefix => utilityPrefix === prefix || utilityPrefix.startsWith(prefix))
}

export function isHeuristicUtilityClass(className: string): boolean {
  const cached = heuristicCandidateCache.get(className)
  if (cached !== undefined) {
    return cached
  }

  const normalized = normalizeUtilityCandidate(className)
  const matched = (
    ARBITRARY_VALUE_RE.test(className)
    || FRACTIONAL_VALUE_RE.test(normalized)
    || NEGATIVE_UTILITY_RE.test(className)
    || IMPORTANT_UTILITY_RE.test(className)
    || UTILITY_PREFIXES.some(prefix => normalized === prefix || normalized.startsWith(prefix))
  )

  heuristicCandidateCache.set(className, matched)
  return matched
}

export function isLikelyUtilityClass(className: string): boolean {
  return isHeuristicUtilityClass(className)
}
