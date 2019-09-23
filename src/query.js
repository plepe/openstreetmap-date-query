let earlyMidLate = [ 'early', 'mid', 'late' ]

function regexpRange (from, to) {
  let result = ''

  for (let i = from; i <= to; i++) {
    result += i
  }

  return '[' + result + ']'
}

function optPending0 (str) {
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
      possibilities.push(optPending0(date))

      if (!options.strict) {
        let p
        // p - part of the month
        p = earlyMidLate[Math.floor(date.substr(8, 2) / 31 * 3)]
        possibilities.push('(|' + p + ' )' + optPending0(date.substr(0, 7)))
        // p - part of the year
        p = earlyMidLate[Math.floor((date.substr(5, 2) - 1) / 12 * 3)]
        possibilities.push('(|' + p + ' )' + optPending0(date.substr(0, 4)))
        possibilities.push(optPending0(date.substr(0, 4)))
        possibilities.push(optPending0(date.substr(0, 3) + '0s'))

        let cent = parseInt(date.substr(0, 2)) + 1
        possibilities.push('C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities.push('(|early |mid |late )' + optPending0(date + '(-[0-9]{2})?'))

      if (!options.strict) {
        let p = earlyMidLate[Math.floor((date.substr(5, 2) - 1) / 12 * 3)]
        possibilities.push('(|' + p + ' )' + optPending0(date.substr(0, 4)))
        possibilities.push(optPending0(date.substr(0, 3)) + '0s')

        let cent = parseInt(date.substr(0, 2)) + 1
        possibilities.push('C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    if (date.match(/^\d{4}$/)) {
      possibilities.push('(|early |mid |late )' + optPending0(date + '(-[0-9]{2}(-[0-9]{2})?)?'))

      if (!options.strict) {
        possibilities.push(optPending0(date.substr(0, 3)) + '0s')

        let cent = parseInt(date.substr(0, 2)) + 1
        possibilities.push('C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    else if (date.match(/^\d{4}s$/)) {
      possibilities.push('(|early |mid |late )' + optPending0(date.substr(0, 3)) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')

      if (!options.strict) {
        let cent = parseInt(date.substr(0, 2)) + 1
        possibilities.push('C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    else if (date.match(/^C\d+$/)) {
      let cent = date.substr(1).padStart('0', 2)
      let year = ('' + ((cent - 1) * 100)).padStart(4, '0')
      possibilities.push('C' + optPending0(('' + cent).padStart('0', 2)))
      possibilities.push('(|early |mid |late )' + optPending0(year.substr(0, 2)) + '[0-9](0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
    }
  }
  else if (options.op === '<=') {
    let opt = JSON.parse(JSON.stringify(options))
    opt.op = '<'
    possibilities = possibilities.concat(parts(date, opt))

    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      possibilities.push(optPending0(date))
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities.push(optPending0(date) + '(-[0-9]{2})?')
    }
    if (date.match(/^\d{4}$/)) {
      possibilities.push(optPending0(date) + '(-[0-9]{2}(-[0-9]{2})?)?')
    }
    if (date.match(/^\d{3}0s$/)) {
      possibilities.push(optPending0(date.substr(0, 3)) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
    }
    if (date.match(/^C\d+$/)) {
      let cent = date.substr(1).padStart('0', 2)
      let year = ('' + ((date.substr(1) - 1) * 100)).padStart(4, '0')

      possibilities.push(optPending0(year.substr(0, 2)) + '[0-9](0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')

      possibilities.push('C' + optPending0(cent))
    }
  }
  else if (options.op === '<') {
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 7), options))

      if (date.substr(8, 2) !== '01') {
        possibilities.push(optPending0(date.substr(0, 8) + regexpRangeDouble(1, date.substr(8, 2) - 1)))
      }

      if (!options.strict) {
        possibilities.push(optPending0(date.substr(0, 7)))
      }
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 4), options))

      if (date.substr(5, 2) !== '01') {
        possibilities.push(optPending0(date.substr(0, 5)) + regexpRangeDouble(1, date.substr(5, 2) - 1) + '(-[0-9]{2})?')
      }

      if (!options.strict) {
        possibilities.push(optPending0(date.substr(0, 4)))
      }
    }
    if (date.match(/^\d{4}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 3) + '0s', options))

      if (date[3] !== '0') {
        possibilities.push(optPending0(date.substr(0, 3)) + regexpRange(0, date[3] - 1) + '(-[0-9]{2}(-[0-9]{2})?)?')
      }

      if (!options.strict) {
        possibilities.push(optPending0(date.substr(0, 3)) + '0s')
      }
    }
    else if (date.match(/^\d{4}s$/)) {
      let cent = parseInt(date.substr(0, 2)) + 1
      possibilities = possibilities.concat(parts('C' + cent , options))

      if (date[2] > 0) {
        possibilities.push(date.substr(0, 2) + regexpRange(0, date[2] - 1) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
      }
      if (date[0] === '0') {
        possibilities.push(date.substr(1, 1) + regexpRange(0, date[2] - 1) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
      }

      if (!options.strict) {
        possibilities.push('C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    else if (date.match(/^C\d+$/)) {
      possibilities.push('.* BC')

      let cent = date.substr(1).padStart(2, '0')
      let year = ('' + ((cent - 1) * 100)).padStart(4, '0')

      for (let i = 0; i < 2; i++) {
        if (cent[i] > 0) {
          possibilities.push('C' + optPending0(cent.substr(0, i) + '0') + '[0-9]'.repeat(1 - i))
        }
        if (cent[i] > 1) {
          possibilities.push('C' + optPending0(cent.substr(0, i)) + regexpRange(1, cent[i] - 1) + '[0-9]'.repeat(1 - i))
        }

        if (year[i] > 0) {
          possibilities.push(optPending0(year.substr(0, i) + '0') + '[0-9]'.repeat(2 - i) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
        }
        if (year[i] > 1) {
          possibilities.push(optPending0(year.substr(0, i)) + regexpRange(1, year.substr(i, 1) - 1) + '[0-9]'.repeat(2 - i) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
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
