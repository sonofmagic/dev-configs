import { spawnSync } from 'node:child_process'
import process from 'node:process'

function runPublish(packageName) {
  const result = spawnSync(
    'pnpm',
    ['--filter', packageName, 'publish', '--access', 'public', '--no-git-checks'],
    { stdio: 'inherit' },
  )

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(`failed to publish ${packageName}, exit code: ${result.status}`)
  }
}

function main() {
  const changedMatrix = process.env.CHANGED_MATRIX
  if (!changedMatrix) {
    throw new Error('CHANGED_MATRIX is required')
  }

  const changedPackages = JSON.parse(changedMatrix)
  const packageNames = [...new Set(changedPackages.map(pkg => pkg.name).filter(Boolean))]

  if (packageNames.length === 0) {
    console.log('No changed packages, skip publish')
    return
  }

  for (const packageName of packageNames) {
    console.log(`publishing ${packageName}`)
    runPublish(packageName)
  }
}

main()
