const minimist = require('minimist')
const { createSpinner } = require('./cli')
const { composeSteps, steps } = require('./steps')
const { InternalError } = require('./errors')

/**
 * @param {NodeJS.Process} targetProcess
 * @returns {Promise<void>}
 */
async function sharec(targetProcess) {
  const { env } = targetProcess
  // eslint-disable-next-line
  const { _, ...options } = minimist(targetProcess.argv.slice(2))
  const silentMode = options.s || options.silent
  const spinner = createSpinner({
    text: 'Initializing sharec',
    silent: silentMode,
  })
  const targetPath = targetProcess.env.INIT_CWD
  const configPath = env.PWD
  const input = {
    targetPath,
    configPath,
  }

  const commonFlow = composeSteps(
    steps.readTargetPackage(spinner),
    steps.readUpcomingPackage(spinner),
    steps.isAlreadyInstalled(spinner),
    steps.isDependantOfSharec(spinner),
    steps.isIgnoresSharecConfigs(spinner),
    steps.readConfigs(spinner),
    steps.readCache(spinner),
    steps.writeConfigs(spinner),
    steps.writeCache(spinner),
    steps.writeMeta(spinner),
  )

  try {
    await commonFlow(input)

    targetProcess.exit(0)
  } catch (err) {
    if (err instanceof InternalError) {
      spinner.fail(err.message)
    } else {
      spinner.fail('Configuration was not fully applyed due unexpected error')
      console.error(err)
    }

    targetProcess.exit(1)
  }
}

module.exports = sharec
