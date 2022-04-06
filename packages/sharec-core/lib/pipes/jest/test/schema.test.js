const { fixtures } = require('testUtils')
const { jestJson } = require('../schema')

describe('pipes > jest > schema', () => {
  describe('JSON', () => {
    const jestBaseFxt = fixtures('jest/json/00-base', 'map')

    it('should merge configs', () => {
      expect(jestJson(jestBaseFxt)).toMatchSnapshot()
    })
  })
})
