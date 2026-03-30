import { createRequire } from 'node:module'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const PACKAGE_DIR = path.dirname(fileURLToPath(import.meta.url))

export function isObject(o: unknown): o is object {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function isPackageAvailable(
  name: string,
  searchPaths: string[] = [process.cwd(), PACKAGE_DIR],
): boolean {
  try {
    require.resolve(name, { paths: searchPaths })
    return true
  }
  catch {
    return false
  }
}

export function hasAllPackages(
  names: string[],
  searchPaths?: string[],
): boolean {
  return names.every(name => isPackageAvailable(name, searchPaths))
}
