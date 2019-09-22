/* global describe, it */
var assert = require('assert')
var osmDateQuery = require('../src/query.js')

let testDates = [
  '2019',
  '2019-07',
  '2019-08',
  '2019-09',
  '2019-09-01..2019-09-21',
  '2019-07..2019-10',
  '2019-09-21',
  '2019-09-22',
  '2019-01-01',
  '2019-12-24',
  '2018-12-24',
  '2020-12-24',
  '2008-12-24',
  '2008-01-01..2010-01-01',
  '2008-08',
  'C2',
  'C15',
  'C20',
  'C21',
  'C22',
  '1507-01-01',
  '0350-01-01',
  '350-01-01',
  '350',
  '0350',
  '360 BC',
  '350 BC',
  '340 BC',
  '340s',
  '0340s',
  '1500s',
  '0360s',
  '2010s',
  '2000s',
  '2020s',
  '1988..2020',
]

function testAll (regexp) {
  let r = RegExp(regexp)
  return testDates
    .filter(date => date.match(r))
}

describe('=, strict=true', function () {
  it('all dates in C21', function () {
    let regexp = osmDateQuery('C21', { op: '=', strict: true })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C21', '2010s', '2000s', '2020s' ],
      matches
    )
  })

  it('all dates in the 2010s', function () {
    let regexp = osmDateQuery('2010s', { op: '=', strict: true })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2010s' ],
      matches
    )
  })

  it('all dates in the year 2019', function () {
    let regexp = osmDateQuery('2019', { op: '=', strict: true })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24' ],
      matches
    )
  })

  it('all dates in month 2019-09', function () {
    let regexp = osmDateQuery('2019-09', { op: '=', strict: true })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019-09', '2019-09-01..2019-09-21', '2019-09-21', '2019-09-22' ],
      matches
    )
  })

  it('all dates at date 2019-09-21', function () {
    let regexp = osmDateQuery('2019-09-21', { op: '=', strict: true })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019-09-21' ],
      matches
    )
  })
})

describe('=, strict=false', function () {
  it('all dates in C21', function () {
    let regexp = osmDateQuery('C21', { op: '=', strict: false })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C21', '2010s', '2000s', '2020s', '1988..2020' ],
      matches
    )
  })

  it('all dates in the 2010s', function () {
    let regexp = osmDateQuery('2010s', { op: '=', strict: false })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2008-01-01..2010-01-01', 'C21', '2010s' ],
      matches
    )
  })

  it('all dates in the year 2019', function () {
    let regexp = osmDateQuery('2019', { op: '=', strict: false })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', 'C21', '2010s' ],
      matches
    )
  })

  it('all dates in month 2019-09', function () {
    let regexp = osmDateQuery('2019-09', { op: '=', strict: false })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019', '2019-09', '2019-09-01..2019-09-21', '2019-09-21', '2019-09-22', 'C21', '2010s' ],
      matches
    )
  })

  it('all dates at date 2019-09-21', function () {
    let regexp = osmDateQuery('2019-09-21', { op: '=', strict: false })
    let matches = testAll(regexp)

    assert.deepEqual(
      [ '2019', '2019-09', '2019-09-01..2019-09-21', '2019-09-21', 'C21', '2010s' ],
      matches
    )
  })
})

describe('<, strict=true', function () {
  it('all dates before 2019-09-22', function () {
    let regexp = osmDateQuery('2019-09-22', { op: '<', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019-07', '2019-08', '2019-09-01..2019-09-21', '2019-09-21', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s' ],
      matches
    )
  })

  it('all dates before the year 2019', function () {
    let regexp = osmDateQuery('2019', { op: '<', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s' ],
      matches
    )
  })

  it('all dates before the year 1506', function () {
    let regexp = osmDateQuery('1506', { op: '<', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', 'C15', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '0360s' ],
      matches
    )
  })

  it('all dates before the 1510s', function () {
    let regexp = osmDateQuery('1510s', { op: '<', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s' ],
      matches
    )
  })

  it('all dates before the year 400', function () {
    let regexp = osmDateQuery('0400', { op: '<', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '0360s' ],
      matches
    )
  })

  it('all dates before or equal the year 2019', function () {
    let regexp = osmDateQuery('2019', { op: '<=', strict: true })
  })
})

describe('<, strict=false', function () {
  it('all dates before 2019-09-22', function () {
    let regexp = osmDateQuery('2019-09-22', { op: '<', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020' ],
      matches
    )
  })

  it('all dates before the year 2019', function () {
    let regexp = osmDateQuery('2019', { op: '<', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020' ],
      matches
    )
  })

  it('all dates before the year 1506', function () {
    let regexp = osmDateQuery('1506', { op: '<', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', 'C15', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s' ],
      matches
    )
  })

  it('all dates before the 1510s', function () {
    let regexp = osmDateQuery('1510s', { op: '<', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s' ],
      matches
    )
  })

  it('all dates before the year 400', function () {
    let regexp = osmDateQuery('0400', { op: '<', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '0360s' ],
      matches
    )
  })
})

describe('<=, strict=true', function () {
  it('all dates <= 2019-09-22', function () {
    let regexp = osmDateQuery('2019-09-22', { op: '<=', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019-07', '2019-08', '2019-09-01..2019-09-21', '2019-09-21', '2019-09-22', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s' ],
      matches
    )
  })

  it('all dates <= 2019-09', function () {
    let regexp = osmDateQuery('2019-09', { op: '<=', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-09-21', '2019-09-22', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s' ],
      matches
    )
  })

  it('all dates <= 2019', function () {
    let regexp = osmDateQuery('2019', { op: '<=', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s' ],
      matches
    )
  })

  it('all dates <= 1507', function () {
    let regexp = osmDateQuery('1507', { op: '<=', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '0360s' ],
      matches
    )
  })

  it('all dates <= 1500s', function () {
    let regexp = osmDateQuery('1500s', { op: '<=', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s' ],
      matches
    )
  })

  it('all dates <= 350', function () {
    let regexp = osmDateQuery('0350', { op: '<=', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s' ],
      matches
    )
  })

  it('all dates <= C21', function () {
    let regexp = osmDateQuery('C21', { op: '<=', strict: true })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '2020s', '1988..2020' ],
      matches
    )
  })
})

describe('<=, strict=false', function () {
  it('all dates <= 2019-09-22', function () {
    let regexp = osmDateQuery('2019-09-22', { op: '<=', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020' ],
      matches
    )
  })

  it('all dates <= 2019-09', function () {
    let regexp = osmDateQuery('2019-09', { op: '<=', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020' ],
      matches
    )
  })

  it('all dates <= 2019', function () {
    let regexp = osmDateQuery('2019', { op: '<=', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020' ],
      matches
    )
  })

  it('all dates <= 1507', function () {
    let regexp = osmDateQuery('1507', { op: '<=', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s' ],
      matches
    )
  })

  it('all dates <= 1500s', function () {
    let regexp = osmDateQuery('1500s', { op: '<=', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s' ],
      matches
    )
  })

  it('all dates <= 350', function () {
    let regexp = osmDateQuery('0350', { op: '<=', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ 'C2', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s' ],
      matches
    )
  })

  it('all dates <= C21', function () {
    let regexp = osmDateQuery('C21', { op: '<=', strict: false })
    let matches = testAll(regexp)
    assert.deepEqual(
      [ '2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '2020s', '1988..2020' ],
      matches
    )
  })
})
