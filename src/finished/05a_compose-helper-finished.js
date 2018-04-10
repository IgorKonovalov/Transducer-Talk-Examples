const doubleTheNumber = number => number * 2
const isEven = number => number % 2 === 0

const filter = predicate => reducer => (accumulation, value) => {
  if (predicate(value)) return reducer(accumulation, value)
  return accumulation
}

const map = xf => reducer => (accumulation, value) => {
  return reducer(accumulation, xf(value))
}

const isEvenOnlyFilter = filter(isEven)
const isNot2Filter = filter(x => x !== 2)
const doubleTheMap = map(doubleTheNumber)

const pushReducer = (accumulation, value) => {
  accumulation.push(value)
  return accumulation
}

const r = [1, 2, 3, 4, 5].reduce(
  isNot2Filter(isEvenOnlyFilter(doubleTheMap(pushReducer))),
  []
)

r

// g(f(x)) === compose(g, f)(x) b-combinator

const compose = (...functions) =>
  functions.reduce((accumulation, fn) =>
    (...args) => accumulation(fn(...args), x => x))

const cleanNumbersXf = compose(isNot2Filter, isEvenOnlyFilter, doubleTheMap)

const r2 = [1, 2, 3, 4, 5].reduce(
  cleanNumbersXf(pushReducer),
  []
)
