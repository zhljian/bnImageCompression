/**
 * 文件读写类
 * author : zhljian
 * date   : 2017/6/9
 * description :
 * 该类主要是封装了fs库,将异步方法封装成promise
 */
'use strict';
let fs = require('fs');
let Path = require('path');
let bnFs = {};

/**
 * 将路径转换为绝对路径
 * @param {String} path 文件路径
 * @return {String} 绝对路径
 */
bnFs.convertAbsolutePath = function(path){
    if (Path.isAbsolute(path)){
        // 是绝对路径直接返回
        return path;
    } else {
        return Path.normalize(Path.join(process.cwd(), path));
    }
};

/**
 * 读取文件夹下的所有文件
 * @param {String} path 文件夹路径
 * @return {Promise}
 */
bnFs.readdir = function(path){
    let absolutePath = this.convertAbsolutePath(path);
    return new Promise(function(resolve, reject){
		fs.readdir(absolutePath, function(error, files){
            if (error) {
                reject(error);
            }
            resolve(files);
        });
	});
};

/**
 * 读取文件信息
 * @param {String} path 文件夹路径
 * @return {Promise}
 */
bnFs.stat = function(path){
    let absolutePath = this.convertAbsolutePath(path);
    return new Promise(function(resolve, reject){
		fs.stat(absolutePath, function(error, stats){
            if (error) {
                reject(error);
            }
            resolve(stats);
        });
	});
};

/**
 * 读取文件内容
 * @param {String} path 文件夹路径
 * @return {Promise}
 */
bnFs.readFile = function(path) {
    let absolutePath = this.convertAbsolutePath(path);
    return new Promise(function(resolve, reject){
		fs.readFile(absolutePath, 'utf-8', function(error, file){
            if (error) {
                reject(error);
            }
            resolve(file);
        });
	});
};

/**
 * 创建文件夹
 * @param {String} dirPath  文件夹路径
 * @return {Promise}
 */
bnFs.mkdir = function(dirPath) {
    return new Promise(function(resolve, reject){
		fs.mkdir(dirPath, function(error){
            if (error) {
                reject(error);
            }
            resolve(true);
        });
	});
}

/**
 * 文件是否存在
 * @param {String} path  文件夹路径
 * @return {Promise}
 */
bnFs.exists = function(path) {
    return new Promise(function(resolve, reject){
		fs.exists(path, function(exist){
            resolve(exist);
        });
	});
};

module.exports = bnFs;