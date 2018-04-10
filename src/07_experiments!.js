const Immutable = require('immutable')
const Rx = require('rxjs')
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

// predicate 
const isEven = x => x % 2 === 0

// xform
const tripleIt = x => x * 3
const increment = x => x + 1
const divideByThree = x => x / 3

// Immutable Map -> transformation -> Iterable (Lazy)

const immutableMap = Immutable.Map({ a: 1, b: 2, c: 3, d: 4 })

const iterator = toIter(
  immutableMap,
  compose(
    map(x => x[1]),
    map(tripleIt),
    filter(isEven)
  )
)

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// Immutable Range -> transform -> Array

const transform = compose(
  map(tripleIt),
  map(divideByThree),
  filter(isEven),
  take(10),
)

const resArr = into(
  [],
  transform,
  Immutable.Range()
)

resArr