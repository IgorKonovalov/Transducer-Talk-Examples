'use strict'
const { performance } = require('perf_hooks')
const { map, filter, seq, compose } = require('transducers.js')

const arrayOfRandoms = randomCeil => length =>
  Array.from({ length }, (v, i) => Math.floor(Math.random() * randomCeil))

const timeIt = (label, fn) => {
  const start = performance.now()
  fn()
  console.log(label, performance.now() - start)
}

const tripleIt = x => x * 3
const isEven = x => x % 2 === 0

let r1, r2, r3

const arrayOfMillion = arrayOfRandoms(100)(1e6)

//

timeIt('chained * 4', () => {
  r1 = arrayOfMillion  
    .filter(isEven)
    .map(tripleIt)
    .map(tripleIt)
    .map(tripleIt)
    .map(tripleIt)
})

timeIt('imperative * 4', () => {
  const res = []
  const length = arrayOfMillion.length
  for (let i = 0; i < length; i++) {
    let el = arrayOfMillion[i]
    if (el % 2 === 0) {
      res.push(tripleIt(tripleIt(tripleIt(tripleIt(el)))))
    }
  }
  r2 = res
  return res
})

timeIt('transducer * 4', () => {
  r3 = seq(
    arrayOfMillion,
    compose(
      filter(isEven),   
      map(tripleIt),
      map(tripleIt),      
      map(tripleIt),
      map(tripleIt),
    )
  )
})

console.log(JSON.stringify(r1) === JSON.stringify(r2))
console.log(JSON.stringify(r2) === JSON.stringify(r3))
