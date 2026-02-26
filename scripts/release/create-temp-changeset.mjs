import fs from 'node:fs'
import process from 'node:process'
import { createChangesetMarkdown } from './lib/deps-release-core.mjs'

function main() {
  const changedMatrix = process.env.CHANGED_MATRIX
  if (!changedMatrix) {
    throw new Error('CHANGED_MATRIX is required')
  }

  const changedPackages = JSON.parse(changedMatrix)
  const packageNames = changedPackages.map(pkg => pkg.name).filter(Boolean)

  if (packageNames.length === 0) {
    console.log('No changed packages, skip creating changeset file')
    return
  }

  const runId = process.env.GITHUB_RUN_ID || `${Date.now()}`
  const releaseFile = `.changeset/packages-deps-${runId}.md`
  const content = createChangesetMarkdown(
    packageNames,
    'chore(deps): update package dependencies',
  )

  fs.mkdirSync('.changeset', { recursive: true })
  fs.writeFileSync(releaseFile, content)
  console.log(`created ${releaseFile}`)
}

main()
