var gulp = require('gulp');

// gulp plugins
var gutil = require('gulp-util'),
	rSass = require('gulp-ruby-sass'),
	
	connect = require('gulp-connect');

// file sources and destination


// task for sass convert to css
gulp.task('sass',function(){
	return rSass('build/development/*.scss',{ style: 'expanded' })
		
		.pipe(gulp.dest('build/development/css'))
		.pipe(connect.reload())
});	
gulp.task('html',function(){
	gulp.src('build/development/index.html')
	.pipe(connect.reload())
});
gulp.task('connect',function(){
	connect.server({
		root : 'build/development/',
		livereload : true
	});
});
gulp.task('watch',function(){
	gulp.watch('build/development/index.html', ['html']);
	gulp.watch('build/development/*.scss',['sass']);
});
// default task
gulp.task('default',['connect','watch']);
