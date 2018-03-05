// Understanding reducers
//
// reducer : acc -> value -> acc
//

// sum reducer

const sumReducer = (accumulation, value) => accumulation + value

const resSum = sumReducer(sumReducer(sumReducer(1, 2), 3), 4)
resSum

const resSumString = sumReducer(sumReducer('Hello ', 'World'), '!!!')
resSumString

const reduceRes = [1, 2, 3, 4, 5].reduce(sumReducer, 0)
reduceRes

// obj reducer

const objReducer = (accumulation, value) => ({
  ...accumulation,
  ...value
})

const user = {
  name: 'Igor',
  email: 'igor@konovalov.com'
}

const twitter = {
  twitter: 'igor-dlinni'
}

const resObj = objReducer(user, twitter)
resObj

// set reducer

const setReducer = (accumulation, value) => accumulation.add(value)
const set = new Set([1, 2, 3, 4])

const resSet = setReducer(set, 14)

resSet

// set.reduce(sumReducer) // ->  set.reduce is not a function 
