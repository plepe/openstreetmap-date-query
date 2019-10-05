/* global describe, it */
var assert = require('assert')
var range = require('../src/range')

describe('range', function () {
  it('0 - 9', function () {
    assert.deepStrictEqual(range(0, 9), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('5 - 7', function () {
    assert.deepStrictEqual(range(5, 7), [5, 6, 7])
  })

  it('6 - 7', function () {
    assert.deepStrictEqual(range(6, 7), [6, 7])
  })

  it('5 - 5', function () {
    assert.deepStrictEqual(range(5, 5), [5])
  })

  it('7 - 5', function () {
    assert.deepStrictEqual(range(7, 5), [])
    //assert.throws(() => range(7, 5), Error)
  })
})
