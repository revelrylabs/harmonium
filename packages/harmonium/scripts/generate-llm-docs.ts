/**
 * Generate the LLM docs from the source, so they can't drift from it.
 *
 *   pnpm --filter harmonium run docs:llms           # write the files
 *   pnpm --filter harmonium run docs:llms --check   # fail if any is stale (CI)
 *
 * Reads every export of src/index.ts with the TypeScript compiler: JSDoc
 * descriptions, `@example`, `@category` and `@default` tags, props with their
 * types and defaults (from the component's destructuring), plus the plain-HTML
 * `hm-*` classes and `data-*` attributes of each component folder. That goes
 * into components.json, which everything else is rendered from:
 *
 * - llms.txt, llms-full.txt (repo root; served from the docs site and copied
 *   into the npm package on pack)
 * - packages/harmonium/AGENTS.md
 * - the component table in README.md and the count in Introduction.mdx
 *
 * Hand-written prose lives in scripts/llm-docs/*.md.
 */
import {readFileSync, writeFileSync, readdirSync, existsSync} from 'fs'
import {join, relative, sep} from 'path'
import ts from 'typescript'
import {toKebab, protect, extractClassNames, globalClassName} from './css-classes'

const PKG = join(import.meta.dirname, '..')
const ROOT = join(PKG, '..', '..')
const SRC = join(PKG, 'src')
const PARTIALS = join(import.meta.dirname, 'llm-docs')
const DOCS_URL = 'https://revelrylabs.github.io/harmonium/'
const REPO_URL = 'https://github.com/revelrylabs/harmonium'

// README and Storybook order; a @category outside this list is an error.
const CATEGORIES = [
  'Layout',
  'Typography',
  'Forms',
  'Actions',
  'Display',
  'Navigation',
  'Data',
  'Overlays',
  'Feedback',
  'Wizard',
  'Marketing',
]

interface Prop {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

interface Entry {
  name: string
  kind: 'component' | 'hook' | 'function' | 'constant' | 'type'
  description: string
  category?: string
  examples: string[]
  /** HTML attributes / external props the component also accepts. */
  extends: string[]
  props: Prop[]
  /** Signature for hooks and functions, type text for types and constants. */
  signature?: string
}

interface Family {
  /** Folder name: Card, Typography, Toast. */
  name: string
  import: string
  category?: string
  entries: Entry[]
  /** Plain-HTML classes from harmonium.css. */
  classes: string[]
  dataAttributes: string[]
}

const problems: string[] = []

// --- Read the source ---------------------------------------------------------

const program = ts.createProgram([join(SRC, 'index.ts')], {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  strict: true,
  skipLibCheck: true,
})
const checker = program.getTypeChecker()
const indexFile = program.getSourceFile(join(SRC, 'index.ts'))!
const moduleSymbol = checker.getSymbolAtLocation(indexFile)!

const isOwn = (file: string) => !relative(SRC, file).startsWith('..') && !file.includes('node_modules')
const clean = (text: string) =>
  text
    .replace(/\s+/g, ' ')
    .replace(/<\s+/g, '<')
    .replace(/,?\s+>/g, '>')
    .trim()
/** JSDoc text, with hard-wrapped lines joined (blank lines still separate paragraphs). */
const docText = (symbol: ts.Symbol) =>
  ts
    .displayPartsToString(symbol.getDocumentationComment(checker))
    .trim()
    .replace(/([^\n])\n(?!\n)/g, '$1 ')
const tags = (symbol: ts.Symbol, name: string) =>
  symbol
    .getJsDocTags(checker)
    .filter((t) => t.name === name)
    .map((t) => ts.displayPartsToString(t.text).trim())

/** Example tags keep their own fences; bare code gets a tsx fence. */
const example = (text: string) => (text.startsWith('```') ? text : '```tsx\n' + text + '\n```')

/** `{size = 'md', ...}` in the component's parameter list -> {size: "'md'"}. */
function destructuredDefaults(decl: ts.Declaration): Record<string, string> {
  const unwrap = (e: ts.Expression): ts.Expression =>
    ts.isAsExpression(e) || ts.isParenthesizedExpression(e) || ts.isSatisfiesExpression(e) ? unwrap(e.expression) : e
  let fn: ts.Node | undefined
  if (ts.isFunctionDeclaration(decl)) fn = decl
  else if (ts.isVariableDeclaration(decl) && decl.initializer) {
    // forwardRef(memo(fn)), forwardRef(fn) as ..., or forwardRef(namedFunction)
    let init = unwrap(decl.initializer)
    while (ts.isCallExpression(init) && init.arguments.length) init = unwrap(init.arguments[0])
    fn = ts.isIdentifier(init) ? checker.getSymbolAtLocation(init)?.declarations?.[0] : init
  }
  if (!fn || !(ts.isArrowFunction(fn) || ts.isFunctionExpression(fn) || ts.isFunctionDeclaration(fn))) return {}
  const param = fn.parameters[0]
  if (!param || !ts.isObjectBindingPattern(param.name)) return {}
  const defaults: Record<string, string> = {}
  for (const el of param.name.elements) {
    if (!el.initializer) continue
    const key = (el.propertyName ?? el.name).getText()
    defaults[key] = clean(el.initializer.getText())
  }
  return defaults
}

/** The external types a props type builds on: `React.ButtonHTMLAttributes<HTMLButtonElement>`. */
function externalBases(propsType: ts.Type): string[] {
  if (propsType.isIntersection()) return propsType.types.flatMap(externalBases)
  const decl = (propsType.aliasSymbol ?? propsType.getSymbol())?.declarations?.[0]
  if (!decl) return []
  // Props typed directly as React.HTMLAttributes<...>
  if (!isOwn(decl.getSourceFile().fileName)) {
    const text = checker.typeToString(propsType)
    return /^RefAttributes</.test(text) ? [] : [text]
  }
  let parts: ts.TypeNode[] = []
  if (ts.isInterfaceDeclaration(decl)) {
    parts = (decl.heritageClauses ?? []).flatMap((h) => [...h.types])
  } else if (ts.isTypeAliasDeclaration(decl)) {
    parts = ts.isIntersectionTypeNode(decl.type) ? [...decl.type.types] : [decl.type]
  }
  return parts
    .filter((node) => {
      if (ts.isTypeLiteralNode(node)) return false
      const name = ts.isTypeReferenceNode(node)
        ? node.typeName
        : ts.isExpressionWithTypeArguments(node)
          ? node.expression
          : undefined
      if (!name) return true
      let symbol = checker.getSymbolAtLocation(name)
      if (symbol && symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol)
      const d = symbol?.declarations?.[0]
      // Our own base types (CardSectionProps) are flattened into the props instead.
      return !d || !isOwn(d.getSourceFile().fileName)
    })
    .map((node) => clean(node.getText()))
    .filter((text) => !/^(React\.)?RefAttributes</.test(text))
}

function propsOf(propsType: ts.Type, defaults: Record<string, string>, owner: string, isComponent: boolean): Prop[] {
  return checker
    .getPropertiesOfType(propsType)
    // `ref` and `key` are React's, not the component's own props.
    .filter((p) => !(isComponent && (p.name === 'ref' || p.name === 'key')) && !tags(p, 'internal').length)
    .filter((p) => p.declarations?.some((d) => isOwn(d.getSourceFile().fileName)))
    .map((p) => {
      const decl = p.declarations!.find((d) => isOwn(d.getSourceFile().fileName))!
      const typeNode = (decl as ts.PropertySignature).type
      const description = docText(p)
      if (!description) problems.push(`${owner}.${p.name} has no JSDoc description`)
      return {
        name: p.name,
        type: typeNode ? clean(typeNode.getText()) : checker.typeToString(checker.getTypeOfSymbol(p)),
        required: !(p.flags & ts.SymbolFlags.Optional),
        default: tags(p, 'default')[0] ?? defaults[p.name],
        description,
      }
    })
}

function familyOf(file: string): string {
  const rel = relative(SRC, file).split(sep)
  // tokens/breakpoints.ts and utils/responsive.ts: the responsive-prop helpers
  return rel[0] === 'components' ? rel[1] : 'Responsive values'
}

const families = new Map<string, Family>()

for (const exported of checker.getExportsOfModule(moduleSymbol)) {
  const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported
  const decl = symbol.declarations?.[0]
  if (!decl) continue
  const name = exported.getName()
  const familyName = familyOf(decl.getSourceFile().fileName)
  if (!families.has(familyName)) {
    const isComponentDir = existsSync(join(SRC, 'components', familyName))
    families.set(familyName, {
      name: familyName,
      import: isComponentDir ? `harmonium/${toKebab(familyName)}` : 'harmonium',
      entries: [],
      classes: [],
      dataAttributes: [],
    })
  }
  const family = families.get(familyName)!
  const description = docText(symbol)
  const entry: Entry = {
    name,
    kind: 'constant',
    description,
    category: tags(symbol, 'category')[0],
    examples: tags(symbol, 'example').map(example),
    extends: [],
    props: [],
  }

  const isType = !(symbol.flags & ts.SymbolFlags.Value)
  if (isType) {
    // Props types are documented with their component.
    if (name.endsWith('Props')) continue
    entry.kind = 'type'
    const type = checker.getDeclaredTypeOfSymbol(symbol)
    const isObject = ts.isInterfaceDeclaration(decl) || (ts.isTypeAliasDeclaration(decl) && ts.isTypeLiteralNode(decl.type))
    if (isObject) entry.props = propsOf(type, {}, name, false)
    else {
      const alias = decl as ts.TypeAliasDeclaration
      const params = alias.typeParameters ? `<${alias.typeParameters.map((t) => t.getText()).join(', ')}>` : ''
      entry.signature = `type ${name}${params} = ${clean(alias.type.getText()).replace(/^\| /, '')}`
    }
  } else {
    const type = checker.getTypeOfSymbol(symbol)
    const call = type.getCallSignatures()[0]
    if (call && /^[A-Z]/.test(name)) {
      entry.kind = 'component'
      const propsParam = call.getParameters()[0]
      if (propsParam) {
        const propsType = checker.getTypeOfSymbol(propsParam)
        entry.props = propsOf(propsType, destructuredDefaults(decl), name, true)
        entry.extends = externalBases(propsType)
      }
    } else if (call) {
      entry.kind = name.startsWith('use') ? 'hook' : 'function'
      entry.signature = `${name}${checker.signatureToString(call)}`
    } else {
      entry.signature = clean(checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation))
    }
    if (!description) problems.push(`${name} has no JSDoc description`)
  }

  if (entry.category) {
    if (!CATEGORIES.includes(entry.category)) problems.push(`${name}: unknown @category ${entry.category}`)
    family.category ??= entry.category
  }
  family.entries.push(entry)
}

for (const family of families.values()) {
  const dir = join(SRC, 'components', family.name)
  if (!existsSync(dir)) continue
  if (!family.category) problems.push(`${family.name}: no export has a @category tag`)
  for (const file of readdirSync(dir)) {
    if (file.endsWith('.module.css')) {
      const {masked} = protect(readFileSync(join(dir, file), 'utf8'))
      const kebab = toKebab(family.name)
      family.classes.push(...extractClassNames(masked).map((cls) => globalClassName(kebab, cls)))
    } else if (/\.tsx$/.test(file) && !file.includes('.test.')) {
      const found = readFileSync(join(dir, file), 'utf8').match(/\bdata-[a-z-]+(?==)/g) ?? []
      family.dataAttributes.push(...found)
    }
  }
  family.classes = [...new Set(family.classes)].sort()
  family.dataAttributes = [...new Set(family.dataAttributes)].sort()
}

const pkg = JSON.parse(readFileSync(join(PKG, 'package.json'), 'utf8'))
const ordered = [...families.values()].sort(
  (a, b) => (a.category ? CATEGORIES.indexOf(a.category) : 99) - (b.category ? CATEGORIES.indexOf(b.category) : 99),
)
const manifest = {
  $comment: 'Generated by scripts/generate-llm-docs.ts from the source JSDoc. Do not edit.',
  name: pkg.name,
  version: pkg.version,
  docs: DOCS_URL,
  families: ordered,
}

// --- Render ------------------------------------------------------------------

const components = ordered.flatMap((f) => f.entries.filter((e) => e.kind === 'component'))
/** What the README lists as a component: the ones with a @category (Card, not CardBody). */
const listed = ordered.flatMap((f) => f.entries.filter((e) => e.category && e.kind === 'component'))
const listedNames = (category: string) =>
  ordered
    .flatMap((f) => f.entries)
    .filter((e) => e.category === category)
    .map((e) => e.name)
const usedCategories = CATEGORIES.filter((c) => listedNames(c).length)
const firstSentence = (text: string) => (text.match(/^[\s\S]*?\.(?=\s|$)/)?.[0] ?? text).replace(/\s+/g, ' ')
const partial = (name: string) => readFileSync(join(PARTIALS, name), 'utf8').trim()
const header = '<!-- Generated by packages/harmonium/scripts/generate-llm-docs.ts from the source. Do not edit. -->'

function propLine(p: Prop): string {
  const def = p.default !== undefined ? ` (default: \`${p.default}\`)` : ''
  const req = p.required ? ' **required**' : ''
  return `- \`${p.name}\`: \`${p.type}\`${req}${def}. ${p.description}`.replace(/\.\. /, '. ').trimEnd()
}

/** `<Button variant="primary|secondary" size="sm|md|lg" expanded>` */
function usage(e: Entry): string {
  const attrs = e.props.filter((p) => p.name !== 'children').map((p) => {
    // ResponsiveValue<'a' | 'b'> reads like 'a' | 'b' here; llms-full.txt has the full type.
    const type = p.type.replace(/^ResponsiveValue<(.*)>$/, '$1')
    const literals = type.split('|').map((s) => s.trim())
    if (literals.every((s) => /^'[^']*'$/.test(s))) return `${p.name}="${literals.map((s) => s.slice(1, -1)).join('|')}"`
    if (type === 'boolean') return p.name
    return `${p.name}={…}`
  })
  return `<${[e.name, ...attrs].join(' ')}>`
}

function familyTitle(f: Family) {
  const main = f.entries.filter((e) => e.category).map((e) => e.name)
  return main.length ? main.join(' + ') : f.name
}

function renderEntry(e: Entry): string {
  const out = [`### ${e.name}`]
  if (e.description) out.push('', e.description)
  if (e.signature) out.push('', '```ts\n' + e.signature + '\n```')
  if (e.props.length) {
    out.push('', e.kind === 'type' ? 'Fields:' : 'Props:', '', ...e.props.map(propLine))
  }
  if (e.extends.length) out.push('', `Also accepts the props of ${e.extends.map((x) => `\`${x}\``).join(', ')}.`)
  for (const ex of e.examples) out.push('', ex)
  return out.join('\n')
}

function renderFamily(f: Family): string {
  const values = f.entries.filter((e) => e.kind !== 'type').map((e) => e.name)
  const out = [`## ${familyTitle(f)}`, '']
  const alsoRoot = f.import === 'harmonium' ? '' : " (or from `'harmonium'`)"
  if (values.length) out.push(`\`import {${values.join(', ')}} from '${f.import}'\`${alsoRoot}`)
  if (f.classes.length) out.push('', `Plain HTML classes: ${f.classes.map((c) => `\`${c}\``).join(', ')}`)
  if (f.dataAttributes.length) out.push('', `Data attributes: ${f.dataAttributes.map((c) => `\`${c}\``).join(', ')}`)
  for (const e of f.entries) out.push('', renderEntry(e))
  return out.join('\n')
}

const intro = `Harmonium is a React design system: typed components on Base UI primitives, themed with CSS custom properties, with accessible defaults. Version ${pkg.version}.`

const llmsTxt = [
  '# Harmonium',
  '',
  `> ${pkg.description}`,
  '',
  intro,
  '',
  '## Docs',
  '',
  `- [Full API reference](${DOCS_URL}llms-full.txt): props, types, defaults and examples for every component. Also in the npm package at \`node_modules/harmonium/llms-full.txt\`, matching the installed version.`,
  `- [Storybook](${DOCS_URL}): interactive docs`,
  `- [GitHub](${REPO_URL}): source and issues`,
  '',
  '## Quick start',
  '',
  '- Install: `npm install harmonium@next` (v9 is in pre-release; `npm install harmonium` installs v8)',
  "- Import: `import {Button} from 'harmonium'` or `import {Button} from 'harmonium/button'`",
  "- Styles: `import 'harmonium/styles.css'` once in your app entry",
  '- Theme: override `--harmonium-*` CSS custom properties',
  '',
  '## Components',
  ...usedCategories.flatMap((c) => [
    '',
    `### ${c}`,
    ...ordered
      .filter((f) => f.category === c)
      .flatMap((f) => {
        const parts = f.entries.filter((e) => e.kind !== 'type' && !e.category).map((e) => e.name)
        return f.entries
          .filter((e) => e.category)
          .map((e, i) => {
            const also = i === 0 && parts.length ? ` With ${parts.join(', ')}.` : ''
            return `- ${e.name} (\`${f.import}\`): ${firstSentence(e.description)}${also}`
          })
      }),
  ]),
  '',
].join('\n')

const llmsFullTxt = [
  '# Harmonium: complete API reference',
  '',
  intro,
  '',
  partial('guide.md'),
  '',
  ...ordered.flatMap((f) => ['---', '', renderFamily(f), '']),
  '---',
  '',
  partial('patterns.md'),
  '',
].join('\n')

const agentsMd = [
  header,
  '',
  '# Harmonium: AI context',
  '',
  'Read this before writing Harmonium code. The full reference, with every prop, type and default, is `node_modules/harmonium/llms-full.txt` (it matches the installed version).',
  '',
  partial('guide.md'),
  '',
  '## Components',
  '',
  'Main props of each component, and how compound components fit together. Every prop, with its type and default, is in `llms-full.txt`.',
  ...usedCategories.flatMap((c) => [
    '',
    `### ${c}`,
    '',
    ...ordered
      .filter((f) => f.category === c)
      .flatMap((f) => {
        // Compound families (Card + CardBody, ToastProvider + useToast) get an example.
        const compound = f.entries.filter((e) => e.kind !== 'type').length > 1
        return f.entries
          .filter((e) => e.category)
          .flatMap((e) => {
            const line = `- \`${e.kind === 'component' ? usage(e) : e.name}\`: ${firstSentence(e.description)}`
            return compound && e.examples[0] ? [line, '', e.examples[0], ''] : [line]
          })
      }),
  ]),
  '',
].join('\n')

const readmeTable = [
  `${listed.length} components across ${usedCategories.length} categories:`,
  '',
  '| Category | Components |',
  '|----------|------------|',
  ...usedCategories.map((c) => `| **${c}** | ${listedNames(c).join(', ')} |`),
].join('\n')

const introRows = usedCategories
  .map((c) => `    <tr>\n      <th>${c}</th>\n      <td>${listedNames(c).join(', ')}</td>\n    </tr>`)
  .join('\n')

/** Collapse runs of blank lines left between sections. */
const tidy = (text: string) => text.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n'

/** Replace the text between `start` and `end` markers in a hand-written file. */
function region(text: string, file: string, start: string, end: string, content: string): string {
  const i = text.indexOf(start)
  const j = text.indexOf(end, i)
  if (i < 0 || j < 0) {
    problems.push(`${file}: missing ${start} / ${end} markers`)
    return text
  }
  // Keep the end marker's indentation.
  const lineStart = text.lastIndexOf('\n', j) + 1
  return text.slice(0, i + start.length) + '\n' + content + '\n' + text.slice(lineStart)
}

const readmePath = join(ROOT, 'README.md')
const introPath = join(PKG, '..', 'docs', 'stories', 'Introduction.mdx')
let readme = readFileSync(readmePath, 'utf8')
readme = region(readme, 'README.md', '<!-- generated:components -->', '<!-- /generated:components -->', readmeTable)
let introMdx = readFileSync(introPath, 'utf8')
introMdx = region(
  introMdx,
  'Introduction.mdx',
  '{/* generated:component-count */}',
  '{/* /generated:component-count */}',
  `    <span className="number">${listed.length}</span>`,
)
introMdx = region(introMdx, 'Introduction.mdx', '{/* generated:components */}', '{/* /generated:components */}', introRows)

const outputs: Record<string, string> = {
  [join(PKG, 'components.json')]: JSON.stringify(manifest, null, 2) + '\n',
  [join(ROOT, 'llms.txt')]: tidy(llmsTxt),
  [join(ROOT, 'llms-full.txt')]: tidy(llmsFullTxt),
  [join(PKG, 'AGENTS.md')]: tidy(agentsMd),
  [readmePath]: readme,
  [introPath]: introMdx,
}

if (problems.length) {
  console.error(`Missing or invalid docs:\n- ${problems.join('\n- ')}`)
  process.exit(1)
}

const check = process.argv.includes('--check')
const stale: string[] = []
for (const [file, content] of Object.entries(outputs)) {
  const current = existsSync(file) ? readFileSync(file, 'utf8') : ''
  if (current === content) continue
  if (check) stale.push(relative(ROOT, file))
  else writeFileSync(file, content)
}

if (stale.length) {
  console.error(
    `Generated docs are out of date:\n- ${stale.join('\n- ')}\nRun \`pnpm --filter harmonium run docs:llms\` and commit the result.`,
  )
  process.exit(1)
}
console.log(
  `${check ? 'Checked' : 'Wrote'} LLM docs: ${components.length} components (${listed.length} listed) in ${families.size} entries.`,
)
