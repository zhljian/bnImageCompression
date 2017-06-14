/**
 * 图片压缩类
 * author : zhljian
 * date   : 2017/6/9
 * description :
 * 该类提供了压缩文件夹的方法(comoressionDir),压缩一个文件的方法(compressionFile)
 */
'use strict';

let fs = require('./bnFs');
let tinify = require('./bnTinify');
let Path = require('path');
let co = require('co');
let minimatch = require('minimatch');

// 忽略文件
const IGNORE_FILE = 'ignore.bnignore';

let bnImageCompression = {};

bnImageCompression.fileType = ['.png','.jpg'];
bnImageCompression.handleFiles = [];

/**
 * 压缩一个文件夹
 * @param {String} sourceDir    源文件夹
 * @param {String} targetDir    目的文件夹
 * @param {String} key          压缩秘钥
 * @return {Promise}
 */
bnImageCompression.compressionDir = function(sourceDir, targetDir, key){
    let self = this;
    return co(function *() {
        self.sourceDir = fs.convertAbsolutePath(sourceDir);
        self.targetDir = targetDir || self.sourceDir;
        self.key = key;
        self.handleFiles = [];
        
        yield self._getSourceFiles(self.sourceDir, self.targetDir);

        for (let i = 0; i < self.handleFiles.length;i++) {
            let fileObj = self.handleFiles[i];

            yield self.compression(fileObj.source, fileObj.target, self.key);
            console.log('(%s/%s)', i + 1, self.handleFiles.length)
        }
    }).catch(function (error) {
        console.error(error);
        throw error;
    });
};

/**
 * 压缩一个文件
 * @param {String} source       源文件
 * @param {String} target       目的文件
 * @param {String} key          压缩秘钥
 * @return {Promise}
 */
bnImageCompression.compressionFile = function(source, target, key){
    return co(function *() {
        target = target || source;
        yield tinify.compression(source, target, key);
    }).catch(function (error) {
        console.error(error);
        throw error;
    });
};

/**
 * 压缩文件夹
 * @param {String} sourceDir    源文件夹
 * @param {String} targetDir    目的文件夹
 * @return {Promise}
 */
bnImageCompression._getSourceFiles = function(sourceDir, targetDir) {
    let self = this;
    return co(function *() {
        let files = yield fs.readdir(sourceDir);       // 文件夹下的所有文件

        for (let i = 0; i < files.length; i++) {
            let fileName = files[i];
            yield self._getOneFile(sourceDir, targetDir, fileName);
        }
    }).catch(function (error) {
        console.error(error);
        throw error;
    });
};

/**
 * 压缩文件夹下的一个文件
 * @param {String} dirPath      文件夹路径
 * @param {String} targetDir    目的文件夹
 * @param {String} fileName     文件名
 * @return {Promise}
 * 
 */
bnImageCompression._getOneFile = function(dirPath, targetDir, fileName){
    let self = this;
    return co(function *() {
        let ignoreFile = yield self._getIgnoreFile(self.sourceDir);   // 忽略配置文件
        // 如果文件是忽略文件,不处理
        if (fileName == IGNORE_FILE) {
            return ;
        }
        // 处理文件路径
        let filePath = Path.join(dirPath, fileName);
        let newTargetDir = Path.join(targetDir, fileName);
        
        // 需要忽略的文件
        if (self._isIgnore(filePath, ignoreFile)) {
            return ;
        }
        let stat = yield fs.stat(filePath);
        
        if (stat.isDirectory()){
            // 文件夹递归
            yield self._getSourceFiles(filePath, newTargetDir);
        } else {
            // 文件类型是否符合
            if (self._conformType(filePath, self.fileType)) {
                yield self._exitsAndMakeDir(targetDir);
                let fileObj = {source: filePath, target: newTargetDir};
                self.handleFiles.push(fileObj);
            }
        }
    }).catch(function (error) {
        console.error(error);
        throw error;
    });
};

/**
 * 
 * @param {String}   file   文件名 
 * @param {[String]} types  类型数组
 * @return {Boolean}        是否是符合的类型
 */
bnImageCompression._conformType = function(file, types) {
    let extName = Path.extname(file);
    return types.indexOf(extName) != -1;
};

/**
 * 读取路径下忽略文件内容
 * @param {String} dirPath  文件夹路径
 * @return {Promise}
 */
bnImageCompression._getIgnoreFile = function(dirPath) {
    let self = this;
    return co(function *() {
        let ignorePath = Path.join(dirPath, IGNORE_FILE);
        let exist = yield fs.exists(ignorePath);       // 文件夹下的所有文件

        if (exist) {
            let str = yield fs.readFile(ignorePath);

            return str;
        }
    }).catch(function (error) {
        console.error(error);
        throw error;
    });
};

/**
 * 文件是否需要忽略
 * @param {String} path       文件路径
 * @param {String} ignoreStr  忽略文件名
 * @return {Promise}
 */
bnImageCompression._isIgnore = function(path, ignoreStr) {
    try {
        let relativePath = Path.relative(this.sourceDir, path);
        if (!ignoreStr) {
            return false;
        }
        let ignoreArray = ignoreStr.split('\n');
        for (let i = 0; i < ignoreArray.length; i++) {
            if (!ignoreArray[i]) {
                continue ;
            }
            
            // 路径匹配
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

/**
 * 目标路径是否存在，不存在则创建路径
 * @param {String} dirPath  文件夹路径
 * @return {Promise}
 */
bnImageCompression._exitsAndMakeDir = function(dirPath) {
    let self = this;
    return co(function *() {
        let exist = yield fs.exists(dirPath);
        // 文件已存在
        if (exist) {
            return ;
        }
        exist = yield fs.exists(Path.dirname(dirPath));
        // 文件夹不存在则创建他的上一级文件夹
        if (!exist) {
            yield self._exitsAndMakeDir(Path.dirname(dirPath));
        }
        yield fs.mkdir(dirPath);
    }).catch(function (error) {
        console.error(error);
        throw error;
    });
};

module.exports = bnImageCompression;