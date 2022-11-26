import { performance, PerformanceObserver } from 'node:perf_hooks'
import COMMENTS_MAP from './COMMENTS_MAP.json' assert { type: 'json' }

let instance, metrics

async function getInstance () {
  return new Promise((resolve) => {
    if (!instance) {
      instance = new PerformanceObserver((items) => {
        this.metrics = items.getEntries().reduce((entryByExercise, entry) => {
          console.log(entryByExercise)
          const index = entry.detail.exercise - 1
          entryByExercise[index] = entryByExercise[index]
            ? [...entryByExercise[index], entry]
            : [entry]
          return entryByExercise
        }, [])
        console.log('METRICS: ', this.metrics)
      })

      instance.observe({ entryTypes: ['measure'], buffered: true })
      return resolve({ instance, metrics })
    } else {
      return resolve({ instance, metrics })
    }
  })
}

function logPerformance (entries) {
  console.log('\n Performance entries: \n')

  entries.map((entriesByExercise) => {
    const durations = []
    entriesByExercise.forEach(({ detail, duration }) => {
      durations.push(duration)
      console.log(detail.comment)
      console.log(`${Number(duration).toFixed(5)} ms`)
      console.log(`Result: ${detail.result} | Pass? ${detail.result === detail.expected ? '✅' : '⛔'}`)
    })

    const ascDurations = durations.sort((a, b) => a - b)
    const fastest = Number(ascDurations[0]).toFixed(5)
    const slowest = Number(ascDurations.at(-1)).toFixed(5)
    const relativeSpeed = Number(slowest / fastest)
    if ((relativeSpeed * 10) < 11) {
      console.log('The functions completed at about the same time!')
    } else {
      console.log(`\nThe fastest function completed the exercise in ${fastest}ms.\nMore efficient by x${relativeSpeed.toFixed(2)}\n`)
    }
  })
}

function getPerformance ({ solutions, input, expected }, i) {
  solutions.forEach((fn) => {
    const startTag = `${fn.name} - start`
    const endTag = `${fn.name} - end`
    performance.mark(startTag)
    const result = fn(input)
    performance.mark(endTag)

    performance.measure(`performance for ${fn.name}`, {
      start: startTag,
      end: endTag,
      detail: {
        comment: COMMENTS_MAP[fn.name],
        exercise: i + 1,
        input,
        result,
        expected,
      },
    })
  })
}

export { getInstance, getPerformance, logPerformance }