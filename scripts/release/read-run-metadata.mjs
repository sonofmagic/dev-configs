import fs from 'node:fs'
import process from 'node:process'

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

function main() {
  const inputFile = process.env.RELEASE_METADATA_FILE || '.release-metadata/metadata.json'

  const metadata = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
  const hasChanges = metadata.hasChanges === true
  const changedMatrix = Array.isArray(metadata.changedMatrix)
    ? metadata.changedMatrix
    : []

  writeOutput('has_changes', String(hasChanges))
  writeOutput('changed_matrix', JSON.stringify(changedMatrix))

  console.log(`has changes: ${hasChanges}`)
  console.log(`changed packages: ${changedMatrix.length}`)
}

main()
