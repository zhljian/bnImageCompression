'use strict';

let tinify = require('tinify');
// tinify.key = 'mWOnZaTbJTNARWKPy8mdgf1Ju3cROIjU';

let bnTinify = {};
/**
 * 压缩文件
 * @param {String} source 	源文件
 * @param {String} target	目标文件
 * @return {Promise}
 */
bnTinify.compression = function(source, target, key){
	tinify = key;
	let sourceFile = tinify.fromFile(source);

	return sourceFile.toFile(target);
};

module.exports = bnTinify;

