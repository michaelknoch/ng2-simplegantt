"use strict";
const gulp = require('gulp');
const sass = require('gulp-sass');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const inlineNg2Template = require('gulp-inline-ng2-template');
const merge = require('gulp-merge');

gulp.task('ts', ['scss'], () => {
    const tsResult = gulp.src(['comp/**/*.ts', 'typings/main.d.ts'])
        .pipe(typescript(tscConfig.compilerOptions))

    return merge([
        tsResult.js.pipe(gulp.dest('dist')),
        tsResult.dts.pipe(gulp.dest('dist'))
    ]);

});

gulp.task('scss', () => {
    return gulp.src('comp/simplegantt.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
    return gulp.src('comp/simplegantt.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('dist.inline', ['ts', 'scss', 'html'], function () {
    return gulp.src('dist/**/*.js')
        .pipe(inlineNg2Template({
            base: '/dist',
            useRelativePaths: true,
            supportNonExistentFiles: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['dist.inline']);
gulp.task('default', ['build']);