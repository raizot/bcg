let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let pug = require('gulp-pug');

sass.compiler = require('node-sass');

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
    gulp.watch('app/pug/*.pug', gulp.parallel('pug'))
});

gulp.task('html',function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});
gulp.task('pug', function buildHTML() {
    return gulp.src('app/pug/*.pug')
    .pipe(browserSync.reload({stream: true}))
      .pipe(pug({
          pretty: true
      }))
      .pipe(gulp.dest('app/'));
});

gulp.task('html',function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});
gulp.task('default', gulp.parallel('scss','js','browser-sync','watch'))