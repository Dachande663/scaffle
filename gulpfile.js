'use strict';

var gulp = require('gulp');

var plugins = {
	concat:     require('gulp-concat'),
	jshint:     require('gulp-jshint'),
	ngMin:      require('gulp-ng-annotate'),
	ngTemplate: require('gulp-angular-templatecache'),
	order:      require('gulp-order'),
	sass:       require('gulp-sass'),
	sassMinify: require('gulp-minify-css'),
	sourcemaps: require('gulp-sourcemaps'),
	stream:     require('event-stream'),
	uglify:     require('gulp-uglify'),
	watch:      require('gulp-watch')
};


gulp.task('default', ['sass', 'js']);


gulp.task('js', ['js.lib', 'js.app']);


gulp.task('js.lib', function(){

	var libs = [
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/moment/moment.js',
		'./bower_components/angular/angular.js',
		'./bower_components/ui-router/release/angular-ui-router.js',
		'./bower_components/angular-bootstrap/ui-bootstrap.js'
	];

	return gulp
		.src(libs)
		.pipe(plugins.concat('lib.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('./public/assets/js'))
	;

});


gulp.task('js.app', function(){

	var app = gulp
		.src('./src/js/**/*.js')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'))
		.pipe(plugins.ngMin())
		.pipe(plugins.concat('app.js'))
		.pipe(plugins.uglify())
	;

	var views = gulp
		.src('./src/views/**/*.html')
		.pipe(plugins.ngTemplate('views.js', { module: 'Scaffle.App' }))
	;

	return plugins.stream.merge(app, views)
		.pipe(plugins.order(['app.js', 'views.js']))
		.pipe(plugins.concat('app.js'))
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('./public/assets/js'))
	;

});


gulp.task('sass', function(){

	var sassOpts = {
        errLogToConsole: true,
        includePaths: ['./bower_components'],
        imagePath: '../img',
        outputStyle: 'compressed'
    };

	return gulp
		.src('./src/sass/**/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass(sassOpts))
		.pipe(plugins.sassMinify())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('./public/assets/css'))
	;

});


gulp.task('watch', function(){

	plugins.watch('./src/sass/**/*.scss', function(){
		gulp.start('sass');
	});

	plugins.watch('./src/js/**/*.js', function(){
		gulp.start('js.app');
	});

	plugins.watch('./src/views/**/*.html', function(){
		gulp.start('js.app');
	});

});
