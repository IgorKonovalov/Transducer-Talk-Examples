const arrayOfRandoms = randomCeil => length =>
  Array.from({ length }, (v, i) => Math.floor(Math.random() * randomCeil))

const timeIt = (label, fn) => {
  console.time(label)
  fn()
  console.timeEnd(label)
}

const arrayOfMillion = arrayOfRandoms(100)(1e6)

const multiplyByThree = x => x * 3
const isEven = x => x % 2 === 0

timeIt('million map', () => {
  arrayOfMillion
    .map(multiplyByThree)
})

timeIt('million map + filter', () => {
  arrayOfMillion
    .map(multiplyByThree)
    .filter(isEven)
})

timeIt('million 2 map + filter', () => {
  const res = arrayOfMillion
    .map(multiplyByThree)
    .map(multiplyByThree)
    .filter(isEven)
})

timeIt('million 3 map + filter', () => {
  const res = arrayOfMillion
    .map(multiplyByThree)
    .map(multiplyByThree)
    .map(multiplyByThree)
    .filter(isEven)
})

timeIt('iterative million map + filter', () => {
  const res = []
  let el
  for (let i = 0; i < arrayOfMillion.length; i++) {
    el = multiplyByThree(arrayOfMillion[i])
    if (el % 2 === 0) {
      res.push(el)
    }
  }
  return res
})

timeIt('iterative million 3 map + filter', () => {
  const res = []
  let el
  for (let i = 0; i < arrayOfMillion.length; i++) {
    el = multiplyByThree(multiplyByThree(multiplyByThree(arrayOfMillion[i])))
    if (el % 2 === 0) {
      res.push(el)
    }
  }
  return res
})
