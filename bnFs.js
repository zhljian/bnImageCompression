let fs = require('fs');
let Path = require('path');

let DEBUG = 0;
let bnFs = {};
bnFs.ignoreFileName = 'ignore.bnignore';

let mylog = function(log){
    if (DEBUG) {
        console.log(log);
    }
};

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
        return Path.normalize(Path.join(__dirname, path));
    }
};

bnFs.readdir = function(path){
    let absolutePath = this.convertAbsolutePath(path);
    return new Promise(function(resolve, reject){
		fs.readdir(absolutePath, function(error, files){
            if (error) {
                mylog(JSON.stringify(error, null, 2));
                reject(error);
            }
            mylog('read dir success!');
            resolve(files);
        })
	});
};

bnFs.stat = function(path){
    let absolutePath = this.convertAbsolutePath(path);
    return new Promise(function(resolve, reject){
		fs.stat(absolutePath, function(error, stats){
            if (error) {
                mylog(JSON.stringify(error, null, 2));
                reject(error);
            }
            mylog('file stat success!');
            resolve(stats);
        })
	});
};

bnFs.readFile = function(path) {
    let absolutePath = this.convertAbsolutePath(path);
    return new Promise(function(resolve, reject){
		fs.readFile(absolutePath, function(error, file){
            if (error) {
                mylog(JSON.stringify(error, null, 2));
                reject(error);
            }
            mylog('read file success!');
            resolve(file);
        })
	});
};


bnFs.getIgnoreFile = function(dirPath) {
    let ignorePath = Path.join(dirPath, this.ignoreFileName);
    return new Promise(function(resolve, reject){
        if (!fs.existsSync(ignorePath)) {
            resolve(null);
        }
		fs.readFile(ignorePath, 'utf8', function(error, str){
            if (error) {
                mylog(JSON.stringify(error, null, 2));
                reject(error);
            }
            mylog('getIgnoreFile success!');
            resolve(str);
        })
	});
};

module.exports = bnFs;