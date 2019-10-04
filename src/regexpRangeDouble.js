module.exports = function regexpRangeDouble (from, to) {
  const result = []

  if (from > to) {
    throw new Error('Error in range: ' + from + ' shouldn\'t be higher than ' + to)
  }
  if (from === to) {
    return from
  }
  if (Math.floor(from / 10) === Math.floor(to / 10)) {
    return Math.floor(from / 10) + '[' + (from % 10) + '-' + (to % 10) + ']'
  }

  result.push(Math.floor(from / 10) + (from % 10 === 9 ? '9' : '[' + (from % 10) + '-9]'))
  if (Math.floor(from / 10) === Math.floor(to / 10) - 2) {
    result.push(Math.floor(to / 10 - 1) + '[0-9]')
  } else if (Math.floor(from / 10) <= Math.floor(to / 10) - 2) {
    result.push('[' + Math.floor(from / 10 + 1) + '-' + Math.floor(to / 10 - 1) + '][0-9]')
  }
  result.push(Math.floor(to / 10) + (to % 10 === 0 ? '0' : '[0-' + (to % 10) + ']'))

  return '(' + result.join('|') + ')'
}
