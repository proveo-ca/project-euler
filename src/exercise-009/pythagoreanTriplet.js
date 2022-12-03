// Here goes my attempt for an O(1) solution, without any memory of Trigonometry.
// I do recall Parametrisation, with polynomials and equation systems, here goes:
// Our input is:
//       a + b + c = 1000
//       let tripletSum = 1000
//       Let's use known values for a + b + c for naiveness sake: (3) + (4) + (5) = 12
//       a + b - tripletSum = -c
// (I)   c = tripletSum - a - b
//       Following the Pythagoras Theorem:
//       a ^ 2 + b ^ 2 = c ^ 2
// (II)  sqrt(a ^ 2 + b ^ 2) = c
//       As we found the value of 'c' in I and II:
// (III) tripletSum - a - b = sqrt(a ^ 2 + b ^ 2)
//
//       Could we find the value of 'a' here?
//       (tripletSum - a - b) ^ 2 = a ^ 2 + b ^ 2
//       (tripletSum - a - b) * (tripletSum - a - b) = a ^ 2 + b ^ 2
//       let tripleSum = 12, for our known example:
//       (a ^ 2) - 24a - 24b + 2ab + (b ^ 2) + 144 = (a ^ 2) + (b ^ 2)
//       2ab - 24a - 24b + 144 = 0
//       2ab - 24a = 24b - 144
//       ab - 12a = 12b - 72
//       b - 12 = (12b - 72) / a
//       1 / a = b - 12 / (12b - 72)
// (IV)  a = 1 / (b - 12 / (12b - 72))
//       Using the known values, we can confirm:
//       (3) = 1 / (((4) - 12) / ((12 * (4)) - 72))

//       Now, replacing 'a' on equation (III):
//       tripletSum - (1 / (b - 12 / (12b - 72))) - b = sqrt((1 / (b - 12 / (12b - 72))) ^ 2 + b ^ 2)
//       tripletSum - (1 / (b - 12 / (12b - 72))) - b - (1 / (b - 12 / (12b - 72)) + b ^ 2) = 0
//       ...Which hurts my high school math brain,
//       so I'll let
// (IV)  a = 1 / (b - tripletSum / (tripletSum * b - (tripletSum ^ 2) / 2))
//       and proceed to O(n) values for 'b' [1...1000] until the equation is satisfied using III
function noTrigonometryPythagoreanTriplet (tripletSum) {
  let a = 1
  let b = 1

  // From formula (II)
  function getC (a, b) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
  }

  while (b < tripletSum) {
    // From formula (IV)
    a = 1 / ((b - tripletSum) / ((tripletSum * b) - (Math.pow(tripletSum, 2) / 2)))
    if (!Number.isInteger(a) || a < 0 || a > b) {
      b++
      continue
    }
    // From formula (III)
    const equation = (tripletSum - a - b) - (Math.sqrt((Math.pow(a, 2) + Math.pow(b, 2))))
    if (equation === 0) {
      break
    }
    b++
  }
  const c = getC(a, b)

  return (a * b * c)
}

// From: https://github.com/miloss/project-euler-javascript/blob/master/009.js
function bruteForcePythagoreanTriplet (sum) {
  const triplets = []
  const max = Math.ceil(sum / 2)
  let a, b, c
  for (a = 3; a < max; a++) {
    for (b = a + 1; b < max; b++) {
      if (Math.pow(sum - b - a, 2) === (Math.pow(a, 2) + Math.pow(b, 2))) {
        triplets.push(...[a, b, sum - b - a])
      }
    }
  }
  return triplets.reduce((product, n) => product * Number(n), 1)
}

export default [noTrigonometryPythagoreanTriplet, bruteForcePythagoreanTriplet]
