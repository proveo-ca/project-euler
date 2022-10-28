import { performance, PerformanceObserver } from 'node:perf_hooks'
import path from 'node:path'

async function run() {
  let answers, i = 1
  const exercises = []
  do {
    const dirname = path.join(
      path.resolve(),
      `./exercise-${String(i).padStart(3, '0')}/index.js`,
    )
    try {
      answers = await import(dirname)
      if (answers.default.hasOwnProperty('solutions')) {
        exercises.push(answers.default)
      }
    } catch (e) {
      break
    } finally {
      i += 1
    }
  } while (answers)

  const perfObserver = new PerformanceObserver((items) => {
    console.log('\n Performance entries: \n')

    items.getEntries().forEach((entry) => {
      console.log(entry)
    })
  })

// perfObserver.observe({ entryTypes: ['measure'], buffered: true })
// performance.mark('exercise-001 exercise - begin')
// first.doThing()
// performance.mark('exercise-001 exercise - end')
// performance.measure('exercise-001 exercise', 'exercise-001 exercise - begin', 'exercise-001 exercise - end')

  perfObserver.observe({ entryTypes: ['function'] })
  exercises.forEach(({ solutions, input }) => {
    solutions.forEach((fn) => {
      const perfWrapper = performance.timerify(fn)
      perfWrapper(input)
    })
  })
}

run()
