const omit = require('lodash/omit')
const pick = require('lodash/pick')
const path = require('path')
const { readFile } = require('../../utils/std').fs

const IGNORED_FIELDS = [
  'sharec',
  'name',
  'version',
  'description',
  'keywords',
  'homepage',
  'bugs',
  'license',
  'people',
  'man',
  'repository',
  'os',
  'cpu',
  'preferGlobal',
  'private',
  'author',
]

/**
 * @typedef {Object} MetaData
 * @property {String} version
 * @property {String} config
 */

const getCurrentPackageJsonMetaData = async targetPath => {
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
  const targetPackageJson = JSON.parse(rawTargetPackageJson)

  return extractMetaData(targetPackageJson)
}

const extractConfigs = packageJson => omit(packageJson, IGNORED_FIELDS)

/**
 * @param {Object} packageJson
 * @returns {MetaData|null}
 */
const extractMetaData = packageJson => {
  if (!packageJson.sharec) return null

  return pick(packageJson.sharec, ['config', 'version'])
}

module.exports = {
  getCurrentPackageJsonMetaData,
  extractConfigs,
  extractMetaData,
}
