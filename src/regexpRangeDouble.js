const regexpRange = require('./regexpRange')

module.exports = function regexpRangeDouble (from, to) {
  const result = []

  if (from > to) {
    throw new Error('Error in range: ' + from + ' shouldn\'t be higher than ' + to)
  }
  if (Math.floor(from / 10) === Math.floor(to / 10)) {
    return Math.floor(from / 10) + regexpRange(from % 10, to % 10)
  }

  result.push(Math.floor(from / 10) + regexpRange(from % 10, 9))
  if (Math.floor(from / 10) === Math.floor(to / 10) - 2) {
    result.push(Math.floor(to / 10 - 1) + '[0-9]')
  } else if (Math.floor(from / 10) <= Math.floor(to / 10) - 2) {
    result.push(regexpRange(Math.floor(from / 10 + 1), Math.floor(to / 10 - 1)) + '[0-9]')
  }
  result.push(Math.floor(to / 10) + regexpRange(0, to % 10))

  return '(' + result.join('|') + ')'
}
