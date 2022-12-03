function getDurationStats(durations) {
  const ascDurations = durations.sort((a, b) => a - b)
  const fastest = Number(ascDurations[0]).toFixed(5)
  const slowest = Number(ascDurations.at(-1)).toFixed(5)
  const relativeSpeed = Number(slowest / fastest)

  if ((relativeSpeed * 10) < 11) {
    return 'The functions completed at about the same time!'
  } else {
    return `The fastest function completed the exercise in ${fastest}ms.\nMore efficient by x${relativeSpeed.toFixed(2)}`
  }
}

export { getDurationStats }