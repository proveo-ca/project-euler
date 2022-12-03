import { getDurationStats, getExercises, getPerformance } from '../src/utils/index.js'

function _logPerformance (entries) {
  console.log('\n Performance entries: \n')

  entries.map((entriesByExercise) => {
    const durations = []
    entriesByExercise.entries.forEach(({ detail, duration }) => {
      durations.push(duration)
      console.log(detail.comment)
      console.log(`${Number(duration).toFixed(5)} ms`)
      console.log(`Result: ${detail.result} | Pass? ${detail.result === detail.expected ? '✅' : '⛔'}`)
    })

    console.log(`\n${getDurationStats(durations)}\n`)
  })
}

async function run () {
  const exercises = await getExercises()

  exercises.forEach((exercise, i) => getPerformance(_logPerformance, exercise, i))
}

run()
