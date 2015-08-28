var through = require('through2');
var request = require('request');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// gulp plugins blacklist json
var blacklistUrl = 'http://gulpjs.com/plugins/blackList.json';
// parse blacklist json
var blacklist = {};

const PLUGIN_NAME = 'gulp-verify';
 
 function getBlacklist (callback){
	// get blacklist json from gulp
	request(blacklistUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			blacklist = JSON.parse(body);
			
			if(typeof callback === 'function'){
				callback();
			}
		} else {
			throw new PluginError(PLUGIN_NAME, error);
		}
	});
}

gulpVerify = function () {
	var stream = through();
	

	getBlacklist(function(){

		// loop through all active modules matching with blacklist modules 
		module.parent.children.forEach(function(moduleData, moduleIndex){
			// split module path
			var modulePathArr = moduleData.id.split('/');
			
			// return modulename
			var moduleName = modulePathArr.filter(function(pathPartial){
				var inPWD = new RegExp(pathPartial);
				return (inPWD.test(process.env.PWD) === false) && (pathPartial != 'node_modules') && (pathPartial != 'index.js');
			});
			moduleName = moduleName.join('');
			
			// check if module is in blacklist 
			if( typeof blacklist[moduleName] !== 'undefined' ){
				var msg = gutil.colors.red(moduleName , ':', blacklist[moduleName]);
				gutil.log(msg);
				// stream.write();
			}
		});
		// return cd();
	});
	
	// var stream = through.obj(function(file, enc, cb) {});
	// return stream;
};

module.exports = gulpVerify;