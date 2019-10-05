/* global describe, it */
var assert = require('assert')
var regexpRangeDouble = require('../src/regexpRangeDouble')

describe('regexpRangeDouble', function () {
  it('0 - 9', function () {
    assert.deepStrictEqual(regexpRangeDouble(0, 9), '0[0-9]')
  })

  it('5 - 7', function () {
    assert.deepStrictEqual(regexpRangeDouble(5, 7), '0[5-7]')
  })

  it('6 - 7', function () {
    assert.deepStrictEqual(regexpRangeDouble(6, 7), '0[6-7]')
    // assert.deepStrictEqual(regexpRangeDouble(6, 7), '0[67]')
  })

  it('5 - 5', function () {
    assert.deepStrictEqual(regexpRangeDouble(5, 5), 5)
    // assert.deepStrictEqual(regexpRangeDouble(5, 5), '05')
  })

  it('10 - 19', function () {
    assert.deepStrictEqual(regexpRangeDouble(10, 19), '1[0-9]')
  })

  it('15 - 17', function () {
    assert.deepStrictEqual(regexpRangeDouble(15, 17), '1[5-7]')
  })

  it('09 - 11', function () {
    assert.deepStrictEqual(regexpRangeDouble(9, 11), '(09|1[0-1])')
    // assert.deepStrictEqual(regexpRangeDouble(9, 11), '(09|1[01])')
  })

  it('08 - 12', function () {
    assert.deepStrictEqual(regexpRangeDouble(8, 12), '(0[8-9]|1[0-2])')
    // assert.deepStrictEqual(regexpRangeDouble(8, 12), '(0[89]|1[0-2])')
  })

  it('08 - 22', function () {
    assert.deepStrictEqual(regexpRangeDouble(8, 22), '(0[8-9]|1[0-9]|2[0-2])')
    // assert.deepStrictEqual(regexpRangeDouble(8, 22), '(0[89]|1[0-9]|2[0-2])')
  })

  it('08 - 32', function () {
    assert.deepStrictEqual(regexpRangeDouble(8, 32), '(0[8-9]|[1-2][0-9]|3[0-2])')
    // assert.deepStrictEqual(regexpRangeDouble(8, 32), '(0[89]|[12][0-9]|3[0-2])')
  })

  it('08 - 42', function () {
    assert.deepStrictEqual(regexpRangeDouble(8, 42), '(0[8-9]|[1-3][0-9]|4[0-2])')
    // assert.deepStrictEqual(regexpRangeDouble(8, 42), '(0[89]|[1-3][0-9]|4[0-2])')
  })

  it('7 - 5', function () {
    assert.throws(() => regexpRangeDouble(7, 5), Error)
  })
})
