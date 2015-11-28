'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

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
        .pipe(browserSync.reload({stream: true}))
});


// gulp browserSync - Starts a BrowserSync sever at the Demo site.
// BrowserSync - http://www.browsersync.io
// From: Zell Liew. “Automate Your Workflow.”
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'demo/_build/html',
        },
        browser: 'google chrome',
        open: false,
    })
})


// gulp watch - build when files change
// sass is run automatically when watch is run; even before files are changed
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('sass/**/*.scss', ['sass']);
});

