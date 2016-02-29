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

gulp.task('compile', ['js','styles'], function () {
    log('Compiling js + css');
});
/**
 * Clean all: js + css
 * */
gulp.task('clean', ['clean-styles', 'clean-js'], function () {
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
///////////
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
    done();
}
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}