const fs = require('fs')
const archiver = require('archiver')
const styleDictionary = require('./src/configuration/styleDictionary')

/**
 * Reads in our design token files and
 * Exports them depending on the outputs from
 * design-tokens.config.json
 * @returns {void}
 */
function buildDesignTokens() {
  const StyleDictionary = styleDictionary.prepareStyleDictionary()

  // APPLY THE CONFIGURATION
  // IMPORTANT: the registration of custom transforms
  // needs to be done _before_ applying the configuration
  StyleDictionaryExtended = StyleDictionary.extend(
    `${__dirname}/design-tokens.config.json`
  )

  // FINALLY, BUILD ALL THE PLATFORMS
  StyleDictionaryExtended.buildAllPlatforms()
}

/**
 * Generates our settings-templates zip file
 * @returns {void}
 */
function buildSettingsTemplatesArchive() {
  // create a file to stream archive data to.
  const output = fs.createWriteStream(
    `${__dirname}/settings-templates/settings-templates.zip`
  )

  const archive = archiver('zip')

  archive.pipe(output)

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', () => {
    console.log(`${archive.pointer()} total bytes`)
    console.log(
      'archiver has been finalized and the output file descriptor has closed.'
    )
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.log(err)
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', (err) => {
    throw err
  })

  // append a file
  archive.file('settings-templates/_color-palette.scss', {
    name: 'settings-templates/_color-palette.scss',
  })

  archive.file('settings-templates/_harmonium-settings.scss', {
    name: 'settings-templates/_harmonium-settings.scss',
  })

  archive.file('settings-templates/_harmonium-component-settings.scss', {
    name: 'settings-templates/_harmonium-component-settings.scss',
  })

  archive.file('settings-templates/harmoniumDesignTokens.js', {
    name: 'settings-templates/harmoniumDesignTokens.js',
  })

  archive.finalize()
}

function build() {
  console.log('Building design token output')
  buildDesignTokens()

  console.log('Building settings-templates.zip')
  buildSettingsTemplatesArchive()
}

build()
