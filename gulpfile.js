const gulp = require('gulp');
const resizer = require('gulp-image-resize');
const del = require('del');
const gulpsass = require('gulp-sass');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');

function images() {
    return gulp.src('images/*.jpg', {since: gulp.lastRun(images)})
        .pipe(resizer({
            width: 640,
            height: 480,
            crop: true,
            imageMagick: true,
        }))
        .pipe(gulp.dest('_dist/images'))
}

function clean() {
    return del('_dist')
}

function sass() {
    return gulp.src('css/*.scss', {sourcemaps: true})
        .pipe(gulpsass())
        .pipe(gulp.dest('_dist/css', {sourcemaps: '.'}))
}

function minifyjs() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('_dist/js'))
}

function hpug() {
    return gulp.src('index.pug')
        .pipe(pug())
        .pipe(gulp.dest('_dist'))
}

function watcher() {
    gulp.watch('images/*.jpg', {ignoreInitial: false}, images)
}

function watcherpug() {
    gulp.watch('index.pug', { ignoreInitial: false }, hpug)
}

module.exports = {
    // images,
    // clean,
    // sass: sass,
    // minifyjs,
    // hpug,
    watch: watcher,
    watchpug: watcherpug,
    default: gulp.series(clean, gulp.parallel(images, sass, minifyjs, hpug))
}