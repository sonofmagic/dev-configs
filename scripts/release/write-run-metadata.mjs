import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

function main() {
  const hasChanges = process.env.HAS_CHANGES === 'true'
  const changedMatrixRaw = process.env.CHANGED_MATRIX ?? '[]'
  const outputFile = process.env.RELEASE_METADATA_FILE || '.release-metadata/metadata.json'

  const changedMatrix = JSON.parse(changedMatrixRaw)
  if (!Array.isArray(changedMatrix)) {
    throw new TypeError('CHANGED_MATRIX must be a JSON array')
  }

  fs.mkdirSync(path.dirname(outputFile), { recursive: true })
  fs.writeFileSync(
    outputFile,
    JSON.stringify(
      {
        hasChanges,
        changedMatrix,
      },
      null,
      2,
    ),
  )

  console.log(`wrote ${outputFile}`)
}

main()
