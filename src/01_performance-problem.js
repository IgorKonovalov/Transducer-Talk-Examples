const arrayOfRandoms = randomCeil => length =>
  Array.from({ length }, (v, i) => Math.floor(Math.random() * randomCeil))

const timeIt = (label, fn) => {
  console.time(label)
  fn()
  console.timeEnd(label)
}

const arrayOfMillion = arrayOfRandoms(100)(1e6)

const doubleTheNumber = x => x * 2
const isEven = x => x % 2 === 0

timeIt('million map', () => {
  arrayOfMillion
    .map(doubleTheNumber)
})

timeIt('million map + filter', () => {
  arrayOfMillion
    .map(doubleTheNumber)
    .filter(isEven)
})

timeIt('million 2 map + filter', () => {
  const res = arrayOfMillion
    .map(doubleTheNumber)
    .map(doubleTheNumber)
    .filter(isEven)
  // console.log('million 2 map res', res.length)
})

timeIt('iterative 2 map + filter', () => {
  const res = []
  let el
  for (let i = 0; i < arrayOfMillion.length; i++) {
    el = doubleTheNumber(doubleTheNumber(arrayOfMillion[i]))
    if (el % 2 === 0) {
      res.push(el)
    }
  }
  // console.log('iteration length', res.length)
  return res
})