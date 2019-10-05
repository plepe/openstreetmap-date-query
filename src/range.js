module.exports = function range (from, to) {
  const result = []

  if (from > to + 1) {
    throw new Error('Error in range: ' + from + ' shouldn\'t be higher than ' + to)
  }

  for (let i = from; i <= to; i++) {
    result.push(i)
  }

  return result
}
