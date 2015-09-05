var gulp = require('gulp');
var cssMin = require('gulp-css');
var verify = require('gulp-verify');

gulp.task('verify', function() {
	return gulp.src('package.json').pipe(verify())
});

// gulp.start('verify');