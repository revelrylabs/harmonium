#!/usr/bin/env node

const commander = require('commander')
const fs = require('fs')
const path = require('path')
const program = new commander.Command()
const packageInfo = require('./../../package.json')
const configuration = require('./../configuration/index.js')
const util = require('util')
const {promisify} = require('util')

program
  .version(packageInfo.version)
  .command('init')
  .description('Creates a default harmonium.config.js is the current directory')
  .option(
    '-o, --outputPath [path]',
    'the path and filename to make the config file'
  )
  .action(async (cmd) => {
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

program.parse(process.argv)
