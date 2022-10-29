// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

// A naive approach would be finding the lowest common multiple of n, then proceed all the way down to 2.
// As per the lowest common multiple, only a single base with the biggest exponential remains, e.g.:
// lcm(10) = 2 * 5
// lcm(9) = (3 ^ 2)
// lcm(8) = (2 ^ 3)
// lcm(7) = 7
// lcm(6) = 2 * 3
// lcm(5) = 5
// lcm(10 * 9 * 8 * 7 * 6 * 5) = 7 * 5 * (3 ^ 2) * (2 ^ 3)
function naiveSmallestMultiple (n) {
  // Borrowing a function from exercise 003
  function getFactorsMap (n) {
    const factors = {}
    let d = 2
    while (n > 1) {
      while (n % d === 0) {
        factors[d] ? factors[d] += 1 : factors[d] = 1
        n = n / d
      }
      d++
      // Notice this breaks after the square root is found
      if (d * d > n && n > 1) {
        factors[n] ? factors[n] += 1 : factors[n] = 1
        break
      }
    }

    return factors
  }

  function getLCM (numbers) {
    const lcmMap = numbers.map((n) => getFactorsMap(n)).reduce((lcm, factorMap) => {
      return {
        ...lcm,
        ...Object.keys(factorMap).reduce((replacerMap, key) => ({
          ...replacerMap,
          ...!lcm[key] || factorMap[key] > lcm[key]
            ? { [key]: factorMap[key] }
            : {},
        }), {}),
      }
    }, {})

    return Object.keys(lcmMap).reduce((product, base) => {
      product *= Math.pow(Number(base), Number(lcmMap[base]))
      return product
    }, 1)
  }

  const min = 2
  const numbers = new Array(n - (min - 1)).fill(min).map((n, i) => n + i)
  const smallestMultiple = getLCM(numbers)

  console.log(`005: Naive smallest multiple from the product of all numbers in between ${n} to 1 - `, smallestMultiple)
  return smallestMultiple
}

// From: https://github.com/CodeFay/ProjectEuler100/blob/master/Problems%201-25/solution_005.js
function mathematicalSmallestMultiple (n) {
  // Apply the Euclidean algorithm to find the Greatest Common Denominator
  function gcd (a, b) {
    if (a % b !== 0) {
      return gcd(b, a % b)
    } else {
      return b
    }
  }

// Least Common Multiple formulas is LCM(a,b) = ab/GCD(a,b)
  function lcm (a, b) {
    return (a * b / gcd(a, b))
  }

  let val = 2
  for (let i = n; i > 2; i--) {
    val = lcm(val, i)
  }

  console.log(`005: Mathematical smallest multiple from the product of all numbers in between ${n} to 1 - `, val)
  return val
}

export default [naiveSmallestMultiple, mathematicalSmallestMultiple]