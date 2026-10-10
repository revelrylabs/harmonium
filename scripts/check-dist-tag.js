// Prints the npm dist-tag an 8.x release must use, or exits non-zero.
// While v8 is still `latest` on npm, 8.x patches publish to `latest`.
// Once v9 is `latest`, they publish to `v8` so they can't replace it.
const {execSync} = require('child_process')
const {name, version} = require('../package.json')

if (!version.startsWith('8.')) {
  console.error(`✖ ${name}@${version}: the 8.x branch only publishes 8.x versions`)
  process.exit(1)
}

const latest = execSync(`npm view ${name} dist-tags.latest`).toString().trim()
const tag = Number(latest.split('.')[0]) >= 9 ? 'v8' : 'latest'
console.error(`✔ ${name}@${version} → ${tag} (latest is ${latest})`)
console.log(tag)
