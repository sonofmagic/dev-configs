export function normalizeDeps(deps) {
  return Object.fromEntries(
    Object.entries(deps || {}).sort(([a], [b]) => a.localeCompare(b)),
  )
}

export function collectChangedPackages({
  changedPackageJsonFiles,
  readCurrentPackage,
  readBasePackage,
  resolveDir,
}) {
  const changedByPackageName = new Map()

  for (const packagePath of changedPackageJsonFiles) {
    const currentPackage = readCurrentPackage(packagePath)
    if (!currentPackage) {
      continue
    }

    const packageName = currentPackage.name
    if (!packageName) {
      continue
    }

    const basePackage = readBasePackage(packagePath) || {}
    const currentDeps = normalizeDeps(currentPackage.dependencies)
    const baseDeps = normalizeDeps(basePackage.dependencies)
    const depsChanged = JSON.stringify(currentDeps) !== JSON.stringify(baseDeps)

    if (depsChanged) {
      changedByPackageName.set(packageName, {
        name: packageName,
        dir: resolveDir(packagePath),
        file: packagePath,
      })
    }
  }

  return [...changedByPackageName.values()].sort((a, b) =>
    a.name.localeCompare(b.name),
  )
}

export function createChangesetMarkdown(packageNames, summary) {
  return [
    '---',
    ...packageNames.map(packageName => `'${packageName}': patch`),
    '---',
    '',
    summary,
    '',
  ].join('\n')
}
