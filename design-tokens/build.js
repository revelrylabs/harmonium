const StyleDictionary = require('style-dictionary')

function build() {
  StyleDictionary.registerFilter({
    name: 'isBrandColor',
    matcher(prop) {
      return (
        prop.attributes.category === 'color' && prop.attributes.type == 'brand'
      )
    },
  })

  StyleDictionary.registerFilter({
    name: 'isFontColor',
    matcher(prop) {
      return (
        prop.attributes.category === 'color' && prop.attributes.type == 'font'
      )
    },
  })

  StyleDictionary.registerFilter({
    name: 'isFontSize',
    matcher(prop) {
      return (
        prop.attributes.category === 'size' && prop.attributes.type == 'font'
      )
    },
  })

  StyleDictionary.registerFilter({
    name: 'isMediaQuery',
    matcher(prop) {
      return (
        prop.attributes.category === 'media' && prop.attributes.type == 'query'
      )
    },
  })

  // APPLY THE CONFIGURATION
  // IMPORTANT: the registration of custom transforms
  // needs to be done _before_ applying the configuration
  StyleDictionaryExtended = StyleDictionary.extend(`${__dirname}/config.json`)

  // FINALLY, BUILD ALL THE PLATFORMS
  StyleDictionaryExtended.buildAllPlatforms()
}

module.exports = build
