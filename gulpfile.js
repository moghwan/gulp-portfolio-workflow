const gulp = require('gulp');
const resizer = require('gulp-image-resize');
const del = require('del');
const gulpsass = require('gulp-sass');

function images() {
    return gulp.src('images/*.jpg', {since: gulp.lastRun(images)})
        .pipe(resizer({
            width: 640,
            height: 480,
            crop: true,
            imageMagick: true,
        }))
        .pipe(gulp.dest('dist/images'))
}

function clean() {
    return del('dist')
}

function sass() {
    return gulp.src('css/*.scss', {sourcemaps: true})
        .pipe(gulpsass())
        .pipe(gulp.dest('dist/css', {sourcemaps: '.'}))
}

function watcher() {
    gulp.watch('images/*.jpg', {ignoreInitial: false}, images)
}

module.exports = {
    // images,
    // clean,
    // sass: sass,
    watch: gulp.series(clean, watcher),
    default: gulp.series(clean, gulp.parallel(images, sass))
}