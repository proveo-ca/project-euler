// Google's spyware dropped this video in my YouTube: https://www.youtube.com/watch?v=j5s0h42GfvM
// A slightly modified version of Willan's formula would be:
function nthPrime (n) {
  // As per Wilson's Theorem:
  // function isPrime(n) {
  //   function factorial(n) {
  //     let trampoline = (n) =>
  //       () => {
  //         if (n && n === 1) {
  //           return n
  //         }
  //         return n * factorial(n - 1)
  //       }
  //
  //     while (typeof trampoline === 'function') {
  //       trampoline = trampoline(n)
  //     }
  //
  //     return trampoline
  //   }
  //   return (factorial(n - 1) + 1) % n === 0
  // }
  // Since we need the 10 001st prime, this resolves in humongous factorials. We'll borrow CodeFay's from
  // https://github.com/CodeFay/ProjectEuler100/blob/master/Problems%201-25/solution_003:
  function isPrime (n) {
    /* To speed up algorithm, we want to immediately throw out anything divisible by 2 or 3 */
    if (n % 2 === 0 || n % 3 === 0) {
      return false
    }
    /* Then check remaining cases based on example above */
    for (let i = 5; i <= Math.sqrt(n); i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) { return false }
    }
    return true
  }

  // Using CodeFay's notion of Primality testing at 6k ± 1
  // mentioned here: https://github.com/CodeFay/ProjectEuler100/blob/master/Problems%201-25/solution_003.js#L9
  // Iterations can be improved:
  const firstPrimes = [2, 3]
  if (n <= 2) {
    return firstPrimes[n]
  } else {
    // Prime count
    let i = 2
    // Starting at 6
    let currentNumber = 6
    while (i < n) {
      if (isPrime(currentNumber - 1)) {
        i += 1
        if (i === n) {
          return currentNumber - 1
        }
      }
      if (isPrime(currentNumber + 1)) {
        i += 1
        if (i === n) {
          return currentNumber + 1
        }
      }
      currentNumber += 6
    }
  }
}

// From: https://github.com/miloss/project-euler-javascript/blob/master/007.js
function simplerNthPrime (n) {
  function getIsPrime (n) {
    if (n < 2) return false
    const q = Math.floor(Math.sqrt(n))
    for (let i = 2; i <= q; i++) {
      if (n % i === 0) {
        return false
      }
    }
    return true
  }

  let num = 1
  let i = 0
  while (i < n) {
    num++
    while (!getIsPrime(num)) {
      num++
    }
    i++
  }

  return num
}

export default [nthPrime, simplerNthPrime]
