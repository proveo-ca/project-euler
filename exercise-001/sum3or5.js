// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9.
// The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.

// A naive approach can be to use mod 3 or 5, to exclude the intersection of 15,
// To accumulate whichever numbers return mod 0
function naiveSum3or5 (n) {
  let sum = 0
  while (n > 0) {
    n--

    if (n % 3 === 0 || n % 5 === 0) {
      sum += n
    }
  }

  return sum
}

// From: https://github.com/CodeFay/ProjectEuler100/blob/master/Problems%201-25/solution_001.js
function mathSum3or5 (n) {
  // TODO find out formula source, probably number theory.
  function summation (x) {
    return (x + 1) * (x / 2)
  }

  // Below 1000 is 999
  const y = n - 1
  // let y be 999 and k be the multiples 3 and 5, taking 15 into account as an intersection.
  // 1. y / k will output the amount of multiples for that number e.g. 999 / 3 = 333 multiples of 3
  // 2. We use the above summation identity to see the total sum of 1...333
  // 3. We multiply the total sum by the multiple, to get the real value of the multiples back
  // 4. We remove the intersection of 15
  return summation(Math.floor(y / 3)) * 3 +
    summation(Math.floor(y / 5)) * 5 - summation(Math.floor(y / 15)) * 15
}

export default [naiveSum3or5, mathSum3or5]
