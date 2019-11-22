const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//compile scss into css
gulp.task('sass', () => {
  return gulp.src([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ])
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});

//copy js scripts to src/js
gulp.task('js', () => {
 return gulp.src([
   'node_modules/bootstrap/dist/js/bootstrap.min.js',
   'node_modules/jquery/dist/jquery.min.js',
   'node_modules/popper.js/dist/umd/popper.min.js'
 ])
 .pipe(gulp.dest('src/js'))
 .pipe(browserSync.stream());
});

//custumed serve task for gulp^4.0
gulp.task('serve', gulp.series('sass', function(){
  browserSync.init({
    server: './src'
  });

  //watches for changes on scss archives and refresh browser automatically
  gulp.watch([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ], gulp.series('sass'));

  //watches for changes on html files and refresh browser
  gulp.watch('src/*.html')
    .on('change', browserSync.reload);
}));

//copy font-awesome css to src/css
gulp.task('font-awesome', () => {
 return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
   .pipe(gulp.dest('src/css'));
})

//copy font-awesome fonts to scr/fonts
gulp.task('fonts', () => {
 return gulp.src('node_modules/font-awesome/fonts/*')
   .pipe(gulp.dest('src/fonts'));
});

//customed serve task for gulp^4.0
gulp.task('default', gulp.parallel('js', 'font-awesome', 'fonts', 'serve'));
