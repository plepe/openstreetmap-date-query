function regexpRange (from, to) {
  let result = ''

  for (let i = from; i <= to; i++) {
    result += i
  }

  return '[' + result + ']'
}

function regexpRangeDouble (from, to) {
  let result = []

  for (let i = from; i <= to; i++) {
    result.push(('' + i).padStart(2, '0'))
  }

  return '(' + result.join('|') + ')'
}

function parts (date, options={}) {
  let possibilities = []

  if (!options.op || options.op === '=') {
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      if (date[0] === '0') {
        possibilities.push('0?' + date.substr(1, 9) + '(-\\d{2})?')
      } else {
        possibilities.push(date)
      }

      if (!options.strict) {
        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 6))
        } else {
          possibilities.push(date.substr(0, 7))
        }

        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 3))
        } else {
          possibilities.push(date.substr(0, 4))
        }

        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 2) + '0s')
        } else {
          possibilities.push(date.substr(0, 3) + '0s')
        }

        let cent = parseInt(date.substr(0, 2)) + 1
        if (cent[0] === '0') {
          possibilities.push('C0?' + cent.substr(1))
        } else {
          possibilities.push('C' + cent)
        }
      }
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      if (date[0] === '0') {
        possibilities.push('0?' + date.substr(1, 6) + '(-\\d{2})?')
      } else {
        possibilities.push(date + '(-\\d{2})?')
      }

      if (!options.strict) {
        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 3))
        } else {
          possibilities.push(date.substr(0, 4))
        }

        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 2) + '0s')
        } else {
          possibilities.push(date.substr(0, 3) + '0s')
        }

        let cent = parseInt(date.substr(0, 2)) + 1
        if (cent[0] === '0') {
          possibilities.push('C0?' + cent.substr(1))
        } else {
          possibilities.push('C' + cent)
        }
      }
    }
    if (date.match(/^\d{4}$/)) {
      if (date[3] !== '0') {
        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 3) + '(-\\d{2}(-\\d{2})?)?')
        } else {
          possibilities.push(date + '(-\\d{2}(-\\d{2})?)?')
        }
      }

      if (!options.strict) {
        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 2) + '0s')
        } else {
          possibilities.push(date.substr(0, 3) + '0s')
        }

        let cent = parseInt(date.substr(0, 2)) + 1
        if (cent[0] === '0') {
          possibilities.push('C0?' + cent.substr(1))
        } else {
          possibilities.push('C' + cent)
        }
      }
    }
    else if (date.match(/^\d{4}s$/)) {
      if (date[0] === '0') {
        possibilities.push('0?' + date.substr(1, 2) + '(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      } else {
        possibilities.push(date.substr(0, 3) + '(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      }

      if (!options.strict) {
        let cent = parseInt(date.substr(0, 2)) + 1

        if (cent[0] === '0') {
          possibilities.push('C0?' + cent.substr(1))
        } else {
          possibilities.push('C' + cent)
        }
      }
    }
    else if (date.match(/^C\d{1,2}$/)) {
      let cent = date.match(/^C(\d{1,2})$/)[1]
      if (cent.length === 1) {
        cent = '0' + cent
      }
      let year = ('' + ((cent - 1) * 100)).padStart(4, '0')
      // single digit
      if (cent[0] === '0') {
        possibilities.push('C0?' + cent[1])
        possibilities.push('0' + year[1] + '\\d(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      } else {
        possibilities.push('C' + cent)
        possibilities.push(year.substr(0, 2) + '\\d(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      }
    }
  }
  else if (options.op === '<=') {
    let opt = JSON.parse(JSON.stringify(options))
    opt.op = '<'
    possibilities = possibilities.concat(parts(date, opt))

    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      possibilities.push(date)
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities.push(date + '(-\\d{2})?')
    }
    if (date.match(/^\d{4}$/)) {
      possibilities.push(date + '(-\\d{2}(-\\d{2})?)?')
      if (date[0] === '0') {
        possibilities.push(date.substr(1, 3) + '(-\\d{2}(-\\d{2})?)?')
      }
    }
    if (date.match(/^\d{3}0s$/)) {
      possibilities.push(date.substr(0, 3) + '(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      if (date[0] === '0') {
        possibilities.push(date.substr(1, 2) + '(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      }
    }
    if (date.match(/^C\d+$/)) {
      let year = ('' + ((date.substr(1) - 1) * 100)).padStart(4, '0')

      possibilities.push(year.substr(0, 2) + '\\d(0s|\\d(-\\d{2}(-\\d{2})?)?)')

      possibilities.push(date)
      if (date.length === 2 && date[0] === '0') {
        possibilities.push('C' + date[1])
      }
    }
  }
  else if (options.op === '<') {
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 7), options))

      if (date.substr(8, 2) !== '01') {
        possibilities.push(date.substr(0, 8) + regexpRangeDouble(1, date.substr(8, 2) - 1))
      }

      if (!options.strict) {
        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 6))
        } else {
          possibilities.push(date.substr(0, 7))
        }
      }
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 4), options))

      if (date.substr(5, 2) !== '01') {
        possibilities.push(date.substr(0, 5) + regexpRangeDouble(1, date.substr(5, 2) - 1) + '(-\\d{2})?')
      }

      if (!options.strict) {
        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 3))
        } else {
          possibilities.push(date.substr(0, 4))
        }
      }
    }
    if (date.match(/^\d{4}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 3) + '0s', options))

      if (date[3] !== '0') {
        possibilities.push(date.substr(0, 3) + regexpRange(0, date[3] - 1) + '(-\\d{2}(-\\d{2})?)?')
      }

      if (!options.strict) {
        if (date[0] === '0') {
          possibilities.push('0?' + date.substr(1, 2) + '0s')
        } else {
          possibilities.push(date.substr(0, 3) + '0s')
        }
      }
    }
    else if (date.match(/^\d{4}s$/)) {
      let cent = parseInt(date.substr(0, 2)) + 1
      possibilities = possibilities.concat(parts('C' + cent , options))

      if (date[2] > 0) {
        possibilities.push(date.substr(0, 2) + regexpRange(0, date[2] - 1) + '(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      }
      if (date[0] === '0') {
        possibilities.push(date.substr(1, 1) + regexpRange(0, date[2] - 1) + '(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      }

      if (!options.strict) {
        if (cent[0] === '0') {
          possibilities.push('C0?' + cent.substr(1))
        } else {
          possibilities.push('C' + cent)
        }
      }
    }
    else if (date.match(/^C\d{1,2}$/)) {
      possibilities.push('.* BC')

      let cent = date.match(/^C(\d{1,2})$/)[1]
      if (cent.length === 1) {
        cent = '0' + cent
      }
      let year = ('' + ((cent - 1) * 100)).padStart(4, '0')
      // single digit
      if (cent[0] !== '0') {
        possibilities.push('C\\d')
      } else if (cent[1] !== '0') {
        possibilities.push('C' + regexpRange(0, cent[1] - 1))
      }
      // double digit
      if (cent[0] !== '0') {
        possibilities.push('C' + regexpRange(0, cent[0] - 1) + '\\d')
      }
      if (year[0] !== '0') {
        possibilities.push(regexpRange(0, year[0] - 1) + '\\d\\d(0s|\\d(-\\d{2}(-\\d{2})?)?)')
        possibilities.push('0?\\d?\\d?(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      } else {
        possibilities.push('0?0?\\d?(0s|\\d(-\\d{2}(-\\d{2})?)?)')
      }
      if (cent[1] !== '0') {
        possibilities.push('C' + cent[0] + regexpRange(0, cent[1] - 1))
      }
      if (year[1] !== '0') {
        possibilities.push(year[0] + regexpRange(0, year[1] - 1) + '\\d(0s|\\d(-\\d{2}(-\\d{2})?)?)')
        if (year[0] === '0') {
          possibilities.push(regexpRange(0, year[1] - 1) + '\\d(0s|\\d(-\\d{2}(-\\d{2})?)?)')
          possibilities.push('0?\\d?(0s|\\d(-\\d{2}(-\\d{2})?)?)')
        }
      }
    }
  }

  return possibilities
}

function osmDateQuery (date, options={}) {
  if (!('strict' in options)) {
    options.strict = false
  }


  if (!options.op || options.op === '=') {
    if (options.strict) {
      let result = parts(date, options)
      return '^((' + result.join('|') + ')|((' + result.join('|') + ')\\.\\.(' + result.join('|') + ')))$'
    } else {
      let result = parts(date, options)
      let opt = JSON.parse(JSON.stringify(options))
      opt.op = '<='
      let resultA = parts(date, options)
      opt.op = '=>'
      let resultB = parts(date, options)

      return '^((' + result.join('|') + ')|((' + resultA.join('|') + ')(|\\.\\..*))|((|.*\\.\\.)(' + resultB.join('|') + ')))$'
    }
  } else if (options.op === '<' || options.op === '<=') {
    let result = parts(date, options)

    if (options.strict) {
      return '^(|.*\\.\\.)(' + result.join('|') + ')$'
    } else {
      return '^(' + result.join('|') + ')(|\\.\\..*)$'
    }
  }
}

module.exports = osmDateQuery
