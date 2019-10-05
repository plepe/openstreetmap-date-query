module.exports = function regexpRange (from, to) {
  if (from > to) {
    throw new Error('Error in range: ' + from + ' shouldn\'t be higher than ' + to)
  }

  if (from === to) {
    return '' + from
  }

  if (from + 1 === to) {
    return '[' + from + to + ']'
  }

  return '[' + from + '-' + to + ']'
}
