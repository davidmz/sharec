const { EOL } = require('os')

/**
 * Replaces all OS-specified EOLs by just new line symbol
 * @param {String} str
 * @returns {String}
 */
const normalizeWraps = (str) => str.replace(/(\r\n|\n\r|\r|\n)/gm, '\n')

const cutEOL = (str) => str.replace(new RegExp(`${EOL}$`), '')

/**
 * Removes all EOL new line symbols from the end of given string
 * @param {String} str
 * @returns {String}
 */
const removeAllEOLWraps = (str) =>
  str
    .split(/\n/)
    .filter((line) => !!line)
    .join('\n')

/**
 * Replaces doubled new line symbol from given string
 * This requires, because on Window exists caes, when readed file always contains
 * 2 new line symbols at the end of loaded file
 * @param {String} str
 * @param {String} [eol]
 * @returns {String}
 */
const removeDoubleEOL = (str, eol = EOL) => {
  const doubleEOLIdx = str.indexOf(eol)

  if (doubleEOLIdx === -1) return str

  return `${str.slice(0, doubleEOLIdx)}\n`
}

const toWraplessEqual = (rawReceived, rawExpected, options = {}) => {
  let normalizedReceived = normalizeWraps(rawReceived)
  let normalizedExpected = normalizeWraps(rawExpected)

  // cases when we should ignore all EOL from comparing files
  if (options.eof === false) {
    normalizedReceived = removeAllEOLWraps(normalizedReceived)
    normalizedExpected = removeAllEOLWraps(normalizedExpected)
  }

  // \n\n\ - because we replace all OS-specified EOL to \n
  normalizedReceived = removeDoubleEOL(normalizedReceived, '\n\n')
  normalizedExpected = removeDoubleEOL(normalizedExpected, '\n\n')

  expect(normalizedReceived).toEqual(normalizedExpected)

  return {
    pass: true,
  }
}

const toMatchFxt = (rawReceived, rawExpected) => {
  const normalizedReceived = normalizeWraps(cutEOL(rawReceived))
  const normalizedExpected = normalizeWraps(cutEOL(rawExpected))

  expect(normalizedReceived).toEqual(normalizedExpected)

  return {
    pass: true,
  }
}

module.exports = {
  toWraplessEqual,
  toMatchFxt,
}
