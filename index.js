import path from 'node:path'
import { getInstance, getPerformance, logPerformance } from './src/utils/perfObserver.js'

async function run () {
  let answers; let i = 1
  const exercises = []
  do {
    const dirname = path.join(
      path.resolve(),
      `./exercise-${String(i).padStart(3, '0')}/index.js`
    )
    try {
      answers = await import(dirname)
      if (Object.prototype.hasOwnProperty.call(answers.default, 'solutions')) {
        exercises.push(answers.default)
      }
    } catch (e) {
      break
    } finally {
      i += 1
    }
  } while (answers)

  const { instance, metrics } = await getInstance()
  exercises.forEach(getPerformance)
  console.log('INDEX INSTANCE: ', instance)
  console.log('INDEX METRICS: ', metrics)
  // logPerformance(metrics)
}

run()
