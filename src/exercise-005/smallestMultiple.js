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
            : {}
        }), {})
      }
    }, {})

    return Object.keys(lcmMap).reduce((product, base) => {
      product *= Math.pow(Number(base), Number(lcmMap[base]))
      return product
    }, 1)
  }

  const min = 2
  const numbers = new Array(n - (min - 1)).fill(min).map((n, i) => n + i)

  return getLCM(numbers)
}

// From: https://github.com/CodeFay/ProjectEuler100/blob/master/Problems%201-25/solution_005.js
// A more efficient approach, is calculating the lowest common multiple between the cumulative lcm, and the next number:
// initial value = 2 (lowest factor)
// lcm(2, 10) = 10
// lcm(10, 9) = 90
// lcm(90, 8) = 360
// lcm(360, 7) = 2520
// lcm(2520, 6) = 2520
// lcm(2520, 5) = 2520
function mathSmallestMultiple (n) {
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

  return val
}

export default [naiveSmallestMultiple, mathSmallestMultiple]
