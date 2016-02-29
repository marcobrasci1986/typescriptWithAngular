var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var config = require('./gulp.config')(); // () means execute immediately like IIFE
var $ = require('gulp-load-plugins')({lazy: true});

/**
 * Compile LESS
 */
gulp.task('styles', ['clean-styles'], function () {
    log('Compiling less --> CSS');
    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe(gulp.dest(config.devCss));
});

gulp.task('copy-views',['clean-views'], function () {
    return gulp
        .src('./app/views/**/*.html')
        .pipe(gulp.dest(config.dev + 'views/'))
});

/**
 * Compile Typescript
 */
gulp.task('js', ['clean-js'], function () {
    log('Compiling typescript --> js');

    var tsProject = ts.createProject(config.tsConfig);
    var tsResult = tsProject
        .src(config.typescript)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest(config.devJs));
});

/**
 * Watch TS + LESS
 */
gulp.task('watcher', function () {
    gulp.watch([config.less], ['styles']);
    gulp.watch([config.typescript], ['js']);
});

/**
 * Compile TS and LESS
 */
gulp.task('compile', ['js','styles', 'copy-views'], function () {
    log('Compiling js + css');
});

/**
 * 1. get index.html file
 * 2. Find bower files in right order
 * 3. Find and inject custom js (first module files, then normal js, exclude spec files). See comments in index.html
 */
gulp.task('wiredep', function () {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWireDepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src('./app/index.html')
        .pipe(wiredep(options)) // inject bower css
        .pipe($.inject(gulp.src(config.js))) // inject custom js
        .pipe(gulp.dest('app/build/dev')); // destination new index.html file
});



/**
 * Clean all: js + css
 * */
gulp.task('clean', ['clean-styles', 'clean-js', 'clean-views'], function () {
});
gulp.task('clean-styles', function (done) {
    log('Cleaning css');
    var files = config.devCss + '**/*.css';
    clean(files, done);
});
gulp.task('clean-js', function (done) {
    log('Cleaning js');
    var files = config.devJs + '**/*.js';
    clean(files, done);
});
gulp.task('clean-views', function (done) {
    log('Cleaning html');
    var files = config.devViews + '**/*.html';
    clean(files, done);
});



///////////
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
    done();
}
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}