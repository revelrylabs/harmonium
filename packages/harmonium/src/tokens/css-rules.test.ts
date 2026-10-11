/**
 * Guards for component CSS and the color tokens:
 * - components use semantic color tokens, never the raw gray scale (dark mode)
 * - every transition/animation has a prefers-reduced-motion override
 * - focus styles stay visible in forced-colors mode (no `outline: none`)
 * - @keyframes names are namespaced `hm-`
 * - text/surface token pairs meet WCAG AA (4.5:1) in light and the README dark set
 */
import {readFileSync, readdirSync} from 'node:fs'
import {resolve} from 'node:path'

const componentsDir = resolve(import.meta.dirname, '../components') + '/'
const tokensDir = resolve(import.meta.dirname, '../../../../design-tokens') + '/'
const readmePath = resolve(import.meta.dirname, '../../../../README.md')

const cssFiles = readdirSync(componentsDir, {withFileTypes: true})
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    readdirSync(`${componentsDir}${d.name}`)
      .filter((f) => f.endsWith('.module.css'))
      .map((f) => {
        const path = `${d.name}/${f}`
        return {path, css: readFileSync(`${componentsDir}${path}`, 'utf8')}
      }),
  )

interface Rule {
  selectors: string[]
  body: string
  media: string | null
}

/** Rules at the top level and one level inside @media/@supports blocks. */
function parseRules(source: string): Rule[] {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, '')
  const rules: Rule[] = []
  const walk = (text: string, media: string | null) => {
    let depth = 0
    let start = 0
    let open = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '{') {
        if (depth === 0) open = i
        depth++
      } else if (text[i] === '}') {
        depth--
        if (depth === 0) {
          const prelude = text.slice(start, open).trim()
          const body = text.slice(open + 1, i)
          if (prelude.startsWith('@media') || prelude.startsWith('@supports')) {
            walk(body, prelude)
          } else if (!prelude.startsWith('@')) {
            rules.push({selectors: prelude.split(',').map((s) => s.trim()), body, media})
          }
          start = i + 1
        }
      }
    }
  }
  walk(css, null)
  return rules
}

const declaration = (body: string, prop: string) =>
  body.match(new RegExp(`(?:^|[;{\\s])${prop}\\s*:\\s*([^;]+)`))?.[1].trim()

describe('component CSS', () => {
  it.each(cssFiles)('$path uses semantic color tokens, not the gray scale', ({css}) => {
    expect(css.match(/--harmonium-color-gray-[\w-]+/g) ?? []).toEqual([])
  })

  it.each(cssFiles)('$path names its @keyframes with an hm- prefix', ({css}) => {
    for (const [, name] of css.matchAll(/@keyframes\s+([\w-]+)/g)) {
      expect(name).toMatch(/^hm-/)
    }
  })

  it.each(cssFiles)('$path turns motion down under prefers-reduced-motion', ({css}) => {
    const rules = parseRules(css)
    const reduced = rules.filter((r) => r.media?.includes('prefers-reduced-motion: reduce'))
    const covered = (selector: string, prop: 'transition' | 'animation') =>
      reduced.some(
        (r) =>
          r.selectors.includes(selector) &&
          (declaration(r.body, prop) !== undefined || declaration(r.body, `${prop}-duration`) !== undefined),
      )
    for (const rule of rules.filter((r) => !r.media?.includes('prefers-reduced-motion'))) {
      for (const prop of ['transition', 'animation'] as const) {
        const value = declaration(rule.body, prop)
        if (value === undefined || value === 'none') continue
        for (const selector of rule.selectors) {
          expect(covered(selector, prop), `${selector} { ${prop}: ${value} }`).toBe(true)
        }
      }
    }
  })

  it.each(cssFiles)('$path keeps focus indicators visible in forced-colors mode', ({css}) => {
    const focusRules = parseRules(css).filter((r) => r.selectors.some((s) => /:focus/.test(s)))
    const fileHasFocusOutline = focusRules.some((r) => declaration(r.body, 'outline') !== undefined)
    for (const rule of focusRules) {
      const outline = declaration(rule.body, 'outline')
      expect(outline, rule.selectors.join(', ')).not.toBe('none')
      expect(outline, rule.selectors.join(', ')).not.toBe('0')
      // A box-shadow-only ring vanishes in forced colors: pair it with an outline
      // (here, or in the base :focus rule a state variant like [aria-invalid] builds on).
      if (declaration(rule.body, 'box-shadow') !== undefined) {
        expect(outline ?? fileHasFocusOutline, rule.selectors.join(', ')).toBeTruthy()
      }
    }
  })
})

/* ---- Contrast ---- */

type Tokens = Record<string, string>

function readTokens(): Tokens {
  const flat: Record<string, string> = {}
  const visit = (node: Record<string, unknown>, path: string[]) => {
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$') || !value || typeof value !== 'object') continue
      const child = value as Record<string, unknown>
      if ('$value' in child) flat[[...path, key].join('.')] = String(child.$value)
      else visit(child, [...path, key])
    }
  }
  for (const file of ['color/base.json', 'color/brand.json', 'color/semantic.json']) {
    visit(JSON.parse(readFileSync(`${tokensDir}${file}`, 'utf8')), [])
  }
  const resolve = (value: string): string => {
    const ref = value.match(/^\{(.+)\}$/)
    return ref ? resolve(flat[ref[1]]) : value
  }
  const out: Tokens = {}
  for (const [key, value] of Object.entries(flat)) {
    if (key.startsWith('color.')) out[key.slice('color.'.length)] = resolve(value).toLowerCase()
  }
  return out
}

function readDarkTokens(): Tokens {
  const readme = readFileSync(readmePath, 'utf8')
  const block = readme.match(/\[data-theme="dark"\]\s*\{([^}]*)\}/)
  if (!block) throw new Error('README has no [data-theme="dark"] block')
  const out: Tokens = {}
  for (const [, name, value] of block[1].matchAll(/--harmonium-color-([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    out[name] = value.toLowerCase()
  }
  return out
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Text tokens and the surfaces components put them on. */
const textPairs: [string, string[]][] = [
  ['text', ['bg', 'surface', 'surface-raised', 'surface-muted', 'surface-hover', 'surface-active', 'surface-neutral']],
  ['text-muted', ['bg', 'surface', 'surface-raised', 'surface-muted', 'surface-hover', 'surface-neutral']],
  ['text-placeholder', ['surface', 'surface-raised']],
  ['text-inverse', ['surface-inverse']],
]

const light = readTokens()
const dark = readDarkTokens()

/** Semantic tokens a dark theme has to set: everything but brand, status and on-* colors. */
const themeable = Object.keys(light).filter((name) => /^(bg|text|surface|border|disabled)/.test(name))

describe('color tokens', () => {
  it('README dark-mode block sets every surface, text and border token', () => {
    expect(themeable.filter((name) => !(name in dark))).toEqual([])
  })

  for (const [theme, tokens] of [
    ['light', light],
    ['dark', {...light, ...dark}],
  ] as const) {
    for (const [fg, bgs] of textPairs) {
      for (const bg of bgs) {
        it(`${theme}: ${fg} on ${bg} meets WCAG AA (4.5:1)`, () => {
          expect(contrast(tokens[fg], tokens[bg])).toBeGreaterThanOrEqual(4.5)
        })
      }
    }
  }
})
