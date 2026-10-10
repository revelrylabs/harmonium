// Refuses to publish a version under a dist-tag that would mislead installs:
// prereleases must go to `next`, `latest` must be a stable 9+ release, and the
// v8 maintenance line publishes only from the 8.x branch under `v8`.
import {readFileSync} from 'node:fs'

const [pkgPath, tag] = process.argv.slice(2)
const {name, version} = JSON.parse(readFileSync(pkgPath, 'utf8'))
const major = Number(version.split('.')[0])
const prerelease = version.includes('-')

const fail = (msg) => {
  console.error(`✖ ${name}@${version} → ${tag}: ${msg}`)
  process.exit(1)
}

if (major < 9) fail('8.x and older publish from the 8.x branch with --tag v8')
if (prerelease && tag !== 'next') fail('prereleases must use the `next` tag')
if (!prerelease && tag !== 'latest') fail('stable releases must use the `latest` tag')

console.log(`✔ ${name}@${version} → ${tag}`)
