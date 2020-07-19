const fs = require('fs')
const path = require('path')
const glob = require('glob')
const {promisify} = require('util')
const tempy = require('tempy')
const merge = require('deepmerge')

const rootPath = path.join(__dirname, '..', '..')

const designTokensGlob = path.join(rootPath, 'design-tokens', '**', '*.json')

const designTokensConfig = require(path.join(
  rootPath,
  'design-tokens.config.json'
))

/**
 * Generates a Harmonium configuration object
 * @returns {object} a new configuration object
 */
async function createConfiguration() {
  const globAsync = promisify(glob)
  const files = await globAsync(designTokensGlob)

  let designTokenObject = {}

  for (const file of files) {
    const json = require(file)

    designTokenObject = merge(designTokenObject, json)
  }

  return {
    platforms: {
      scss: {
        buildPath: './harmonium-settings/',
      },
      js: {
        buildPath: './js/',
      },
    },
    designTokens: designTokenObject,
  }
}

/**
 * Merges 2 configuration items together
 * If something in configurationA is also in configurationB,
 * then the new configuration favors the item in configurationB
 * @param {object} configurationA the first configuration
 * @param {object} configurationB the second configuration
 * @returns {object} a new configuration object
 */
function mergeConfiguration(configurationA, configurationB) {
  return merge(configurationA, configurationB)
}

/**
 * Generates assets based on the configuration
 * @param {object} configuration the configuration used to build the assets
 * @returns {void}
 */
async function createAssets(configuration) {
  const tempFile = tempy.file({extension: 'json'})
  const writeFileAsync = promisify(fs.writeFile)

  await writeFileAsync(tempFile, JSON.stringify(configuration.designTokens))

  let scss = designTokensConfig.platforms.scss

  let jsPlatform = designTokensConfig.platforms.js

  scss = merge(scss, {buildPath: configuration.platforms.scss.buildPath})
  jsPlatform = merge(jsPlatform, {
    buildPath: configuration.platforms.js.buildPath,
  })

  const StyleDictionary = require('./styleDictionary')
    .prepareStyleDictionary()
    .extend({
      source: [tempFile],
      platforms: {
        scss,
        jsPlatform,
      },
    })

  const result = StyleDictionary.buildAllPlatforms()

  return result
}

module.exports = {
  createConfiguration,
  mergeConfiguration,
  createAssets,
}
