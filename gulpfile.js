var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/!(_)*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('combo', function () {
    return gulp.src('./src/js/lib/**.js')
        .pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/lib'))
});

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('copy', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
});

gulp.task('img', function() {
    return gulp.src('./src/img/**')
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['img', 'sass','js', 'combo', 'copy']);