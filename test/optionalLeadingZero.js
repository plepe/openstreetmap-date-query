/* global describe, it */
var assert = require('assert')
var optionalLeadingZero = require('../src/optionalLeadingZero')

describe('optionalLeadingZero', function () {
  it('0', function () {
    assert.deepStrictEqual(optionalLeadingZero('0'), '0?')
  })

  it('00', function () {
    assert.deepStrictEqual(optionalLeadingZero('00'), '0?0?')
  })

  it('0100', function () {
    assert.deepStrictEqual(optionalLeadingZero('0100'), '0?100')
  })

  it('1000', function () {
    assert.deepStrictEqual(optionalLeadingZero('1000'), '1000')
  })

  it('0010', function () {
    assert.deepStrictEqual(optionalLeadingZero('0010'), '0?0?10')
  })
})
