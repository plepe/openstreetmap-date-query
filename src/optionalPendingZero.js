module.exports = function optionalPendingZero (str) {
  let ret = ''
  let i

  for (i = 0; i < str.length; i++) {
    if (str[i] === '0') {
      ret += str[i] + '?'
    } else {
      return ret + str.substr(i)
    }
  }

  return ret + str.substr(i)
}
