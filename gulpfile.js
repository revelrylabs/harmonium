require('babel-register')

const gulp = require('gulp');
const webserver = require('gulp-webserver');
const docGenerator = require('./docs-src/generate')

gulp.task('webserver', () => {
  gulp.src('docs')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('docs', () => {
  return docGenerator.default();
});

const watcher = gulp.watch('src/**/*.js', ['docs']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('default', ['docs', 'webserver']);
