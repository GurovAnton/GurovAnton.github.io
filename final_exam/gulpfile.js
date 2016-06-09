'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var paths = {
    style: 'sass/**/*.scss',
    scripts: 'js/*.js'
};

gulp.task('sass', function() {
    return gulp.src(paths.style)
        .pipe(concat('main.scss'))
        .pipe(gulp.dest('./css/'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});
gulp.task('sass:watch', function() {
    gulp.watch(paths.style, ['sass']);
});
gulp.task('min', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(gulp.dest('js/min'));
});

// The default task (called when you run `gulp` from cli)
