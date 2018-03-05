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

const res = [1, 2, 3, 4, 5].reduce(
  isNot2Filter(isEvenOnlyFilter(doubleTheMap(pushReducer))),
  []
)

res

// g(f(x)) === compose(g, f)(x) b-combinator

