import { performance, PerformanceObserver } from 'node:perf_hooks'
import COMMENTS_MAP from './COMMENTS_MAP.json' assert { type: 'json' }

let instance

function _getInstance(callback) {
  if (instance) {
    return instance
  } else {
    instance = new PerformanceObserver((items) => {
      const entries = items.getEntries().reduce((entriesByExercise, entry) => {
        const index = entry.detail.exercise - 1
        entriesByExercise[index] = entriesByExercise[index]
          ? {
            title: `Exercise ${String(entry.detail.exercise).padStart(3, '0')}`,
            dirname: entry.detail.dirname,
            entries: [...entriesByExercise[index].entries, entry],
          }
          : {
            title: `Exercise ${String(entry.detail.exercise).padStart(3, '0')}`,
            dirname: entry.detail.dirname,
            entries: [entry]
          }
        return entriesByExercise
      }, [])
      callback(entries)

      performance.clearMarks()
      performance.clearMeasures()
      instance.disconnect()
    })
    instance.observe({ entryTypes: ['measure'], buffered: true })
  }
}

function getPerformance (callback, { solutions, input, expected, dirname }, i) {
  _getInstance(callback)

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
        dirname,
        input,
        result,
        expected,
      },
    })
  })
}

export { getPerformance }