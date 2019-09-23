let earlyMidLate = [ 'early', 'mid', 'late' ]
let maxYear = '2299'
let maxCent = maxYear.substr(0, 2) + 1

function arrayUnique (arr) {
  return Array.from(new Set(arr))
}

function regexpRange (from, to) {
  let result = ''

  for (let i = from; i <= to; i++) {
    result += i
  }

  return '[' + result + ']'
}

function range (from, to) {
  let result = []

  for (let i = from; i <= to; i++) {
    result.push(i)
  }

  return result
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

        p = earlyMidLate[Math.floor((date.substr(5, 2) - 1) / 12 * 3)]
        possibilities.push('(|' + p + ' )' + optPending0(date.substr(0, 4)))

        possibilities.push(optPending0(date.substr(0, 3) + '0s'))

        p = earlyMidLate[Math.floor((date.substr(3, 1) / 10 + (date.substr(5, 2) - 1) / 120) * 3)]
        possibilities.push('(|' + p + ' )' + optPending0(date.substr(0, 3)) + '0s')

        let cent = parseInt(date.substr(0, 2)) + 1
        p = earlyMidLate[Math.floor((date.substr(2, 2) / 100 + (date.substr(5, 2) - 1) / 1200) * 3)]
        possibilities.push('(|' + p + ' )C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities.push('(|early |mid |late )' + optPending0(date + '(-[0-9]{2})?'))

      if (!options.strict) {
        let p

        p = earlyMidLate[Math.floor((date.substr(5, 2) - 1) / 12 * 3)]
        possibilities.push('(|' + p + ' )' + optPending0(date.substr(0, 4)))

        p = earlyMidLate[Math.floor((date.substr(3, 1) / 10 + (date.substr(5, 2) - 1) / 120) * 3)]
        possibilities.push('(|' + p + ' )' + optPending0(date.substr(0, 3)) + '0s')

        let cent = parseInt(date.substr(0, 2)) + 1
        p = earlyMidLate[Math.floor((date.substr(2, 2) / 100 + (date.substr(5, 2) - 1) / 1200) * 3)]
        possibilities.push('(|' + p + ' )C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    if (date.match(/^\d{4}$/)) {
      possibilities.push('(|early |mid |late )' + optPending0(date + '(-[0-9]{2}(-[0-9]{2})?)?'))

      if (!options.strict) {
        let p

        p = arrayUnique([
          earlyMidLate[Math.floor((date.substr(3, 1)) / 10 * 3)],
          earlyMidLate[Math.floor((date.substr(3, 1) + '.99') / 10 * 3)]
        ])
        possibilities.push('(|' + p.join(' |') + ' )' + optPending0(date.substr(0, 3)) + '0s')

        p = arrayUnique([
          earlyMidLate[Math.floor((date.substr(2, 2)) / 100 * 3)],
          earlyMidLate[Math.floor((date.substr(2, 2) + '.99') / 100 * 3)]
        ])

        let cent = parseInt(date.substr(0, 2)) + 1
        possibilities.push('(|' + p.join(' |') + ' )C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    else if (date.match(/^\d{4}s$/)) {
      possibilities.push('(|early |mid |late )' + optPending0(date.substr(0, 3)) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')

      if (!options.strict) {
        let p = arrayUnique([
          earlyMidLate[Math.floor((date.substr(2, 1) + '0') / 100 * 3)],
          earlyMidLate[Math.floor((date.substr(2, 1) + '9') / 100 * 3)]
        ])

        let cent = parseInt(date.substr(0, 2)) + 1
        possibilities.push('(|' + p.join(' |') + ' )C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    else if (date.match(/^C\d+$/)) {
      let cent = date.substr(1).padStart('0', 2)
      let year = ('' + ((cent - 1) * 100)).padStart(4, '0')
      possibilities.push('(|early |mid |late )C' + optPending0(('' + cent).padStart('0', 2)))
      possibilities.push('(|early |mid |late )' + optPending0(year.substr(0, 2)) + '[0-9](0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
    }
  }
  else if (options.op === '<=' || options.op === '>=') {
    let opt = JSON.parse(JSON.stringify(options))
    opt.op = options.op[0]
    possibilities = possibilities.concat(parts(date, opt))

    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      possibilities.push(optPending0(date))
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities.push('(|early |mid |late )' + optPending0(date) + '(-[0-9]{2})?')
    }
    if (date.match(/^\d{4}$/)) {
      possibilities.push('(|early |mid |late )' + optPending0(date) + '(-[0-9]{2}(-[0-9]{2})?)?')
    }
    if (date.match(/^\d{3}0s$/)) {
      possibilities.push('(|early |mid |late )' + optPending0(date.substr(0, 3)) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
    }
    if (date.match(/^C\d+$/)) {
      let cent = date.substr(1).padStart('0', 2)
      let year = ('' + ((date.substr(1) - 1) * 100)).padStart(4, '0')

      possibilities.push('(|early |mid |late )' + optPending0(year.substr(0, 2)) + '[0-9](0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
      possibilities.push('(|early |mid |late )C' + optPending0(cent))
    }
  }
  else if (options.op === '<') {
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 7), options))

      let p = range(0, Math.floor((date.substr(8, 2) - 1) / 31 * 3) - 1)
        .map(i => earlyMidLate[i])
      if (!options.strict && date.substr(8, 2) !== '01') {
        p.push(earlyMidLate[Math.floor((date.substr(8, 2) - 2) / 31 * 3)])
      }
      if (p.length) {
        possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 7))
      }

      if (date.substr(8, 2) !== '01') {
        possibilities.push(optPending0(date.substr(0, 8) + regexpRangeDouble(1, date.substr(8, 2) - 1)))
      }

      if (!options.strict) {
        possibilities.push(optPending0(date.substr(0, 7)))
      }
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 4), options))

      let p = range(0, Math.floor((date.substr(5, 2) - 1) / 12 * 3) - 1)
        .map(i => earlyMidLate[i])
      if (!options.strict && date.substr(5, 2) !== '01') {
        p.push(earlyMidLate[Math.floor((date.substr(5, 2) - 2) / 12 * 3)])
      }
      if (p.length) {
        possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 4))
      }

      if (date.substr(5, 2) !== '01') {
        possibilities.push(optPending0(date.substr(0, 5)) + regexpRangeDouble(1, date.substr(5, 2) - 1) + '(-[0-9]{2})?')
      }

      if (!options.strict) {
        possibilities.push(optPending0(date.substr(0, 4)))
      }
    }
    if (date.match(/^\d{4}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 3) + '0s', options))

      let p = range(0, Math.floor((date.substr(3, 1)) / 10 * 3) - 1)
        .map(i => earlyMidLate[i])
      if (!options.strict && date.substr(3, 1) !== '0') {
        p.push(earlyMidLate[Math.floor((date.substr(3, 1) - 1) / 10 * 3)])
      }
      if (p.length) {
        possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 3) + '0s')
      }

      if (date[3] !== '0') {
        possibilities.push('(|early |mid |late )' + optPending0(date.substr(0, 3)) + regexpRange(0, date[3] - 1) + '(-[0-9]{2}(-[0-9]{2})?)?')
      }

      if (!options.strict) {
        possibilities.push('(|early |mid |late )' + optPending0(date.substr(0, 3)) + '0s')
      }
    }
    else if (date.match(/^\d{4}s$/)) {
      let cent = parseInt(date.substr(0, 2)) + 1
      possibilities = possibilities.concat(parts('C' + cent , options))

      let p = range(0, Math.floor((date.substr(2, 1) + '0') / 100 * 3) - 1)
        .map(i => earlyMidLate[i])
      if (!options.strict && date.substr(2, 1) !== '0') {
        p.push(earlyMidLate[Math.floor((date.substr(2, 1) + '0') / 100 * 3)])
      }
      if (p.length) {
        possibilities.push('(' + arrayUnique(p).join(' |') + ' )C' + cent)
      }

      if (date[2] > 0) {
        possibilities.push('(|early |mid |late )' + date.substr(0, 2) + regexpRange(0, date[2] - 1) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
      }
      if (date[0] === '0') {
        possibilities.push('(|early |mid |late )' + date.substr(1, 1) + regexpRange(0, date[2] - 1) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
      }

      if (!options.strict) {
        possibilities.push('(|early |mid |late )C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    else if (date.match(/^C\d+$/)) {
      possibilities.push('.* BC')

      let cent = date.substr(1).padStart(2, '0')
      let year = ('' + ((cent - 1) * 100)).padStart(4, '0')

      for (let i = 0; i < 2; i++) {
        if (cent[i] > 0) {
          possibilities.push('(|early |mid |late )C' + optPending0(cent.substr(0, i) + '0') + '[0-9]'.repeat(1 - i))
        }
        if (cent[i] > 1) {
          possibilities.push('(|early |mid |late )C' + optPending0(cent.substr(0, i)) + regexpRange(1, cent[i] - 1) + '[0-9]'.repeat(1 - i))
        }

        if (year[i] > 0) {
          possibilities.push('(|early |mid |late )' + optPending0(year.substr(0, i) + '0') + '[0-9]'.repeat(2 - i) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
        }
        if (year[i] > 1) {
          possibilities.push('(|early |mid |late )' + optPending0(year.substr(0, i)) + regexpRange(1, year.substr(i, 1) - 1) + '[0-9]'.repeat(2 - i) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
        }
      }
    }
  }
  else if (options.op === '>') {
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 7), options))

      let p = range(Math.floor((date.substr(8, 2) - 1) / 31 * 3) + 1, 2)
        .map(i => earlyMidLate[i])
      if (!options.strict && date.substr(8, 2) !== '31') {
        p.push(earlyMidLate[Math.floor((date.substr(8, 2)) / 31 * 3)])
      }
      if (p.length) {
        possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 7))
      }

      if (date.substr(8, 2) !== '31') {
        possibilities.push(optPending0(date.substr(0, 8) + regexpRangeDouble(parseInt(date.substr(8, 2)) + 1, 31)))
      }

      if (!options.strict) {
        if (date.substr(8, 2) !== '31') {
          possibilities.push(optPending0(date.substr(0, 7)))
        }
        if (date.substr(5, 5) !== '12-31') {
          possibilities.push('(|late )' + optPending0(date.substr(0, 4)))
        }
        if (date.substr(3, 7) !== '9-12-31') {
          possibilities.push('(|late )' + optPending0(date.substr(0, 3)) + '0s')
        }
      }
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 4), options))

      let p = range(Math.floor((parseInt(date.substr(5, 2)) - 1) / 12 * 3) + 1, 2)
        .map(i => earlyMidLate[i])
      if (!options.strict && date.substr(5, 2) !== '12') {
        p.push(earlyMidLate[Math.floor((parseInt(date.substr(5, 2))) / 12 * 3)])
      }
      if (p.length) {
        possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 4))
      }

      if (date.substr(5, 2) !== '12') {
        possibilities.push(optPending0(date.substr(0, 5)) + regexpRangeDouble(parseInt(date.substr(5, 2)) + 1, 12) + '(-[0-9]{2})?')
      }

      if (!options.strict) {
        if (date.substr(5, 2) !== '12') {
          possibilities.push(optPending0(date.substr(0, 4)))
        }
        if (date.substr(3, 4) !== '9-12') {
          possibilities.push(optPending0(date.substr(0, 3)) + '0s')
        }
      }
    }
    if (date.match(/^\d{4}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 3) + '0s', options))

      let p = range(Math.floor((date.substr(3, 1)) / 10 * 3) + 1, 2)
        .map(i => earlyMidLate[i])
      if (!options.strict && date.substr(3, 1) !== '9') {
        p.push(earlyMidLate[Math.floor((date.substr(3, 1)) / 10 * 3)])
      }
      if (p.length) {
        possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 3) + '0s')
      }

      if (date[3] !== '9') {
        possibilities.push('(|early |mid |late )' + optPending0(date.substr(0, 3)) + regexpRange(parseInt(date[3]) + 1, 9) + '(-[0-9]{2}(-[0-9]{2})?)?')
      }

      if (!options.strict && date.substr(3, 1) !== '9') {
        possibilities.push(optPending0(date.substr(0, 3)) + '0s')
      }
    }
    else if (date.match(/^\d{4}s$/)) {
      let cent = parseInt(date.substr(0, 2)) + 1
      possibilities = possibilities.concat(parts('C' + cent , options))

      let p = range(Math.floor((date.substr(2, 1) + '9') / 100 * 3) + 1, 2)
        .map(i => earlyMidLate[i])
      if (!options.strict && date.substr(2, 1) !== '9') {
        p.push(earlyMidLate[Math.floor((date.substr(2, 1) + '9') / 100 * 3)])
      }
      if (p.length) {
        possibilities.push('(' + arrayUnique(p).join(' |') + ' )C' + cent)
      }

      if (date[2] < 9) {
        possibilities.push('(|early |mid |late )' + date.substr(0, 2) + regexpRange(parseInt(date[2]) + 1, 9) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
      }
      if (date[0] === '9') {
        possibilities.push('(|early |mid |late )' + date.substr(1, 1) + regexpRange(parseInt(date[2]) + 1, 9) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
      }

      if (!options.strict) {
        possibilities.push('(|early |mid |late )C' + optPending0(('' + cent).padStart('0', 2)))
      }
    }
    else if (date.match(/^C\d+$/)) {
      let cent = date.substr(1).padStart(2, '0')
      let year = ('' + ((cent - 1) * 100)).padStart(4, '0')

      for (let i = 0; i < 2; i++) {
        if (cent[i] < (i === 0 ? maxCent[i] : 9)) {
          possibilities.push('(|early |mid |late )C' + optPending0(cent.substr(0, i)) + regexpRange(parseInt(cent[i]) + 1, i == 0 ? maxCent[i] : 9) + '[0-9]'.repeat(1 - i))
        }

        if (year[i] < (i === 0 ? maxYear[i] : 9)) {
          possibilities.push('(|early |mid |late )' + optPending0(year.substr(0, i)) + regexpRange(parseInt(year.substr(i, 1)) + 1, i == 0 ? maxYear[i] : 9) + '[0-9]'.repeat(2 - i) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
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
  } else if (options.op === '>' || options.op === '>=') {
    let result = parts(date, options)

    if (options.strict) {
      return '^(' + result.join('|') + ')(|\\.\\..*)$'
    } else {
      return '^(|.*\\.\\.)(' + result.join('|') + ')$'
    }
  }
}

module.exports = osmDateQuery
