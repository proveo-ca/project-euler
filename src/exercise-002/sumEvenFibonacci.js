// A naive approach may be to keep track of the 2 terms, constantly replacing the first with the previous sum.
// Accumulate the sum whenever an even number is found
function naiveSumEvenFibonacci (limit) {
  let sum = 2
  const numbers = [1, 2]
  let result = numbers[0] + numbers[1]

  while (result <= limit) {
    if (result % 2 === 0) {
      sum += result
    }
    numbers[0] = numbers[1]
    numbers[1] = result
    result = numbers[0] + numbers[1]
  }

  return sum
}

// From: https://github.com/miloss/project-euler-javascript/blob/master/002.js
function trampolineSumEvenFibonacci (limit) {
  const fibonacci = (function () {
    const memo = [1, 2]

    return function (n) {
      let result = memo[n]
      if (typeof memo[n] !== 'number') {
        result = fibonacci(n - 1) + fibonacci(n - 2)
        memo[n] = result
      }
      return result
    }
  })()

  let sum = 0
  let i = 0
  let number = fibonacci(i)

  while (number <= limit) {
    if (number % 2 === 0) {
      sum += number
    }
    i++
    number = fibonacci(i)
  }

  return sum
}

export default [naiveSumEvenFibonacci, trampolineSumEvenFibonacci]
