/**
 * 图片压缩类
 * author : zhljian
 * date   : 2017/6/9
 * description :
 * 该类主要是封装了tinify库
 */
'use strict';

let tinify = require('tinify');
let myconsole = require('./bnConsole');
let TEST = 0;

let bnTinify = {};

bnTinify.setTestMode = function(testMode){
	TEST = testMode;
};

/**
 * 压缩文件
 * @param {String} source 	源文件
 * @param {String} target	目标文件
 * @return {Promise}
 */
bnTinify.compression = function(source, target, key){
	if (TEST) {
		return new Promise(function(resolve, reject){
			setTimeout(function() {
				myconsole.testFileInfo(source, target);
				resolve(true);
			}, 3000);
		});
	}
	tinify.key = key;
	let sourceFile = tinify.fromFile(source);

	return sourceFile.toFile(target);
};

module.exports = bnTinify;

