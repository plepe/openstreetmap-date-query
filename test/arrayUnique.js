/* global describe, it */
var assert = require('assert')
var arrayUnique = require('../src/arrayUnique')

describe('arrayUnique', function () {
  it('', function () {
    const input = ['a', 'a', 'b', 'a', 'b']
    const expected = ['a', 'b']

    assert.deepStrictEqual(
      arrayUnique(input),
      expected
    )
  })
})
