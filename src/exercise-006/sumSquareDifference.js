// A naive approach would be to iterate n to 1 to accumulate the squares, use 001's summation,
// and return the difference:
function naiveSumSquareDifference (n) {
  let squaresSum = 0
  let currentNumber = n

  while (currentNumber > 0) {
    squaresSum += Math.pow(currentNumber, 2)
    currentNumber--
  }

  // Borrowing a summation formula from exercise 001
  const sumSquared = Math.pow((n + 1) * (n / 2), 2)

  return sumSquared - squaresSum
}

// From: https://github.com/CodeFay/ProjectEuler100/blob/master/Problems%201-25/solution_006.js
function mathSumSquareDifference (n) {
  // Re-use summation function from Euler001
  function summation (x) {
    return (x + 1) * (x / 2)
  }

  function squareSum (x) {
    return Math.pow(summation(x), 2)
  }

  // Proved by induction; remembered this formula from my MathCounts days!
  function sumSquare (x) {
    return x * (x + 1) * (2 * x + 1) / 6
  }

  return squareSum(n) - sumSquare(n)
}

export default [naiveSumSquareDifference, mathSumSquareDifference]
