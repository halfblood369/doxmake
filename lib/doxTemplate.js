var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var dox = require('dox');
var dox_template = require('../relayCode/dox-template/lib/template.js');

exports.version = require('../package.json').version;

var DoxTemplate = function(opts) {
	this.name = opts.name || "API";
	this.release = opts.release || "0.0.1";
	this.directory = opts.directory;
	this.fileList = [];
};

/*
 * Get all the comments from the given files.
 *
 * @param {String} folder
 * @return {Object}
 */
var getComments = function(folder, list) {
	var comment = {};
	walk(folder, list);
	list.forEach(function(item) {
		var baseName = path.basename(item, '.js');
		var buf = fs.readFileSync(item, 'utf8');
		var obj = dox.parseComments(buf);
		comment[baseName] = obj;
	});
	return comment;
};

/**
 * merge all files' comments into one.
 *
 * @param {Object} obj
 * @return {Array}
 */
var toArray = function(obj) {
	var comments = [];
	for(var item in obj) {
		var comment = obj[item];
		comment.forEach(function(i) {
			comments.push(i);
		});
	}
	return comments;
};

/**
 * Generate api file by the merged comments.
 *
 *
 * @param {Array} buffer the merged comments
 * @param {String} apiName the name of api file
 * @param {String} apiRelease the release of api file
 * @param {String} apiPath the given folder to be generated api
 */
var toApiHtml = function(buffer, apiName, apiRelease, apiPath) {
	var template = new dox_template({release: apiRelease, name: apiName, styles: undefined });
	exec('mkdir ' + apiPath + '/doc && cp -rf ./resource/css/ ./resource/js/ ' + apiPath + '/doc/', function(err, stdout, stderr) {
		var apiStream = template.render(JSON.parse(JSON.stringify(buffer)));
		var apiHtml = fs.createWriteStream(apiPath+ '/doc/index.html');
		apiStream.on('data', function(data) {
			apiHtml.write(data);
		});
	});
};

/**
 * Walk the given folder.
 *
 * @param {String} folder
 * @return {Array} 
 */
var walk = function(folder, list) {
	var fileList = []; 
	var dirList = fs.readdirSync(folder);
	dirList.forEach(function(item) {
		if (fs.statSync(folder + '/' + item).isDirectory()) {
			walk(folder + '/' + item, list);
		} else {
			if (path.extname(item) === '.js') {
				list.push(folder + '/' + item);
			}
		}
	});
};

DoxTemplate.prototype.run = function() {
	var self = this;
	var comment = toArray(getComments(self.directory, self.fileList));
	toApiHtml(comment, self.name, self.release, self.directory);
};

module.exports = DoxTemplate;
