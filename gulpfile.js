var gulp = require('gulp');

// gulp plugins
var gutil = require('gulp-util'),
    rSass = require('gulp-ruby-sass'),

    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    lint = require('gulp-jshint'),
    es6Transpiler = require('gulp-es6-transpiler');

// file sources and destination


// task for sass convert to css
gulp.task('sass', function() {
    return rSass('build/development/*.scss', {
            style: 'expanded'
        })
        .pipe(autoprefixer())
        .pipe(gulp.dest('build/development/css'))

    .pipe(connect.reload())
});

// look for html changes 
gulp.task('html', function() {
    gulp.src('build/development/index.html')
        .pipe(connect.reload())

});

// server and live reload
gulp.task('connect', function() {
    connect.server({
        root: 'build/development/',
        livereload: true
    });
});

// js convert to es5 and jshint check
// js path for babel
var path = {
	babel : 'build/development/*.js'
}
// es6 transpiler
gulp.task('es6',function(){
	gulp.src(path.babel)
		.pipe(es6Transpiler())
		.pipe(gulp.dest('build/development/js'))
		.pipe(connect.reload())
});

// gulp.task('js', function() {
//     gulp.src('build/development/script.js')
//         .pipe(lint())
//         .pipe(lint.reporter('default'))
//         .pipe(gulp.dest('build/development/js'))
//         .pipe(connect.reload())

// });
// gulp looking for changes in files 
gulp.task('watch', function() {
    gulp.watch('build/development/index.html', ['html']);
    gulp.watch('build/development/*.scss', ['sass']);
    // gulp.watch('build/development/script.js', ['js']);
    gulp.watch(path.babel, ['es6']);
   
});
// default task
gulp.task('default', ['connect', 'watch']);
