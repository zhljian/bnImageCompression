'use strict';

let fs = require('./bnFs');
let Path = require('path');
let tinify = require('tinify');
let co = require('co');
let minimatch = require('minimatch');

let fileArray = [];
let fileType = ['.png', '.jpg'];
let ignoreFileName = 'ignore.bnignore';

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

function isIgnore (path, ignoreStr) {
    try {
        let relativePath = Path.relative(realDir, path);
        if (!ignoreStr) {
            return false;
        }
        let ignoreArray = ignoreStr.split('\n');
        for (let i = 0; i < ignoreArray.length; i++) {
            if (!ignoreArray[i]) {
                continue ;
            }
            
            // console.log('ignore:%s, relativePath:%s', ignoreArray[i], relativePath, reg, path);
            if (minimatch(relativePath, ignoreArray[i])) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
};

let readDirFile = function (dirPath){
    return co(function *() {
        dirPath = fs.convertAbsolutePath(dirPath);
        let files = yield fs.readdir(dirPath);
        let ignoreFile = yield fs.getIgnoreFile(realDir);

        for (let i = 0; i < files.length; i++) {
            let fileName = files[i];
            if (fileName == ignoreFileName) {
                continue;
            }
            let filePath = Path.join(dirPath, fileName);

            if (isIgnore(filePath, ignoreFile)) {
                continue;
            }
            let stat = yield fs.stat(filePath);

            if (stat.isDirectory()){
                yield readDirFile(filePath);
            } else {
                if (conformType(filePath, fileType)) {
                    console.log('file:%s', filePath);
                }
            }
        }
    }).catch(function (err) {
        console.error(err);
    });
};
let realDir = "D:/zhljian/work/tinify";
readDirFile("D:/zhljian/work/tinify").then(function(){
    console.log("success");
}, function(err){
    console.error(err);
})