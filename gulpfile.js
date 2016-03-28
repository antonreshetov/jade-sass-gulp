var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var jade         = require('gulp-jade');
var watch        = require('gulp-watch');
var useref       = require('gulp-useref');
var clean        = require('gulp-clean');
var merge        = require('gulp-merge');

// Browser Sync
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

// Copy Assets File
gulp.task('copyfiles', function() {
  var img = gulp.src('src/assets/img/*')
    .pipe(watch('src/assets/img/*'))
    .pipe(gulp.dest('app/assets/img'));
  var fonts = gulp.src('src/assets/fonts/*')
    .pipe(watch('src/assets/fonts/*'))
    .pipe(gulp.dest('app/assets/fonts'));

  return merge(img, fonts);
});

// SCSS to CSS + Prefix
gulp.task('css', function() {
  return gulp.src('src/assets/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 15 versions']}))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

// Jade
gulp.task('jade', function(){
  return gulp.src('src/jade/*.jade')
    .pipe(jade({
      pretty: true
      }))
    .pipe(useref())
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream:true}));
});

// Watch
gulp.task('watch', function(){
  gulp.watch('src/assets/scss/**/*.scss',['css']);
  gulp.watch('src/jade/**/*.jade',['jade']);
});

// Clean app
gulp.task('clean', function () {
  return gulp.src('app', {force: true})
    .pipe(clean());
});

// Run Default
gulp.task('default',['browserSync', 'css', 'jade','copyfiles', 'watch']);
