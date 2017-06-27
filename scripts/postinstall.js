const knownIssue = `\nDon't worry about the deprecation warnings for minimatch and graceful-fs.
They're coming from Gulp and will be fixed in Gulp 4.
For further info, see https://github.com/gulpjs/gulp/issues/1571`

const howToRemove = `(To remove this warning, delete scripts/postinstall.js 
and remove the reference in package.json > "scripts" > "postinstall")\n`

console.log('\x1b[34m%s', knownIssue)
console.log('\x1b[32m%s\x1b[0m', howToRemove)