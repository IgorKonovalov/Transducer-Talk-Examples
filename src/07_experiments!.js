const Immutable = require('immutable')
const {
  toArray,
  toIter,
  toObj,
  compose,
  seq,
  into,
  take,
  filter,
  map
} = require('transducers.js')

// Immutable Map -> Iterable (Lazy)

const map1 = Immutable.Map({ a: 1, b: 2, c: 3 })

const iterator = toIter(map1)
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// Immutable Range -> transform -> Array

const isEvenFilter = filter(isEven)
const tripleMap = map(tripleIt)
const pushReducer = (a, x) => {
  a.push(x)
  return a
}

const transform = compose(
  map(x => x * 2),
  map(x => x / 4),
  filter(x => x % 3 === 0),
  take(5),
)

const resObj = into(
  [],
  transform,
  Immutable.Range()
)

resObj