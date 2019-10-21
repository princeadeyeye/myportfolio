const gulp = require('gulp');
const jshint = require('gulp-jshint');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');


gulp.task('processHTML', () => {
	gulp.src('*.html')
		.pipe(gulp.dest('dist'))
});

gulp.task('processJQuery', () => {
	gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    	.pipe(gulp.dest('dist/js'));
});

gulp.task('processBootStrap', () => {
	gulp.src('./node_modules/bootstrap/dist/**/*')
    	.pipe(gulp.dest('dist/bootstrap'));
});

gulp.task('processCSS', () => {
	gulp.src('./css/*')
		.pipe(gulp.dest('dist/css'));
});

gulp.task('processJS', () => {
	gulp.src('./js/*')
		.pipe(jshint({
			esversion: 8
		}))
		.pipe(jshint.reporter('default'))
		.pipe(babel({
			presets: ['es2017']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

gulp.task('processIMG', () => {
	gulp.src('./img/*')
		.pipe(gulp.dest('dist/img'))
});

gulp.task('processPopperJs', () => {
	gulp.src('./node_modules/popper.js/dist/*')
		.pipe(gulp.dest('dist/popper.js'))
});

gulp.task('watch', ['browserSync'], () => {
	gulp.watch('./js/*', ['processJS']);
	gulp.watch('*.html', ['processHTML']);
	gulp.watch('./css/*', ['processCSS']);

	gulp.watch('dist/js/*', browserSync.reload);
  	gulp.watch('dist/*.html', browserSync.reload);
  	gulp.watch('dist/css/*', browserSync.reload);
});

gulp.task('default', (callback) => {
	runSequence(['processHTML', 'processJS', 'processCSS'], 'watch', callback);
});

gulp.task('serverprod', () => {
	connect.server({
		root: 'dist',
		port: process.env.PORT || 5000,
		livereload: false
	});
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: './dist',
    port: 8080,
    ui: {
      port: 8081
    }
  });
});
