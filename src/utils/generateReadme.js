import * as fs from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import { getDurationStats } from './getDurationStats.js'

function _getReadmeTemplate(title, description, entries) {
  const durations = []
  const body = entries.reduce((text, { detail, duration }) => {
      durations.push(duration)

      return text + `
        ${detail.comment}
        ${Number(duration).toFixed(5)} ms
        Result: ${detail.result} | Pass? ${detail.result === detail.expected ? '✅' : '⛔'}
      `
  }, '')
  const durationStats = getDurationStats(durations)

  return `
# ${title}
${description}
${body}
_${durationStats}_
  `
}

async function generateReadme(entriesByExercise) {
  const { dirname, title, entries } = entriesByExercise

  const descriptionFile = await fs.open(dirname + 'description.txt', 'r')
  const description = await descriptionFile.readFile({ encoding: 'utf8' })

  const text = _getReadmeTemplate(title, description, entries)
  const writeBuffer = new Uint8Array(Buffer.from(text))

  await fs.writeFile(dirname + 'README.md', writeBuffer)
}

export { generateReadme }