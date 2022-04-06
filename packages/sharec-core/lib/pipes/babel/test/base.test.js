const { fixtures } = require('testUtils')
const { babelJson } = require('../schema')

describe('strategies > pipes > babel > schema', () => {
  const babelBaseFxt = fixtures('babel/json/00-base', 'map')

  it('should merge babel json configs', () => {
    expect(babelJson(babelBaseFxt)).toMatchSnapshot()
  })
})
