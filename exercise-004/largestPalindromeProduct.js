//A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is
// 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

// A naive approach would be starting off with 999 x 999, and decreasing first the multiplier down to 100,
// Whenever the multiplicand is decreased, the multiplier is reset to 999.
// The max palindrome is kept track
// Making it an O(n^2) solution
function naiveLargestPalindromeProduct (n) {
  function isPalindrome (n) {
    const s = String(n)
    let i = 0
    let j = s.length - 1

    while (j > i) {
      if (s[i] !== s[j]) {
        return false
      }
      i++
      j--
    }
    return true
  }

  const base = Number('9'.repeat(n))
  let multiplicand = base
  let multiplier = base
  let product = multiplicand * multiplier
  let max = 0

  const limit = Number('1'.padEnd(n - 1, '0'))
  while (multiplicand >= limit) {
    while (multiplier >= limit) {
      if (isPalindrome(product) && product > max) {
        max = product
      }
      product = multiplicand * multiplier
      multiplier -= 1
    }
    multiplicand -= 1
    multiplier = base
  }
  console.log('004: Naive O(n^2) largest palindrome product - ', max)

  return max
}

// From: https://github.com/CodeFay/ProjectEuler100/blob/master/Problems%201-25/solution_004.js
function mathematicalLargestPalindromeProduct (n) {
  function checkPalindrome (x) {
    // There a faster way to do this with Number theory (considering base 10), but I will submit this way for now.
    return x == parseInt(x.toString().split('').reverse().join(''))
  }

  let init = 0
  let k

  /* Determine the largest Palindrome product quickly by starting loops from the largest number
   * Now a nested loop will take us through the two numbers
   * Number theory dictates that a palindrome product is divisible by 11, so start inner loop with largest multiple of 11 < maxNum
   */

  let maxNum = Math.pow(10, n) - 1
  let minNum = Math.pow(10, n - 1) - 1
  let maxMult = Math.floor(maxNum / 11) * 11

  for (let i = maxMult; i > minNum; i -= 11) {
    for (let j = maxNum; j > minNum; j--) {
      k = i * j
      if (k > init && checkPalindrome(k)) {
        init = k
        break
      }
    }
  }

  console.log('004: Mathematical O(n / 11) * O(n)) largest palindrome product - ', init)

  return init
}

export default [naiveLargestPalindromeProduct, mathematicalLargestPalindromeProduct]