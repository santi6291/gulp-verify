# gulp-verify

Validate installed gulp plugins through gulp's [blacklist](http://gulpjs.com/plugins/blackList.json). 

## Install

`npm install gulp-verify`

## Example

**gulpfile.js**
> currently needs to stream a file (**this file will remain untouched**)

```
var verify = require('gulp-verify');

gulp.task('verify', function() {
	return gulp.src('some_file.extension').pipe(verify());
});
```
> Once this task runs it will console any plugins which have been blacklisted by gulp.
