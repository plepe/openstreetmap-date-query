/* global describe, it */
var assert = require('assert')
var osmDateQuery = require('../src/query.js')

const testDates = [
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
  'early 2019',
  'mid 2019',
  'late 2019',
  'late 2018',
  'late 1505',
  'late 350',
  'mid 2019',
  'late 2019-09',
  'late 2010s',
  'early 2000s',
  'early 2010s',
  'early C21',
  'early C16',
  'late C4',
  'late C3'
]

function testAll (regexp) {
  const r = RegExp(regexp)
  return testDates
    .filter(date => date.match(r))
}

describe('=, strict=true', function () {
  it('all dates in C21', function () {
    const regexp = osmDateQuery('C21', { op: '=', strict: true })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C21', '2010s', '2000s', '2020s', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21'],
      matches
    )
  })

  it('all dates in the 2010s', function () {
    const regexp = osmDateQuery('2010s', { op: '=', strict: true })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2010s', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2010s'],
      matches
    )
  })

  it('all dates in the year 2019', function () {
    const regexp = osmDateQuery('2019', { op: '=', strict: true })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', 'early 2019', 'mid 2019', 'late 2019', 'mid 2019', 'late 2019-09'],
      matches
    )
  })

  it('all dates in month 2019-09', function () {
    const regexp = osmDateQuery('2019-09', { op: '=', strict: true })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019-09', '2019-09-01..2019-09-21', '2019-09-21', '2019-09-22', 'late 2019-09'],
      matches
    )
  })

  it('all dates at date 2019-09-21', function () {
    const regexp = osmDateQuery('2019-09-21', { op: '=', strict: true })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019-09-21'],
      matches
    )
  })
})

describe('=, strict=false', function () {
  it('all dates in C21', function () {
    const regexp = osmDateQuery('C21', { op: '=', strict: false })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C21', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21'],
      matches
    )
  })

  it('all dates in the 2010s', function () {
    const regexp = osmDateQuery('2010s', { op: '=', strict: false })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2008-01-01..2010-01-01', 'C21', '2010s', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2010s', 'early C21'],
      matches
    )
  })

  it('all dates in the year 2019', function () {
    const regexp = osmDateQuery('2019', { op: '=', strict: false })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', 'C21', '2010s', 'early 2019', 'mid 2019', 'late 2019', 'mid 2019', 'late 2019-09', 'late 2010s', 'early C21'],
      matches
    )
  })

  it('all dates in month 2019-09', function () {
    const regexp = osmDateQuery('2019-09', { op: '=', strict: false })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019', '2019-09', '2019-09-01..2019-09-21', '2019-09-21', '2019-09-22', 'C21', '2010s', 'late 2019', 'late 2019-09', 'late 2010s', 'early C21'],
      matches
    )
  })

  it('all dates at date 2019-09-21', function () {
    const regexp = osmDateQuery('2019-09-21', { op: '=', strict: false })
    const matches = testAll(regexp)

    assert.deepStrictEqual(
      ['2019', '2019-09', '2019-09-01..2019-09-21', '2019-09-21', 'C21', '2010s', 'late 2019', 'late 2019-09', 'late 2010s', 'early C21'],
      matches
    )
  })
})

describe('<, strict=true', function () {
  it('all dates before 2019-09-22', function () {
    const regexp = osmDateQuery('2019-09-22', { op: '<', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019-07', '2019-08', '2019-09-01..2019-09-21', '2019-09-21', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s', 'early 2019', 'mid 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'early 2000s', 'early 2010s', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates before the year 2019', function () {
    const regexp = osmDateQuery('2019', { op: '<', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s', 'late 2018', 'late 1505', 'late 350', 'early 2000s', 'early 2010s', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates before the year 2099', function () {
    const regexp = osmDateQuery('2099', { op: '<', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates before the year 1506', function () {
    const regexp = osmDateQuery('1506', { op: '<', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', 'C15', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '0360s', 'late 1505', 'late 350', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates before the 1510s', function () {
    const regexp = osmDateQuery('1510s', { op: '<', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', 'late 1505', 'late 350', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates before the year 400', function () {
    const regexp = osmDateQuery('0400', { op: '<', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '0360s', 'late 350', 'late C4', 'late C3'],
      matches
    )
  })
})

describe('<, strict=false', function () {
  it('all dates before 2019-09-22', function () {
    const regexp = osmDateQuery('2019-09-22', { op: '<', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020', 'early 2019', 'mid 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates before the year 2019', function () {
    const regexp = osmDateQuery('2019', { op: '<', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020', 'late 2018', 'late 1505', 'late 350', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates before the year 1506', function () {
    const regexp = osmDateQuery('1506', { op: '<', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', 'C15', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', 'late 1505', 'late 350', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates before the 1510s', function () {
    const regexp = osmDateQuery('1510s', { op: '<', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', 'late 1505', 'late 350', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates before the year 400', function () {
    const regexp = osmDateQuery('0400', { op: '<', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '0360s', 'late 350', 'late C4', 'late C3'],
      matches
    )
  })
})

describe('<=, strict=true', function () {
  it('all dates <= 2019-09-22', function () {
    const regexp = osmDateQuery('2019-09-22', { op: '<=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019-07', '2019-08', '2019-09-01..2019-09-21', '2019-09-21', '2019-09-22', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s', 'early 2019', 'mid 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'early 2000s', 'early 2010s', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 2019-09', function () {
    const regexp = osmDateQuery('2019-09', { op: '<=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-09-21', '2019-09-22', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s', 'early 2019', 'mid 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2019-09', 'early 2000s', 'early 2010s', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 2019', function () {
    const regexp = osmDateQuery('2019', { op: '<=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2000s', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2019-09', 'early 2000s', 'early 2010s', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 1507', function () {
    const regexp = osmDateQuery('1507', { op: '<=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '0360s', 'late 1505', 'late 350', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 1500s', function () {
    const regexp = osmDateQuery('1500s', { op: '<=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', 'late 1505', 'late 350', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 350', function () {
    const regexp = osmDateQuery('0350', { op: '<=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', 'late 350', 'late C3'],
      matches
    )
  })

  it('all dates <= C21', function () {
    const regexp = osmDateQuery('C21', { op: '<=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })
})

describe('<=, strict=false', function () {
  it('all dates <= 2019-09-22', function () {
    const regexp = osmDateQuery('2019-09-22', { op: '<=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020', 'early 2019', 'mid 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 2019-09', function () {
    const regexp = osmDateQuery('2019-09', { op: '<=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020', 'early 2019', 'mid 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 2019', function () {
    const regexp = osmDateQuery('2019', { op: '<=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 1507', function () {
    const regexp = osmDateQuery('1507', { op: '<=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', 'late 1505', 'late 350', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 1500s', function () {
    const regexp = osmDateQuery('1500s', { op: '<=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', 'C15', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', 'late 1505', 'late 350', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= 350', function () {
    const regexp = osmDateQuery('0350', { op: '<=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C2', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', 'late 350', 'late C4', 'late C3'],
      matches
    )
  })

  it('all dates <= C21', function () {
    const regexp = osmDateQuery('C21', { op: '<=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C2', 'C15', 'C20', 'C21', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '360 BC', '350 BC', '340 BC', '340s', '0340s', '1500s', '0360s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4', 'late C3'],
      matches
    )
  })
})

describe('>, strict=true', function () {
  it('all dates after C20', function () {
    const regexp = osmDateQuery('C20', { op: '>', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C21', 'C22', '2010s', '2000s', '2020s', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21'],
      matches
    )
  })

  it('all dates after 2019-09-22', function () {
    const regexp = osmDateQuery('2019-09-22', { op: '>', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019-12-24', '2020-12-24', 'C22', '2020s'],
      matches
    )
  })

  it('all dates after 2019-09-21', function () {
    const regexp = osmDateQuery('2019-09-21', { op: '>', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019-09-22', '2019-12-24', '2020-12-24', 'C22', '2020s', 'late 2019-09'],
      matches
    )
  })

  it('all dates after the year 2019', function () {
    const regexp = osmDateQuery('2019', { op: '>', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2020-12-24', 'C22', '2020s'],
      matches
    )
  })

  it('all dates after the year 2017', function () {
    const regexp = osmDateQuery('2017', { op: '>', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', 'C22', '2020s', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09'],
      matches
    )
  })

  it('all dates after the year 2099', function () {
    const regexp = osmDateQuery('2099', { op: '>', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['C22'],
      matches
    )
  })

  it('all dates after the year 1506', function () {
    const regexp = osmDateQuery('1506', { op: '>', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C20', 'C21', 'C22', '1507-01-01', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21'],
      matches
    )
  })

  it('all dates after the 1510s', function () {
    const regexp = osmDateQuery('1510s', { op: '>', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C20', 'C21', 'C22', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21'],
      matches
    )
  })

  it('all dates after the year 400', function () {
    const regexp = osmDateQuery('0400', { op: '>', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C15', 'C20', 'C21', 'C22', '1507-01-01', '1500s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16'],
      matches
    )
  })
})

describe('>, strict=false', function () {
  it('all dates after 2019-09-22', function () {
    const regexp = osmDateQuery('2019-09-22', { op: '>', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-09', '2019-07..2019-10', '2019-12-24', '2020-12-24', 'C21', 'C22', '2010s', '2020s', '1988..2020', 'late 2019', 'late 2019-09', 'late 2010s', 'early C21'],
      matches
    )
  })

  it('all dates after the year 2019', function () {
    const regexp = osmDateQuery('2019', { op: '>', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2020-12-24', 'C21', 'C22', '2020s', '1988..2020', 'early C21'],
      matches
    )
  })

  it('all dates after the year 1506', function () {
    const regexp = osmDateQuery('1506', { op: '>', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C20', 'C21', 'C22', '1507-01-01', '1500s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16'],
      matches
    )
  })

  it('all dates after the 1510s', function () {
    const regexp = osmDateQuery('1510s', { op: '>', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C20', 'C21', 'C22', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16'],
      matches
    )
  })

  it('all dates after the year 400', function () {
    const regexp = osmDateQuery('0400', { op: '>', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C15', 'C20', 'C21', 'C22', '1507-01-01', '1500s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16'],
      matches
    )
  })
})

describe('>=, strict=true', function () {
  it('all dates >= 2019-09-21', function () {
    const regexp = osmDateQuery('2019-09-21', { op: '>=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019-09-21', '2019-09-22', '2019-12-24', '2020-12-24', 'C22', '2020s', 'late 2019-09'],
      matches
    )
  })

  it('all dates >= 2019-09', function () {
    const regexp = osmDateQuery('2019-09', { op: '>=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019-09', '2019-09-01..2019-09-21', '2019-09-21', '2019-09-22', '2019-12-24', '2020-12-24', 'C22', '2020s', 'late 2019-09'],
      matches
    )
  })

  it('all dates >= 2019', function () {
    const regexp = osmDateQuery('2019', { op: '>=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2020-12-24', 'C22', '2020s', 'early 2019', 'mid 2019', 'late 2019', 'mid 2019', 'late 2019-09'],
      matches
    )
  })

  it('all dates >= 1507', function () {
    const regexp = osmDateQuery('1507', { op: '>=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C20', 'C21', 'C22', '1507-01-01', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21'],
      matches
    )
  })

  it('all dates >= 1500s', function () {
    const regexp = osmDateQuery('1500s', { op: '>=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C20', 'C21', 'C22', '1507-01-01', '1500s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21'],
      matches
    )
  })

  it('all dates >= 350', function () {
    const regexp = osmDateQuery('0350', { op: '>=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C15', 'C20', 'C21', 'C22', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '1500s', '0360s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4'],
      matches
    )
  })

  it('all dates >= C21', function () {
    const regexp = osmDateQuery('C21', { op: '>=', strict: true })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C21', 'C22', '2010s', '2000s', '2020s', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21'],
      matches
    )
  })
})

describe('>=, strict=false', function () {
  it('all dates >= 2019-09-21', function () {
    const regexp = osmDateQuery('2019-09-21', { op: '>=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-12-24', '2020-12-24', 'C21', 'C22', '2010s', '2020s', '1988..2020', 'late 2019', 'late 2019-09', 'late 2010s', 'early C21'],
      matches
    )
  })

  it('all dates >= 2019-09', function () {
    const regexp = osmDateQuery('2019-09', { op: '>=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-12-24', '2020-12-24', 'C21', 'C22', '2010s', '2020s', '1988..2020', 'late 2019', 'late 2019-09', 'early C21'],
      matches
    )
  })

  it('all dates >= 2019', function () {
    const regexp = osmDateQuery('2019', { op: '>=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2020-12-24', 'C21', 'C22', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'mid 2019', 'late 2019-09', 'early C21'],
      matches
    )
  })

  it('all dates >= 1507', function () {
    const regexp = osmDateQuery('1507', { op: '>=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C20', 'C21', 'C22', '1507-01-01', '1500s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16'],
      matches
    )
  })

  it('all dates >= 1500s', function () {
    const regexp = osmDateQuery('1500s', { op: '>=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C20', 'C21', 'C22', '1507-01-01', '1500s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16'],
      matches
    )
  })

  it('all dates >= 350', function () {
    const regexp = osmDateQuery('0350', { op: '>=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C15', 'C20', 'C21', 'C22', '1507-01-01', '0350-01-01', '350-01-01', '350', '0350', '1500s', '0360s', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'late 1505', 'late 350', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21', 'early C16', 'late C4'],
      matches
    )
  })

  it('all dates >= C21', function () {
    const regexp = osmDateQuery('C21', { op: '>=', strict: false })
    const matches = testAll(regexp)
    assert.deepStrictEqual(
      ['2019', '2019-07', '2019-08', '2019-09', '2019-09-01..2019-09-21', '2019-07..2019-10', '2019-09-21', '2019-09-22', '2019-01-01', '2019-12-24', '2018-12-24', '2020-12-24', '2008-12-24', '2008-01-01..2010-01-01', '2008-08', 'C21', 'C22', '2010s', '2000s', '2020s', '1988..2020', 'early 2019', 'mid 2019', 'late 2019', 'late 2018', 'mid 2019', 'late 2019-09', 'late 2010s', 'early 2000s', 'early 2010s', 'early C21'],
      matches
    )
  })
})
