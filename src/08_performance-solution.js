import { map, filter, seq, compose } from 'transducers.js'

const arrayOfRandoms = randomCeil => length =>
  Array.from({ length }, (v, i) => Math.floor(Math.random() * randomCeil))

const timeIt = (label, fn) => {
  console.time(label)
  fn()
  console.timeEnd(label)
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
  for (let i = 0; i < arrayOfMillion.length; i++) {
    let el = arrayOfMillion[i]
    if (el % 2 === 0) {
      el = tripleIt(tripleIt(tripleIt(tripleIt(el))))
      res.push(el)
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
