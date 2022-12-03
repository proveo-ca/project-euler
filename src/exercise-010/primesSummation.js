// For this, we could use exercise 003 to accumulate primes found:
// From exercise 003
function getIsPrime (p) {
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
  for (let i = 5; i <= Math.sqrt(p); i += 6) {
    if (p % i === 0 || p % (i + 2) === 0) {
      return false
    }
  }
  return true
}

function primesSummation (limit) {
  // From exercise 007
  function getPrimes (n) {
    const primes = [2, 3]
    // Starting at 6
    let currentNumber = 6
    while (currentNumber < n) {
      if (getIsPrime(currentNumber - 1)) {
        primes.push(currentNumber - 1)
      }
      if (getIsPrime(currentNumber + 1)) {
        primes.push(currentNumber + 1)
      }
      currentNumber += 6
    }

    return primes
  }

  return getPrimes(limit).reduce((sum, n) => sum + n, 0)
}

function simplerBruteForcePrimeSummation (n) {
  const primesArray = [2, 3]
  for (let i = 5; i < n; i += 2) {
    if (getIsPrime(i)) {
      primesArray.push(i)
    }
  }

  return primesArray.reduce((a, b) => a + b)
}
export default [primesSummation, simplerBruteForcePrimeSummation]
