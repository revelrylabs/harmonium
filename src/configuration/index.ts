import fs from 'fs'
import path from 'path'
import * as globModule from 'glob'
import { promisify } from 'util'
import * as tempy from 'tempy'
import merge from 'deepmerge'
import { prepareStyleDictionary } from './styleDictionary'

// Define interfaces for configuration
export interface PlatformConfig {
  buildPath: string
  [key: string]: any
}

export interface HarmoniumConfiguration {
  platforms: {
    scss: PlatformConfig
    js: PlatformConfig
    [key: string]: PlatformConfig
  }
  designTokens: Record<string, any>
}

const rootPath = path.join(__dirname, '..', '..')

const designTokensGlob = path.join(rootPath, 'design-tokens', '**', '*.json')

// Using require for JSON files since they're outside the TypeScript system
// eslint-disable-next-line @typescript-eslint/no-var-requires
const designTokensConfig = require(path.join(
  rootPath,
  'design-tokens.config.json'
))

/**
 * Generates a Harmonium configuration object
 * @returns {object} a new configuration object
 */
export async function createConfiguration(): Promise<HarmoniumConfiguration> {
  // Use type assertion to fix the promisify issue
  const globAsync = promisify(globModule.glob as any) as (pattern: string) => Promise<string[]>
  const files = await globAsync(designTokensGlob)

  let designTokenObject = {}

  for (const file of files) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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
export function mergeConfiguration(
  configurationA: HarmoniumConfiguration,
  configurationB: Partial<HarmoniumConfiguration>
): HarmoniumConfiguration {
  return merge(configurationA, configurationB)
}

/**
 * Generates assets based on the configuration
 * @param {object} configuration the configuration used to build the assets
 * @returns {void}
 */
export async function createAssets(
  configuration: HarmoniumConfiguration
): Promise<any> {
  // Using any type for tempy to bypass TypeScript errors
  const tempFile = (tempy as any).file({ extension: 'json' })
  const writeFileAsync = promisify(fs.writeFile)

  await writeFileAsync(tempFile, JSON.stringify(configuration.designTokens))

  let scss = designTokensConfig.platforms.scss

  let jsPlatform = designTokensConfig.platforms.js

  scss = merge(scss, { buildPath: configuration.platforms.scss.buildPath })
  jsPlatform = merge(jsPlatform, {
    buildPath: configuration.platforms.js.buildPath,
  })

  const StyleDictionary = prepareStyleDictionary().extend({
    source: [tempFile],
    platforms: {
      scss,
      jsPlatform,
    },
  })

  const result = StyleDictionary.buildAllPlatforms()

  return result
} 