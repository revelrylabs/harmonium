#!/usr/bin/env node

const commander = require('commander')
const fs = require('fs')
const path = require('path')
const program = new commander.Command()
const packageInfo = require('./../../package.json')
const configuration = require('./../configuration/index.js')
const util = require('util')
const {promisify} = require('util')

program.version(packageInfo.version)

let cmdValue

program
  .command('init')
  .description('Creates a default harmonium.config.js is the current directory')
  .option(
    '-o, --outputPath [path]',
    'the path and filename to make the config file'
  )
  .action(async (cmd) => {
    cmdValue = cmd.name
    const outputPath = cmd.outputPath
      ? cmd.outputPath
      : path.join(process.cwd(), 'harmonium.config.js')

    const config = await configuration.createConfiguration()

    const configModule = `module.exports = ${util.inspect(config, {
      depth: null,
    })}`

    const writeFileAsync = promisify(fs.writeFile)

    await writeFileAsync(outputPath, configModule)
  })

program
  .command('build')
  .description('Builds assets from the harmonium configuration')
  .option(
    '-c, --config [path]',
    'the configuration path and filename if not in the current working directory'
  )
  .action(async (cmd) => {
    cmdValue = cmd.name
    const configPath = cmd.config
      ? cmd.config
      : path.join(process.cwd(), 'harmonium.config.js')

    const userConfiguration = require(configPath)

    const originalConfiguration = await configuration.createConfiguration()

    const mergedConfiguration = configuration.mergeConfiguration(
      originalConfiguration,
      userConfiguration
    )

    await configuration.createAssets(mergedConfiguration)
  })

program.parse(process.argv)

if (typeof cmdValue === 'undefined') {
  program.help()
  process.exit(1)
}
