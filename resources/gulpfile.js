/*
 Require the modules we need
 */
var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    autoprefixer    = require('autoprefixer'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    notify          = require('gulp-notify'),
    $               = require('gulp-load-plugins')();

/*
 These are various paths that'll be used throughout this file
 */
var paths = {
    npm: 'node_modules/',

    // Where our dev files go
    scss: 'scss/',
    js: 'js/',

    // where our built / compiled files go
    dist: {
        css: '../css/',
        js: '../js/'
    }
}

function sass() {
    return gulp.src(paths.scss+'main.scss')
        .pipe($.sass({
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(notify({ message: 'CSS task complete' }));
}

function js() {
    // all the JS files we'll be concatenating and minifying.
    // in order of how they'll be compiled (think of it like include order)
    var jsFiles = [

        // 3rd party libs
        paths.npm + 'jquery/dist/jquery.js'
    ];

    return gulp.src(jsFiles)
        .pipe(concat('main.min.js'))
        .pipe(uglify({output:{ comments: 'some', beautify: false }}))
        .pipe(gulp.dest(paths.dist.js)) // save .min.js
        .pipe(notify({ message: 'JS task complete' }));
}

function setup() {

    return gulp.src('.')
        .pipe(notify({ message: 'Setup task complete' }));
}

function watch() {
    gulp.watch(paths.scss + '**/*.scss', gulp.series('css'));
    gulp.watch(paths.js + '**/*.js', gulp.series('js'));
}

gulp.task('css', function() { return sass(); });
gulp.task('js', function() { return js(); });
gulp.task('setup', function() { return setup(); });
gulp.task('default', gulp.series('setup', 'css', 'js', watch));