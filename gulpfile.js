'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task('hello', function() {
    console.log('Hello Jonathan!');
});


// gulp-plummer wrapper to handle errors during gulp watch
// From Zell Liew. “Automate Your Workflow.”
function customPlumber (errTitle) {
    return plumber({
        errorHandler: function(err) {
            // Logs error in console
            console.log(err.stack);
            // gulp-notify doesn't work under tmux, unfortunately
            // notify.onError({
            //     // Customizing error title
            //     title: errTitle || 'Error running Gulp',
            //     message: 'Error: <%= error.message %>',
            // });
            // Ends the current pipe, so Gulp watch doesn't break
            this.emit('end');
        }
    });
}

// gulp sass - build Sass in sass/ directory and install into theme
gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(customPlumber())
        .pipe(sass())
        .pipe(gulp.dest('lsst_sphinx_technote_theme/static/css'))
});


// gulp watch - build when files change
// sass is run automatically when watch is run; even before files are changed
gulp.task('watch', ['sass'], function() {
    gulp.watch('sass/**/*.scss', ['sass']);
});
