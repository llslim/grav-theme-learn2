var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  '../learn2/scss/',
];

/**
 * Compiles theme's scss
 *
 * During development, disable thw render cache in settings.local.php.
 */
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      noCache: true,
      outputStyle: "expanded",
      lineNumbers: false,
      includePaths: sassPaths,
  //    loadPath: './css/*',
      sourceMap: true
    })).on('error', function(error) {
      $.util.log(error);
      this.emit('end');
    })
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./css-compiled'))
    .pipe($.notify({
      title: "SASS Compiled",
      message: "All SASS files have been recompiled to CSS.",
      onLast: true
    }));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
