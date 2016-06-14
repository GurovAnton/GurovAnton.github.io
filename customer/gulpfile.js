'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var paths = {
    style: 'sass/**/*.scss',
};

gulp.task('sass', function() {
    return gulp.src(paths.style)
        .pipe(concat('main.scss'))
        .pipe(gulp.dest('css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});
gulp.task('sass:watch', function() {
    gulp.watch(paths.style, ['sass']);
});
