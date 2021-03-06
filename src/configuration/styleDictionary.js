const StyleDictionary = require('style-dictionary')
const Color = require('tinycolor2')

function fileHeader(options, commentStyle) {
  let to_ret = ''
  // for backward compatibility we need to have the user explicitly hide them

  const showFileHeader = options ? options.showFileHeader : true

  if (showFileHeader) {
    if (commentStyle === 'short') {
      to_ret += '\n'
      to_ret += '// Do not edit directly\n'
      to_ret += `// Generated on ${new Date().toUTCString()}\n`
      to_ret += '\n'
    } else {
      to_ret += '/**\n'
      to_ret += ' * Do not edit directly\n'
      to_ret += ` * Generated on ${new Date().toUTCString()}\n`
      to_ret += ' */\n\n'
    }
  }

  return to_ret
}

function variablesWithPrefix(prefix, properties, suffix, commentStyle) {
  return properties
    .map((prop) => {
      let to_ret_prop = `${prefix + prop.name}: ${
        prop.attributes.category === 'asset'
          ? `"${prop.value} ${suffix}"`
          : `${prop.value} ${suffix}`
      };`

      if (prop.comment) {
        if (commentStyle === 'short') {
          to_ret_prop = to_ret_prop.concat(` // ${prop.comment}`)
        } else {
          to_ret_prop = to_ret_prop.concat(` /* ${prop.comment} */`)
        }
      }

      return to_ret_prop
    })
    .filter((strVal) => {
      return !!strVal
    })
    .join('\n')
}

function isColor(prop) {
  return prop.attributes.category === 'color'
}

function prepareStyleDictionary() {
  StyleDictionary.registerTransformGroup({
    name: 'docs',
    transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem', 'color/css'],
  })

  StyleDictionary.registerFormat({
    name: 'scss/variables/default',
    formatter(dictionary) {
      return (
        fileHeader(this.options, 'short') +
        variablesWithPrefix('$', dictionary.allProperties, '!default', 'short')
      )
    },
  })

  // Since we are making a separate color palette file for sass,
  // we want to filter those out
  StyleDictionary.registerFilter({
    name: 'isColor',
    matcher(prop) {
      return isColor(prop)
    },
  })

  StyleDictionary.registerFilter({
    name: 'isNotColor',
    matcher(prop) {
      return !isColor(prop)
    },
  })

  StyleDictionary.registerTransform({
    name: 'color/css-capitalized',
    type: 'value',
    matcher: isColor,
    transformer: (prop) => {
      const color = Color(prop.value)

      if (color.getAlpha() === 1) {
        return color.toHexString().toUpperCase()
      } else {
        return color.toRgbString()
      }
    },
  })

  StyleDictionary.registerTransformGroup({
    name: 'scss-capitalized',
    transforms: [
      'attribute/cti',
      'name/cti/kebab',
      'time/seconds',
      'content/icon',
      'size/rem',
      'color/css-capitalized',
    ],
  })

  return StyleDictionary
}

module.exports = {
  prepareStyleDictionary,
}
