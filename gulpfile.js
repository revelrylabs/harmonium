require('babel-register')

const gulp = require('gulp')
const webserver = require('gulp-webserver')
const genDocs = require('./docs-src/generate').default

const paths = [
  'docs-src/site.scss',
  'scss/**/*.scss',
  'src/**/*.js'
]

const watcher = gulp.watch(paths, ['docs'])
watcher.on('change', (event) => {
  console.log(`File ${event.path} was ${event.type}, running tasks...`)
})

gulp.task('webserver', () => {
  gulp.src('docs')
    .pipe(webserver({
      livereload: true,
      open: true,
    }))
})

gulp.task('docs', () => {
  return genDocs()
})

gulp.task('default', ['docs', 'webserver'])
