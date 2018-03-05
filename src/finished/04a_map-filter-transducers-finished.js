const doubleTheNumber = number => number * 2
const isEven = number => number % 2 === 0

//
// Map and Filter TRANSDUCERS
//

// BEHOLD!

// reduce dependency decomposition - return reducer instead of result

// const map = (xf, array) => {
//   return array.reduce((accumulation, value) => {
//     accumulation.push(xf(value))
//     return accumulation
//   }, [])
// }

// const filter = (predicate, array) => {
//   return array.reduce((accumulation, value) => {
//     if (predicate(value)) accumulation.push(value)
//     return accumulation
//   }, [])
// }

const map = xf => (accumulation, value) => {
  accumulation.push(xf(value))
  return accumulation
}

const filter = predicate => (accumulation, value) => {
  if (predicate(value)) accumulation.push(value)
  return accumulation
}

// can compose but have to create intermediate collections due to double reduce call
const resReduceChain = [1, 2, 3, 4, 5]
  .reduce(filter(isEven), [])
  .reduce(map(doubleTheNumber), [])

resReduceChain

// hardcoded solution

const filterThanDouble = predicate => (accumulation, value) => {
  if (predicate(value)) return map(doubleTheNumber)(accumulation, value)
  return accumulation
}

const resFilterThanDouble = [1, 2, 3, 4, 5].reduce(filterThanDouble(isEven), [])

resFilterThanDouble

// and finally

const filterTransducer = predicate => reducer => (accumulation, value) => {
  if (predicate(value)) return reducer(accumulation, value)
  return accumulation
}

const resReduceChainTransducer = [1, 2, 3, 4, 5].reduce(
  filterTransducer(isEven)(map(doubleTheNumber)),
  []
)

resReduceChainTransducer

const mapTransducer = xf => reducer => (accumulation, value) => {
  return reducer(accumulation, xf(value))
}

const isEvenOnlyFilter = filterTransducer(isEven)
const isNot2Filter = filterTransducer(x => x !== 2)
const doubleTheMap = mapTransducer(doubleTheNumber)

const pushReducer = (accumulation, value) => {
  accumulation.push(value)
  return accumulation
}

const resTransducerComposition = [1, 2, 3, 4, 5].reduce(
  isNot2Filter(isEvenOnlyFilter(doubleTheMap(pushReducer))),
  []
)

resTransducerComposition
