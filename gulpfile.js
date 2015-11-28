'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var syncExec = require('sync-exec')
var del = require('del');
var runSequence = require('run-sequence');


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

// BrowserSync - http://www.browsersync.io
// gulp sass - build Sass in sass/ directory and install into theme
gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(customPlumber())
        .pipe(sass())
        .pipe(gulp.dest('lsst_sphinx_technote_theme/static/css'))
        // .pipe(browserSync.reload({stream: true}))
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


// gulp sphinx:clean - Delete the demo Sphinx site build
gulp.task('sphinx:clean', function(callback) {
    del(['demo/_build/html'], callback);
});


// gulp sphinx - Build the demo sphinx site
gulp.task('sphinx', function(callback) {
    var sphinx = syncExec('sphinx-build -a -E -b html5 demo demo/_build/html');
    console.log(sphinx.stdout);
    console.log(sphinx.stderr);
    callback()  // tell gulp the synchronous task is complete
    return sphinx
});


// gulp watch - build when files change
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['sass', 'sphinx:clean', 'sphinx']);
    gulp.watch('lsst_sphinx_technote_theme/*.html', ['sphinx']);
    gulp.watch("demo/_build/html/**/*", browserSync.reload);
});


gulp.task('build:sphinx', ['sass', 'sphinx'], function() {
});


// default task runs the full pipeline, activates browserSync, then starts
// the watch task.
gulp.task('default', function(callback) {
    runSequence(
        'sphinx:clean',
        'sass',
        'sphinx',
        ['browserSync', 'watch'],
        callback
    );
});
