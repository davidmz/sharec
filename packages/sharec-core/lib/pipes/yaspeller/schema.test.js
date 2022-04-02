const { fixtures } = require('testUtils')
const { yaspellerJson } = require('./schema')

describe('pipes > yaspeller > schema', () => {
  const yaspellerBaseFxt = fixtures('yaspeller/json/00-base', 'map')

  it('should merge yaspeller json configs', () => {
    expect(yaspellerJson(yaspellerBaseFxt)).toMatchSnapshot()
  })
})
