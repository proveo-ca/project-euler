import path from 'node:path'

async function getExercises () {
  let answers
  let i = 1
  const exercises = []

  do {
    const dirname = `/src/exercise-${String(i).padStart(3, '0')}/`
    const fullPath = path.join(
      path.resolve(),
      dirname + 'index.js'
    )
    try {
      answers = await import(fullPath)
      if (Object.prototype.hasOwnProperty.call(answers.default, 'solutions')) {
        exercises.push({
          ...answers.default,
          dirname: path.join(path.resolve(), dirname)
        })
      }
    } catch (e) {
      console.error(e)
      break
    } finally {
      i += 1
    }
  } while (answers)

  return exercises
}

export { getExercises }