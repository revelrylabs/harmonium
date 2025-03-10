#!/usr/bin/env node

import commander from 'commander'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import * as configuration from '../configuration'
// Can't use ES module import for files outside the TypeScript scope
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageInfo = require('./../../package.json')

interface CommandOptions {
  outputPath?: string
  config?: string
  name: string
}

const program = new commander.Command()

program.version(packageInfo.version)

let cmdValue: string | undefined

program
  .command('init')
  .description('Creates a default harmonium.config.js is the current directory')
  .option(
    '-o, --outputPath [path]',
    'the path and filename to make the config file'
  )
  .action(async (cmd: CommandOptions) => {
    cmdValue = cmd.name
    const outputPath = cmd.outputPath
      ? cmd.outputPath
      : path.join(process.cwd(), 'harmonium.config.js')

    const config = await configuration.createConfiguration()

    const configModule = `module.exports = ${JSON.stringify(config, null, 2)}`

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
  .action(async (cmd: CommandOptions) => {
    cmdValue = cmd.name
    const configPath = cmd.config
      ? cmd.config
      : path.join(process.cwd(), 'harmonium.config.js')

    // Using require dynamically for user configuration
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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