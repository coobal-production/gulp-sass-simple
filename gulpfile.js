var gulp        = require('gulp');
var $           = require("gulp-load-plugins")();
var browserSync = require('browser-sync').create();
var paths = {
  dest     : './public_html',
  sass     : './src',
  styles   : './public_html/css'
}

gulp.task('default', ['browser-sync', 'watch']);

// Watch
gulp.task('watch', function() {
  gulp.watch( paths.sass + '/**/*.scss', function(event) { gulp.run('sass'); } );
  gulp.watch( paths.styles + '/application.css', ['cssmin'] );
});

// sass
gulp.task('sass', function () {
  gulp.src( paths.sass + '/**/*.scss' )
    .pipe($.plumber())
    .pipe($.sass({
      //outputStyle: 'compressed'
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 3 versions', 'android >= 2.1']
    }))
    .pipe(gulp.dest( paths.styles ))
    .pipe(browserSync.reload({stream: true}));
});

// css-min
gulp.task('cssmin', function () {
  gulp.src( paths.styles + '/application.css' )
  .pipe($.cssmin())
  .pipe($.rename({ suffix: '.min' }))
  .pipe(gulp.dest( paths.styles ));
});

// BrowserSync
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'localhost:8080',// 環境にあわせて変更
    open: 'external'// URLをUPで開く
  });
});
