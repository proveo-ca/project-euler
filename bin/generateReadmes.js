import { generateReadme, getExercises, getPerformance } from '../src/utils/index.js'

async function _generateReadmes (entries) {
  for (const entriesByExercise of entries) {
    await generateReadme(entriesByExercise)
  }
}

async function run () {
  const exercises = await getExercises()

  exercises.forEach((exercise, i) => getPerformance(_generateReadmes, exercise, i))
}

run()
