/**
 * Build a framework-agnostic global CSS file from CSS Modules.
 *
 * Reads each component's .module.css file, replaces scoped class names
 * with namespaced global classes (e.g., .root → .hm-button), and outputs
 * a single concatenated CSS file at dist/harmonium.css.
 */
import {readFileSync, writeFileSync, readdirSync, existsSync} from 'fs'
import {join, basename} from 'path'

const SRC = join(import.meta.dirname, '..', 'src', 'components')
const TOKENS = join(import.meta.dirname, '..', 'src', 'tokens', 'tokens.css')
const OUT = join(import.meta.dirname, '..', 'dist', 'harmonium.css')

function toKebab(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Extract all class names from a CSS file (e.g., .root, .header, .body)
 */
function extractClassNames(css: string): string[] {
  const names = new Set<string>()
  const re = /\.([a-zA-Z][a-zA-Z0-9]*)/g
  let match
  while ((match = re.exec(css)) !== null) {
    names.add(match[1])
  }
  return Array.from(names)
}

/**
 * Replace class names in CSS content with namespaced versions.
 * .root → .hm-{component}
 * .{sub} → .hm-{component}-{sub}
 */
function renameClasses(
  css: string,
  componentName: string,
  classNames: string[],
): string {
  const prefix = `hm-${componentName}`
  let result = css

  // Sort by length descending to avoid partial replacements
  const sorted = [...classNames].sort((a, b) => b.length - a.length)

  for (const cls of sorted) {
    const globalName = cls === 'root' ? prefix : `${prefix}-${toKebab(cls)}`
    // Replace .className when followed by a non-alphanumeric char (selector boundary)
    const re = new RegExp(`\\.${cls}(?=[^a-zA-Z0-9_-])`, 'g')
    result = result.replace(re, `.${globalName}`)
  }

  return result
}

// Collect all component CSS
const components = readdirSync(SRC, {withFileTypes: true})
  .filter((d) => d.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name))

const sections: string[] = []

// Prepend tokens
if (existsSync(TOKENS)) {
  sections.push(`/* === Design Tokens === */\n${readFileSync(TOKENS, 'utf8')}`)
}

for (const dir of components) {
  const cssFile = join(SRC, dir.name, `${dir.name}.module.css`)
  if (!existsSync(cssFile)) continue

  const css = readFileSync(cssFile, 'utf8')
  const classNames = extractClassNames(css)
  const kebabName = toKebab(dir.name)
  const renamed = renameClasses(css, kebabName, classNames)

  sections.push(`/* === ${dir.name} === */\n${renamed}`)
}

const output = sections.join('\n\n')
writeFileSync(OUT, output, 'utf8')

const sizeKB = (Buffer.byteLength(output) / 1024).toFixed(1)
console.log(`Built dist/harmonium.css (${sizeKB} KB, ${components.length} components)`)
