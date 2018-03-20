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

const arrayOfMillion = arrayOfRandoms(100)(1e6)

//

timeIt('chained', () => {
  arrayOfMillion
    .filter(isEven)
    .map(tripleIt)
})

timeIt('chained * 2', () => {
  arrayOfMillion
    .filter(isEven)
    .map(tripleIt)
    .map(tripleIt)    
})

timeIt('chained * 4', () => {
  arrayOfMillion  
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
  return res
})

const transform = compose(filter(isEven), map(tripleIt))

timeIt('transducer', () => {
  seq(
    arrayOfMillion,
    compose(
      filter(isEven),
      map(tripleIt),
    )
  )
})

timeIt('transducer * 4', () => {
  seq(
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
