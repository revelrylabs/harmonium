import StyleDictionary from 'style-dictionary'
import Color from 'tinycolor2'

interface FormatOptions {
  showFileHeader?: boolean
}

interface Property {
  name: string
  value: string
  comment?: string
  attributes: {
    category: string
    [key: string]: any
  }
}

// This interface is used in the code as a type annotation for function parameters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Dictionary {
  allProperties: Property[]
}

/**
 * Generates a file header comment block
 */
function fileHeader(options?: FormatOptions, commentStyle?: string): string {
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

/**
 * Generates CSS/SCSS variables with a prefix and suffix
 */
function variablesWithPrefix(
  prefix: string,
  properties: Property[],
  suffix: string,
  commentStyle?: string
): string {
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

/**
 * Checks if a property is a color
 */
function isColor(prop: Property): boolean {
  return prop.attributes.category === 'color'
}

/**
 * Prepares the StyleDictionary with custom transformations
 */
export function prepareStyleDictionary() {
  StyleDictionary.registerTransformGroup({
    name: 'docs',
    transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem', 'color/css'],
  })

  StyleDictionary.registerFormat({
    name: 'scss/variables/default',
    formatter: function(this: { options?: FormatOptions }, dictionary: any) {
      return (
        fileHeader(this.options, 'short') +
        variablesWithPrefix('$', dictionary.allProperties, '!default', 'short')
      )
    } as any,
  })

  // Since we are making a separate color palette file for sass,
  // we want to filter those out
  StyleDictionary.registerFilter({
    name: 'isColor',
    matcher: function(prop: any) {
      return isColor(prop)
    } as any,
  })

  StyleDictionary.registerFilter({
    name: 'isNotColor',
    matcher: function(prop: any) {
      return !isColor(prop)
    } as any,
  })

  StyleDictionary.registerTransform({
    name: 'color/css-capitalized',
    type: 'value',
    matcher: isColor as any,
    transformer: function(prop: any) {
      const color = Color(prop.value)

      if (color.getAlpha() === 1) {
        return color.toHexString().toUpperCase()
      } else {
        return color.toRgbString()
      }
    } as any,
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