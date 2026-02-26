import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { collectChangedPackages } from './lib/deps-release-core.mjs'

function escapeOutput(value) {
  return String(value)
    .replace(/%/g, '%25')
    .replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A')
}

function writeOutput(key, value) {
  const outputFile = process.env.GITHUB_OUTPUT
  if (!outputFile) {
    return
  }

  fs.appendFileSync(outputFile, `${key}=${escapeOutput(value)}\n`)
}

function listChangedPackageJsonFiles(baseSha) {
  const output = execSync(
    `git diff --name-only ${baseSha}..HEAD -- 'packages/*/package.json'`,
    { encoding: 'utf8' },
  )

  return output
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
}

function readCurrentPackage(packagePath) {
  if (!fs.existsSync(packagePath)) {
    return null
  }

  return JSON.parse(fs.readFileSync(packagePath, 'utf8'))
}

function readBasePackage(baseSha, packagePath) {
  try {
    const raw = execSync(`git show ${baseSha}:${packagePath}`, {
      encoding: 'utf8',
    })
    return JSON.parse(raw)
  }
  catch {
    return {}
  }
}

function main() {
  const baseSha = process.env.BASE_SHA
  if (!baseSha) {
    throw new Error('BASE_SHA is required')
  }

  const changedPackageJsonFiles = listChangedPackageJsonFiles(baseSha)
  const changedPackages = collectChangedPackages({
    changedPackageJsonFiles,
    readCurrentPackage,
    readBasePackage: packagePath => readBasePackage(baseSha, packagePath),
    resolveDir: packagePath => path.dirname(packagePath),
  })

  const hasChanges = changedPackages.length > 0
  const changedMatrix = JSON.stringify(changedPackages)
  const changedNames = changedPackages.map(pkg => pkg.name).join(',')

  writeOutput('has_changes', String(hasChanges))
  writeOutput('changed_matrix', changedMatrix)
  writeOutput('changed_names', changedNames)

  console.log(`dependencies changed packages: ${changedPackages.length}`)
  if (hasChanges) {
    console.log(changedPackages.map(pkg => `- ${pkg.name}`).join('\n'))
  }
}

main()
