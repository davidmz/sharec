// @ts-check

const isEqual = require('lodash.isequal')
const primitiveAtom = require('./primitive')
const hashAtom = require('./hash')

/**
 * @typedef {import('../').Pair<any>} AnyPair
 * @typedef {import('../').SchemaParams<AnyPair>} SchemaAnyPairParams
 * @typedef {import('../').Primitive} Primitive
 * @typedef {import('../').SchemaParams<Primitive>} SchemaPrimitiveParams
 */

/**
 * Merges pairs-like data structures
 * Also can handle string values and other primitives
 * @param {SchemaAnyPairParams|SchemaPrimitiveParams} params
 * @returns {AnyPair|Primitive}
 */
function pairAtom(params) {
  const { current, upcoming, cached } = params

  if (current === undefined && upcoming) return upcoming
  if (current && upcoming === undefined) return current
  if (cached !== undefined && !isEqual(current, cached)) return current
  if (typeof current !== typeof upcoming) return upcoming
  // @ts-ignore
  if (typeof current === 'string') return primitiveAtom(params)

  if (current[0] !== upcoming[0]) {
    return upcoming
  }

  return [
    current[0],
    hashAtom({
      current: current[1],
      upcoming: upcoming[1],
      cached: cached && cached[1],
    }),
  ]
}

module.exports = pairAtom
