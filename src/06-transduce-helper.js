
const compose = (...functions) =>
functions.reduce((accumulation, fn) =>
  (...args) => accumulation(fn(...args), x => x))

const filter = predicate => reducer => (accumulation, value) => {
  if (predicate(value)) return reducer(accumulation, value)
  return accumulation
}

const map = xf => reducer => (accumulation, value) => {
  return reducer(accumulation, xf(value))
}

const isEvenOnlyFilter = filter(x => x % 2 === 0)

const isNot2Filter = filter(x => x !== 2)

const doubleTheMap = map(x => x * 2)

const divideByThreeMap = map(x => x / 3)

const pushReducer = (accumulation, value) => {
  accumulation.push(value)
  return accumulation
}

//
//////////////////////////////////////////////////////
//

const transduce = (xf, reducer, seed, collection) => {
  const transformerReducer = xf(reducer)
  
  let accumulation = seed
  
  for (const value of collection) {
    accumulation = transformerReducer(accumulation, value)
  }

  return accumulation
}

const cleanNumbersXf = compose(isNot2Filter, isEvenOnlyFilter, doubleTheMap)

const r1 = [1, 2, 3, 4, 5, 6].reduce(cleanNumbersXf(pushReducer), [])

r1

const r2 = transduce(
  cleanNumbersXf,
  pushReducer,
  [],
  [1, 2, 3, 4, 5, 6]
)

r2

//
//////////////////////////////////////////////////////
//

const toUpper = char => char.toUpperCase()

const toUpperCaseMap = map(toUpper)

const vowelOnly = char => /а|у|е|о|ы|э|я|и/i.test(char)

const vowelOnlyFilter = filter(vowelOnly)

const transformStringXf = compose(toUpperCaseMap, vowelOnlyFilter)

const concatReducer = (accumulation, value) => accumulation.concat(value)

const r3 = transduce(
  transformStringXf,
  concatReducer,
  '',
  'привет, мир!'
)

r3
