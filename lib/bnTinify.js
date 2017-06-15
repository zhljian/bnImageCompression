/**
 * 图片压缩类
 * author : zhljian
 * date   : 2017/6/9
 * description :
 * 该类主要是封装了tinify库
 */
'use strict';

let tinify = require('tinify');
// tinify.key = 'mWOnZaTbJTNARWKPy8mdgf1Ju3cROIjU';
// node.exe bin/command.js -i /D/zhljian/slots_js/game-js-slots/build/jsb-default/res/raw-assets/resources/10001/ -k mWOnZaTbJTNARWKPy8mdgf1Ju3cROIjU -d
let DEBUG = 1;

let bnTinify = {};
/**
 * 压缩文件
 * @param {String} source 	源文件
 * @param {String} target	目标文件
 * @return {Promise}
 */
bnTinify.compression = function(source, target, key){
	if (DEBUG) {
		return new Promise(function(resolve, reject){
			setTimeout(function() {
				resolve(true);
			}, 3000);
		});
	}
	tinify.key = key;
	let sourceFile = tinify.fromFile(source);

	return sourceFile.toFile(target);
};

module.exports = bnTinify;

