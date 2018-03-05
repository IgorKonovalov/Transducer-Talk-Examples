//
// Map and Filter through REDUCE
//

// regular map 

const doubleTheNumber = number => number * 2

// transformation can be combined
const doubleTwice = number => doubleTheNumber(doubleTheNumber(number))

const resMap = [1, 2, 3, 4, 5].map(doubleTheNumber)
const resMapTwice = [1, 2, 3, 4, 5].map(doubleTwice)

resMap
resMapTwice

// regular filter

const isEven = number => number % 2 === 0
const resFilter = [1, 2, 3, 4, 5].filter(isEven)

resFilter

// Predicate and Transformation Cannot be combined

const doubleEven = number => doubleTheNumber(isEven(number))

const resFilterDouble = [1, 2, 3, 4, 5].filter(doubleEven)
resFilterDouble

// Map through Reduce

const map = (xf, array) => {
  return array.reduce((accumulation, value) => {
    accumulation.push(xf(value))
    return accumulation
  }, [])
}

const resReducedMap = map(doubleTheNumber, [1, 2, 3, 4, 5])
resReducedMap

// Filter through Reduce

const filter = (predicate, array) => {
  return array.reduce((accumulation, value) => {
    if (predicate(value)) accumulation.push(value)
    return accumulation
  }, [])
}

const resReducedFilter = filter(isEven, [1, 2, 3, 4, 5])
resReducedFilter
