'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function() {
    console.log('Hello Jonathan!');
});

// gulp sass - build Sass in sass/ directory and install into theme
gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('lsst_sphinx_technote_theme/static/css'))
});

// gulp watch - build when files change
// sass is run automatically when watch is run; even before files are changed
gulp.task('watch', ['sass'], function() {
    gulp.watch('sass/**/*.scss', ['sass']);
});
