const knownIssue = `\nKNOWN ISSUE: Deprecation warnings for minimatch and graceful-fs
are coming from Gulp and shouldn't cause problems. They'll be fixed in Gulp 4.
For further info, see https://github.com/gulpjs/gulp/issues/1571\n\n
To remove this warning, delete scripts/postinstall.js and 
remove the reference in package.json > "scripts" > "postinstall"\n`

console.log('\x1b[34m%s\x1b[0m', knownIssue)