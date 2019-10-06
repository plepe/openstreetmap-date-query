const earlyMidLate = ['early', 'mid', 'late']
const maxYear = '2299'
const maxCent = maxYear.substr(0, 2) + 1

const arrayUnique = require('./arrayUnique')
const regexpRange = require('./regexpRange')
const regexpRangeDouble = require('./regexpRangeDouble')
const range = require('./range')
const optionalLeadingZero = require('./optionalLeadingZero')

function buildEqDate (date, options, possibilities) {
  // same day
  possibilities.push(optionalLeadingZero(date))

  if (!options.strict) {
    let p

    // same part of current month, resp. month only
    p = earlyMidLate[Math.floor(date.substr(8, 2) / 31 * 3)]
    possibilities.push('(|' + p + ' )' + optionalLeadingZero(date.substr(0, 7)))
    // same part of this year, resp. year only
    p = earlyMidLate[Math.floor((date.substr(5, 2) - 1) / 12 * 3)]
    possibilities.push('(|' + p + ' )' + optionalLeadingZero(date.substr(0, 4)))
    // same part of this decade, resp. decade only
    p = earlyMidLate[Math.floor((date.substr(3, 1) / 10 + (date.substr(5, 2) - 1) / 120) * 3)]
    possibilities.push('(|' + p + ' )' + optionalLeadingZero(date.substr(0, 3)) + '0s')
    // same part of this century, resp. century only
    const cent = parseInt(date.substr(0, 2)) + 1
    p = earlyMidLate[Math.floor((date.substr(2, 2) / 100 + (date.substr(5, 2) - 1) / 1200) * 3)]
    possibilities.push('(|' + p + ' )[Cc]' + optionalLeadingZero(('' + cent).padStart('0', 2)))
  }
}

function buildEqMonth (date, options, possibilities) {
  // same month
  possibilities.push('(|early |mid |late )' + optionalLeadingZero(date + '(-[0-9]{2})?'))

  if (!options.strict) {
    let p

    // same part of this year, resp. year only
    p = earlyMidLate[Math.floor((date.substr(5, 2) - 1) / 12 * 3)]
    possibilities.push('(|' + p + ' )' + optionalLeadingZero(date.substr(0, 4)))
    // same part of this decade, resp. decade only
    p = earlyMidLate[Math.floor((date.substr(3, 1) / 10 + (date.substr(5, 2) - 1) / 120) * 3)]
    possibilities.push('(|' + p + ' )' + optionalLeadingZero(date.substr(0, 3)) + '0s')
    // same part of this century, resp. century only
    const cent = parseInt(date.substr(0, 2)) + 1
    p = earlyMidLate[Math.floor((date.substr(2, 2) / 100 + (date.substr(5, 2) - 1) / 1200) * 3)]
    possibilities.push('(|' + p + ' )[Cc]' + optionalLeadingZero(('' + cent).padStart('0', 2)))
  }
}

function buildEqYear (date, options, possibilities) {
  // same year
  possibilities.push('(|early |mid |late )' + optionalLeadingZero(date + '(-[0-9]{2}(-[0-9]{2})?)?'))

  if (!options.strict) {
    let p

    // same part(s) of this decade, resp. decade only
    p = arrayUnique([
      earlyMidLate[Math.floor((date.substr(3, 1)) / 10 * 3)],
      earlyMidLate[Math.floor((date.substr(3, 1) + '.99') / 10 * 3)]
    ])
    possibilities.push('(|' + p.join(' |') + ' )' + optionalLeadingZero(date.substr(0, 3)) + '0s')
    // same part(s) of this century, resp. century only
    p = arrayUnique([
      earlyMidLate[Math.floor((date.substr(2, 2)) / 100 * 3)],
      earlyMidLate[Math.floor((date.substr(2, 2) + '.99') / 100 * 3)]
    ])
    const cent = parseInt(date.substr(0, 2)) + 1
    possibilities.push('(|' + p.join(' |') + ' )[Cc]' + optionalLeadingZero(('' + cent).padStart('0', 2)))
  }
}

function buildEqDecade (date, options, possibilities) {
  // same decade
  possibilities.push('(|early |mid |late )' + optionalLeadingZero(date.substr(0, 3)) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')

  if (!options.strict) {
    // same part(s) of this century, resp. century only
    const p = arrayUnique([
      earlyMidLate[Math.floor((date.substr(2, 1) + '0') / 100 * 3)],
      earlyMidLate[Math.floor((date.substr(2, 1) + '9') / 100 * 3)]
    ])
    const cent = parseInt(date.substr(0, 2)) + 1
    possibilities.push('(|' + p.join(' |') + ' )[Cc]' + optionalLeadingZero(('' + cent).padStart('0', 2)))
  }
}

function buildEqCentury (date, options, possibilities) {
  // same century - either as 'Cxx' or 'YYYY-...'
  const cent = date.substr(1).padStart('0', 2)
  const year = ('' + ((cent - 1) * 100)).padStart(4, '0')
  possibilities.push('(|early |mid |late )[Cc]' + optionalLeadingZero(('' + cent).padStart('0', 2)))
  possibilities.push('(|early |mid |late )' + optionalLeadingZero(year.substr(0, 2)) + '[0-9](0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
}

function buildLtDate (date, options, possibilities) {
  // all earlier part(s) of the current month
  const p = range(0, Math.floor((date.substr(8, 2) - 1) / 31 * 3) - 1)
    .map(i => earlyMidLate[i])
  if (!options.strict && date.substr(8, 2) !== '01') {
    p.push(earlyMidLate[Math.floor((date.substr(8, 2) - 2) / 31 * 3)])
  }
  if (p.length) {
    possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 7))
  }

  // all dates in the current month before current day
  if (date.substr(8, 2) !== '01') {
    possibilities.push(optionalLeadingZero(date.substr(0, 8) + regexpRangeDouble(1, date.substr(8, 2) - 1)))
  }

  // month only
  if (!options.strict) {
    possibilities.push(optionalLeadingZero(date.substr(0, 7)))
  }
}

function buildLtMonth (date, options, possibilities) {
  // all earlier part(s) of the current year
  const p = range(0, Math.floor((date.substr(5, 2) - 1) / 12 * 3) - 1)
    .map(i => earlyMidLate[i])
  if (!options.strict && date.substr(5, 2) !== '01') {
    p.push(earlyMidLate[Math.floor((date.substr(5, 2) - 2) / 12 * 3)])
  }
  if (p.length) {
    possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 4))
  }

  // all months in the current year before current month
  if (date.substr(5, 2) !== '01') {
    possibilities.push(optionalLeadingZero(date.substr(0, 5)) + regexpRangeDouble(1, date.substr(5, 2) - 1) + '(-[0-9]{2})?')
  }

  // year only
  if (!options.strict) {
    possibilities.push(optionalLeadingZero(date.substr(0, 4)))
  }
}

function buildLtYear (date, options, possibilities) {
  // all earlier part(s) of the current decade
  const p = range(0, Math.floor((date.substr(3, 1)) / 10 * 3) - 1)
    .map(i => earlyMidLate[i])
  if (!options.strict && date.substr(3, 1) !== '0') {
    p.push(earlyMidLate[Math.floor((date.substr(3, 1) - 1) / 10 * 3)])
  }
  if (p.length) {
    possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 3) + '0s')
  }

  // all years in the current decade before current year
  if (date[3] !== '0') {
    possibilities.push('(|early |mid |late )' + optionalLeadingZero(date.substr(0, 3)) + regexpRange(0, date[3] - 1) + '(-[0-9]{2}(-[0-9]{2})?)?')
  }

  // decade only
  if (!options.strict) {
    possibilities.push('(|early |mid |late )' + optionalLeadingZero(date.substr(0, 3)) + '0s')
  }
}

function buildLtDecade (date, options, possibilities) {
  // all earlier part(s) of the current century
  const cent = parseInt(date.substr(0, 2)) + 1
  const p = range(0, Math.floor((date.substr(2, 1) + '0') / 100 * 3) - 1)
    .map(i => earlyMidLate[i])
  if (!options.strict && date.substr(2, 1) !== '0') {
    p.push(earlyMidLate[Math.floor((date.substr(2, 1) + '0') / 100 * 3)])
  }
  if (p.length) {
    possibilities.push('(' + arrayUnique(p).join(' |') + ' )[Cc]' + cent)
  }

  // all decades in the current century before current decade
  if (date[2] > 0) {
    possibilities.push('(|early |mid |late )' + optionalLeadingZero(date.substr(0, 2)) + regexpRange(0, date[2] - 1) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
  }

  // century only
  if (!options.strict) {
    possibilities.push('(|early |mid |late )[Cc]' + optionalLeadingZero(('' + cent).padStart('0', 2)))
  }
}

function buildLtCentury (date, options, possibilities) {
  // all dates BCE
  possibilities.push('.* [Bb][Cc][Ee]?')

  const cent = date.substr(1).padStart(2, '0')
  const year = ('' + ((cent - 1) * 100)).padStart(4, '0')

  // all (earlier?) centuries in first millenium
  if (cent[0] === '0') {
    possibilities.push('(|early |mid |late )[Cc]0?' + regexpRange(1, cent[1] - 1))
  } else {
    possibilities.push('(|early |mid |late )[Cc]0?[1-9]')
  }

  // all millenia between first and current millenium
  if (cent[0] > 1) {
    possibilities.push('(|early |mid |late )[Cc]' + regexpRange(1, cent[0] - 1) + '[0-9]')
  }

  // all earlier centuries in current millenium
  if (cent[0] > 0 && cent[1] > 0) {
    possibilities.push('(|early |mid |late )[Cc]' + optionalLeadingZero(cent[0]) + optionalLeadingZero(regexpRange(0, cent[1] - 1)))
  }

  // i=0: centuries C0..C9
  // i=1: centuries C10..
  for (let i = 0; i < 2; i++) {
    if (year[i] > 0) {
      possibilities.push('(|early |mid |late )' + optionalLeadingZero(year.substr(0, i) + '0') + '[0-9]'.repeat(2 - i) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
    }
    if (year[i] > 1) {
      possibilities.push('(|early |mid |late )' + optionalLeadingZero(year.substr(0, i)) + regexpRange(1, year.substr(i, 1) - 1) + '[0-9]'.repeat(2 - i) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
    }
  }
}

function buildGtDate (date, options, possibilities) {
  const p = range(Math.floor((date.substr(8, 2) - 1) / 31 * 3) + 1, 2)
    .map(i => earlyMidLate[i])
  if (!options.strict && date.substr(8, 2) !== '31') {
    p.push(earlyMidLate[Math.floor((date.substr(8, 2)) / 31 * 3)])
  }
  if (p.length) {
    possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 7))
  }

  if (date.substr(8, 2) !== '31') {
    possibilities.push(optionalLeadingZero(date.substr(0, 8) + regexpRangeDouble(parseInt(date.substr(8, 2)) + 1, 31)))
  }

  if (!options.strict) {
    if (date.substr(8, 2) !== '31') {
      possibilities.push(optionalLeadingZero(date.substr(0, 7)))
    }
    if (date.substr(5, 5) !== '12-31') {
      possibilities.push('(|late )' + optionalLeadingZero(date.substr(0, 4)))
    }
    if (date.substr(3, 7) !== '9-12-31') {
      possibilities.push('(|late )' + optionalLeadingZero(date.substr(0, 3)) + '0s')
    }
  }
}

function buildGtMonth (date, options, possibilities) {
  const p = range(Math.floor((parseInt(date.substr(5, 2)) - 1) / 12 * 3) + 1, 2)
    .map(i => earlyMidLate[i])
  if (!options.strict && date.substr(5, 2) !== '12') {
    p.push(earlyMidLate[Math.floor((parseInt(date.substr(5, 2))) / 12 * 3)])
  }
  if (p.length) {
    possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 4))
  }

  if (date.substr(5, 2) !== '12') {
    possibilities.push(optionalLeadingZero(date.substr(0, 5)) + regexpRangeDouble(parseInt(date.substr(5, 2)) + 1, 12) + '(-[0-9]{2})?')
  }

  if (!options.strict) {
    if (date.substr(5, 2) !== '12') {
      possibilities.push(optionalLeadingZero(date.substr(0, 4)))
    }
    if (date.substr(3, 4) !== '9-12') {
      possibilities.push(optionalLeadingZero(date.substr(0, 3)) + '0s')
    }
  }
}

function buildGtYear (date, options, possibilities) {
  const p = range(Math.floor((date.substr(3, 1)) / 10 * 3) + 1, 2)
    .map(i => earlyMidLate[i])
  if (!options.strict && date.substr(3, 1) !== '9') {
    p.push(earlyMidLate[Math.floor((date.substr(3, 1)) / 10 * 3)])
  }
  if (p.length) {
    possibilities.push('(' + arrayUnique(p).join(' |') + ' )' + date.substr(0, 3) + '0s')
  }

  if (date[3] !== '9') {
    possibilities.push('(|early |mid |late )' + optionalLeadingZero(date.substr(0, 3)) + regexpRange(parseInt(date[3]) + 1, 9) + '(-[0-9]{2}(-[0-9]{2})?)?')
  }

  if (!options.strict && date.substr(3, 1) !== '9') {
    possibilities.push(optionalLeadingZero(date.substr(0, 3)) + '0s')
  }
}

function buildGtDecade (date, options, possibilities) {
  const cent = parseInt(date.substr(0, 2)) + 1
  const p = range(Math.floor((date.substr(2, 1) + '9') / 100 * 3) + 1, 2)
    .map(i => earlyMidLate[i])
  if (!options.strict && date.substr(2, 1) !== '9') {
    p.push(earlyMidLate[Math.floor((date.substr(2, 1) + '9') / 100 * 3)])
  }
  if (p.length) {
    possibilities.push('(' + arrayUnique(p).join(' |') + ' )[Cc]' + cent)
  }

  if (date[2] < 9) {
    possibilities.push('(|early |mid |late )' + date.substr(0, 2) + regexpRange(parseInt(date[2]) + 1, 9) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
  }
  if (date[0] === '9') {
    possibilities.push('(|early |mid |late )' + date.substr(1, 1) + regexpRange(parseInt(date[2]) + 1, 9) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
  }

  if (!options.strict) {
    possibilities.push('(|early |mid |late )[Cc]' + optionalLeadingZero(('' + cent).padStart('0', 2)))
  }
}

function buildGtCentury (date, options, possibilities) {
  const cent = date.substr(1).padStart(2, '0')
  const year = ('' + ((cent - 1) * 100)).padStart(4, '0')

  for (let i = 0; i < 2; i++) {
    if (cent[i] < (i === 0 ? maxCent[i] : 9)) {
      possibilities.push('(|early |mid |late )[Cc]' + optionalLeadingZero(cent.substr(0, i)) + regexpRange(parseInt(cent[i]) + 1, i === 0 ? maxCent[i] : 9) + '[0-9]'.repeat(1 - i))
    }

    if (year[i] < (i === 0 ? maxYear[i] : 9)) {
      possibilities.push('(|early |mid |late )' + optionalLeadingZero(year.substr(0, i)) + regexpRange(parseInt(year.substr(i, 1)) + 1, i === 0 ? maxYear[i] : 9) + '[0-9]'.repeat(2 - i) + '(0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)')
    }
  }
}

function parts (date, options = {}) {
  let possibilities = []

  if (!options.op || options.op === '=') {
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      buildEqDate(date, options, possibilities)
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      buildEqMonth(date, options, possibilities)
    }
    if (date.match(/^\d{4}$/)) {
      buildEqYear(date, options, possibilities)
    } else if (date.match(/^\d{4}s$/)) {
      buildEqDecade(date, options, possibilities)
    } else if (date.match(/^[Cc]\d+$/)) {
      buildEqCentury(date, options, possibilities)
    }
  } else if (options.op === '<=' || options.op === '>=') {
    const opt = JSON.parse(JSON.stringify(options))
    opt.op = options.op[0]
    possibilities = possibilities.concat(parts(date, opt))

    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      buildEqDate(date, options, possibilities)
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      buildEqMonth(date, options, possibilities)
    }
    if (date.match(/^\d{4}$/)) {
      buildEqYear(date, options, possibilities)
    }
    if (date.match(/^\d{3}0s$/)) {
      buildEqDecade(date, options, possibilities)
    }
    if (date.match(/^[Cc]\d+$/)) {
      buildEqCentury(date, options, possibilities)
    }
  } else if (options.op === '<') {
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 7), options))
      buildLtDate(date, options, possibilities)
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 4), options))
      buildLtMonth(date, options, possibilities)
    }
    if (date.match(/^\d{4}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 3) + '0s', options))
      buildLtYear(date, options, possibilities)
    } else if (date.match(/^\d{4}s$/)) {
      const cent = parseInt(date.substr(0, 2)) + 1
      possibilities = possibilities.concat(parts('C' + cent, options))
      buildLtDecade(date, options, possibilities)
    } else if (date.match(/^[Cc]\d+$/)) {
      buildLtCentury(date, options, possibilities)
    }
  } else if (options.op === '>') {
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 7), options))
      buildGtDate(date, options, possibilities)
    }
    if (date.match(/^\d{4}-\d{2}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 4), options))
      buildGtMonth(date, options, possibilities)
    }
    if (date.match(/^\d{4}$/)) {
      possibilities = possibilities.concat(parts(date.substr(0, 3) + '0s', options))
      buildGtYear(date, options, possibilities)
    } else if (date.match(/^\d{4}s$/)) {
      const cent = parseInt(date.substr(0, 2)) + 1
      possibilities = possibilities.concat(parts('C' + cent, options))
      buildGtDecade(date, options, possibilities)
    } else if (date.match(/^[Cc]\d+$/)) {
      buildGtCentury(date, options, possibilities)
    }
  }

  return possibilities
}

function osmDateQuery (date, options = {}) {
  if (!('strict' in options)) {
    options.strict = false
  }

  if (!options.op || options.op === '=') {
    if (options.strict) {
      const result = parts(date, options)
      return '^(~?(' + result.join('|') + ')|(~?(' + result.join('|') + ')\\.\\.~?(' + result.join('|') + ')))$'
    } else {
      const result = parts(date, options)
      const resultA = parts(date, options)
      const resultB = parts(date, options)

      return '^(~?(' + result.join('|') + ')|(~?(' + resultA.join('|') + ')(|\\.\\..*))|((|.*\\.\\.)~?(' + resultB.join('|') + ')))$'
    }
  } else if (options.op === '<' || options.op === '<=') {
    const result = parts(date, options)

    if (options.strict) {
      return '^(|.*\\.\\.)~?(' + result.join('|') + ')$'
    } else {
      return '^~?(' + result.join('|') + ')(|\\.\\..*)$'
    }
  } else if (options.op === '>' || options.op === '>=') {
    const result = parts(date, options)

    if (options.strict) {
      return '^~?(' + result.join('|') + ')(|\\.\\..*)$'
    } else {
      return '^(|.*\\.\\.)~?(' + result.join('|') + ')$'
    }
  }
}

module.exports = osmDateQuery
