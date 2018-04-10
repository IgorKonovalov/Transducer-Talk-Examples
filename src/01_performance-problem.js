const { performance } = require('perf_hooks')

const arrayOfRandoms = randomCeil => length =>
  Array.from({ length }, (v, i) => Math.floor(Math.random() * randomCeil))

const timeIt = (label, fn) => {
  const start = performance.now()
  fn()
  console.log(label, performance.now() - start)
}

const arrayOfMillion = arrayOfRandoms(100)(1e6)

const tripleIt = x => x * 3
const isEven = x => x % 2 === 0

timeIt('million map + filter', () => {
  arrayOfMillion
    .filter(isEven)
    .map(tripleIt)
})

timeIt('million 2 map + filter', () => {
  arrayOfMillion
    .filter(isEven)
    .map(tripleIt)
    .map(tripleIt)
})

timeIt('million 4 map + filter', () => {
  arrayOfMillion
    .filter(isEven)
    .map(tripleIt)
    .map(tripleIt)    
    .map(tripleIt)
    .map(tripleIt)
})

timeIt('iterative million 4 map + filter', () => {
  const res = []
  let el
  for (let i = 0; i < arrayOfMillion.length; i++) {
    if (arrayOfMillion[i] % 2 === 0) {
      el = tripleIt(tripleIt(tripleIt(tripleIt(arrayOfMillion[i]))))
      res.push(el)
    }
  }
  return res
})
