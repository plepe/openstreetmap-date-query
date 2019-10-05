/* global describe, it */
var assert = require('assert')
var regexpRange = require('../src/regexpRange')

describe('regexpRange', function () {
  it('0 - 9', function () {
    assert.deepStrictEqual(regexpRange(0, 9), '[0-9]')
  })

  it('5 - 7', function () {
    assert.deepStrictEqual(regexpRange(5, 7), '[5-7]')
  })

  it('6 - 7', function () {
    assert.deepStrictEqual(regexpRange(6, 7), '[6-7]')
  })

  it('5 - 5', function () {
    assert.deepStrictEqual(regexpRange(5, 5), '5')
  })

  it('7 - 5', function () {
    assert.throws(() => regexpRange(7, 5), Error)
  })
})
