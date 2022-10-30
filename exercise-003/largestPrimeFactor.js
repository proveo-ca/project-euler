// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143 ?
function bruteForceLargestPrimeFactor (n) {
  const base = 1
  const factors = [base]

  function findFactor (dividend, divisor) {
    divisor += 1
    let remaining = dividend % divisor

    while (remaining !== 0) {
      divisor += 1

      remaining = dividend % divisor
    }

    return divisor
  }

  while (n > base) {
    const factor = findFactor(n, factors[0])

    n /= factor
    factors.push(factor)
  }

  return factors.pop()
}

// From: https://github.com/miloss/project-euler-javascript/blob/master/003.js
function simpleBruteForceLargestPrimeFactor (n) {
  const factors = []
  let d = 2
  while (n > 1) {
    while (n % d === 0) {
      factors.push(d)
      n = n / d
    }
    d++
    // Notice this breaks after the square root is found
    if (d * d > n && n > 1) {
      factors.push(n)
      break
    }
  }

  return factors.pop()
}

// From: https://github.com/CodeFay/ProjectEuler100/blob/master/Problems%201-25/solution_003.js
function mathLargestPrimeFactor (number) {
  function checkPrime (p) {
    /* "all primes greater than 6 are of the form 6k ± 1" {Wikipedia: Primality test}
     * We use i and (i + 2) because reference is shifted from 6 to 5
     * Example: If reference stayed at 6, we would test for ± 1 or [5,7];
     * Since reference is at 5, to test for [5,7], we need i or ( i + 2 )
     */

    /* To speed up algorithm, we want to immediately throw out anything divisible by 2 or 3 */
    if (p % 2 === 0 || p % 3 === 0) {
      return false
    }

    /* Then check remaining cases based on example above */
    for (let i = 5; i < Math.sqrt(p); i += 6) {
      if (p % i === 0 || p % (i + 2) === 0) {
        return false
      }
    }
    return true
  }

  // manually check first 4 primes, so we're left with O(sqrt(number))
  if (number === 2 || number === 3 || number === 5 || number === 7) {
    return number
  }

  // only have to check factors up to sqrt(number) since everything > sqrt(number) would be paired with a factor in
  // this subset
  for (let i = Math.floor(Math.sqrt(number)); i > 7; i--) {
    // check if i is a factor of number
    if (number % i === 0) {
      // if factor, then check if prime
      if (checkPrime(i)) {

        return i
      }
    }
  }
}

export default [bruteForceLargestPrimeFactor, simpleBruteForceLargestPrimeFactor, mathLargestPrimeFactor]
