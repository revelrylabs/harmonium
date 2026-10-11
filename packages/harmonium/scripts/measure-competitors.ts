/**
 * Measure the libraries in the README comparison table the same way
 * check-size.ts measures Harmonium, so the table's numbers are comparable and
 * reproducible. Not run in CI: it installs the pinned versions below into a
 * temporary directory (needs network) and prints a Markdown table.
 *
 *   pnpm build && pnpm --filter harmonium run size:competitors
 *
 * Each "Button" case is the least an app imports to render one styled button,
 * including any provider the library requires. Each "all" case is
 * `export *` from the package, i.e. every component. CSS is the stylesheet
 * the library tells you to import, for libraries that ship one; MUI and
 * Chakra generate CSS at runtime instead (their JS numbers include the
 * Emotion runtime that does it). shadcn/ui isn't measured: it copies source
 * into your app, so its size depends on what you copy.
 *
 * When you update a version, re-run this and update the tables in README.md
 * and packages/docs/stories/Introduction.mdx, including the date.
 */
import {execFileSync} from 'child_process'
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'fs'
import {createRequire} from 'module'
import {tmpdir} from 'os'
import {join} from 'path'
import {gzipSync} from 'zlib'
import {bundleApp} from './size-utils'

const ROOT = join(import.meta.dirname, '..')
const KB = 1024

const PACKAGES: Record<string, string> = {
  '@mui/material': '9.5.0',
  '@emotion/react': '11.14.0',
  '@emotion/styled': '11.14.1',
  '@chakra-ui/react': '3.37.0',
  '@mantine/core': '9.7.2',
  '@mantine/hooks': '9.7.2',
  '@radix-ui/themes': '3.3.0',
  react: '19.2.0',
  'react-dom': '19.2.0',
}

interface Library {
  name: string
  version: string
  button: string
  all: string
  css?: string
}

const LIBRARIES: Library[] = [
  {
    name: 'MUI',
    version: '@mui/material',
    button: "export {Button} from '@mui/material'",
    all: "export * from '@mui/material'",
  },
  {
    name: 'Chakra UI',
    version: '@chakra-ui/react',
    button: "export {Button, ChakraProvider, defaultSystem} from '@chakra-ui/react'",
    all: "export * from '@chakra-ui/react'",
  },
  {
    name: 'Mantine',
    version: '@mantine/core',
    button: "export {Button, MantineProvider} from '@mantine/core'",
    all: "export * from '@mantine/core'",
    css: '@mantine/core/styles.css',
  },
  {
    name: 'Radix Themes',
    version: '@radix-ui/themes',
    button: "export {Button, Theme} from '@radix-ui/themes'",
    all: "export * from '@radix-ui/themes'",
    css: '@radix-ui/themes/styles.css',
  },
]

const kb = (bytes: number) => `${(bytes / KB).toFixed(1)} KB`
const gzip = (buf: Buffer) => gzipSync(buf, {level: 9}).length

const dir = mkdtempSync(join(tmpdir(), 'harmonium-competitors-'))
try {
  writeFileSync(join(dir, 'package.json'), JSON.stringify({private: true, dependencies: PACKAGES}))
  execFileSync('npm', ['install', '--no-audit', '--no-fund', '--loglevel=error'], {cwd: dir, stdio: 'inherit'})
  const require = createRequire(join(dir, 'package.json'))
  // Not require.resolve: some packages don't export ./package.json.
  const versionOf = (pkg: string) =>
    JSON.parse(readFileSync(join(dir, 'node_modules', pkg, 'package.json'), 'utf8')).version

  const rows = ['| Library | Version | Button (JS, gzip) | All components (JS, gzip) | CSS (gzip) |', '| --- | --- | --: | --: | --: |']
  for (const lib of LIBRARIES) {
    const button = gzip((await bundleApp(lib.button, dir)).output)
    const all = gzip((await bundleApp(lib.all, dir)).output)
    const css = lib.css ? kb(gzip(readFileSync(require.resolve(lib.css)))) : 'runtime'
    rows.push(`| ${lib.name} | ${versionOf(lib.version)} | ${kb(button)} | ${kb(all)} | ${css} |`)
  }

  // Harmonium from this checkout's dist/, for the same table.
  const hButton = gzip((await bundleApp("export {Button} from 'harmonium'", ROOT)).output)
  const hAll = gzip((await bundleApp("export * from 'harmonium'", ROOT)).output)
  const hCss = gzip(readFileSync(join(ROOT, 'dist', 'index.css')))
  const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version
  rows.push(`| Harmonium | ${version} | ${kb(hButton)} | ${kb(hAll)} | ${kb(hCss)} |`)

  console.log(`Measured ${new Date().toISOString().slice(0, 10)}\n`)
  console.log(rows.join('\n'))
} finally {
  rmSync(dir, {recursive: true, force: true})
}
