'use strict';

let fs = require('fs');
let Path = require('path');
let tinify = require('tinify');

let fileArray = [];
let fileType = ['.png', '.jpg'];

/**
 * 处理一个路径下的所有文件
 * @param {String} dirPath 
 */
function readDirFile (dirPath) {
    let realPath = convertPath(dirPath);
	fs.readdir(dirPath, function(err, files){
        if (err) {
            console.error('Dir path error:%s', JSON.stringify(err, null, 2));
            return ;
        }

        files.forEach(function(file) {
            // console.log('extname', Path.extname(file));
            let tmpPath = Path.join(dirPath, file);

            fs.stat(tmpPath, function(statErr, stats){
                if (statErr) {
                    console.error('file stat error: %s', JSON.stringify(statErr, null, 2));
                    return ;
                }
                if (stats.isDirectory()) {
                    readDirFile(tmpPath);
                } else {
                    if (conformType(tmpPath, fileType)) {
                        console.log('fileName:%s\n', tmpPath);
                    }
                }
            });
        }, this);
    });
};

/**
 * 将路径转换为绝对路径
 * @param {String} path 文件路径
 * @return {String} 绝对路径
 */ 
function convertPath (path) {
    if (Path.isAbsolute(path)){
        // 是绝对路径直接返回
        return path;
    } else {
        return Path.normalize(Path.join(__dirname, path));
    }
};

/**
 * 
 * @param {String}   file   文件名 
 * @param {[String]} types  类型数组
 * @return {Boolean}        是否是符合的类型
 */
function conformType (file, types) {
    let extName = Path.extname(file);
    return types.indexOf(extName) != -1;
};

readDirFile("D:/zhljian/work/tinify");