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
const IGNORE_FILE = fs.ignoreFileName;

let bnImageCompression = {};

bnImageCompression.fileType = ['.png','.jpg'];

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
        
        yield self._compressionDir(self.sourceDir)
    }).catch(function (err) {
        console.error(err);
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
        self.key = key;
        yield tinify.compression(source, target, key);
    }).catch(function (err) {
        console.error(err);
    });
};

/**
 * 压缩文件夹
 * @param {String} sourceDir    源文件夹
 * @return {Promise}
 */
bnImageCompression._compressionDir = function(sourceDir) {
    let self = this;
    return co(function *() {
        let files = yield fs.readdir(sourceDir);       // 文件夹下的所有文件

        for (let i = 0; i < files.length; i++) {
            let fileName = files[i];
            yield self._compressionDirOneFile(sourceDir, fileName);
        }
    }).catch(function (err) {
        console.error(err);
    });
};

/**
 * 压缩文件夹下的一个文件
 * @param {String} dirPath      文件夹路径
 * @param {String} fileName     文件名
 * @return {Promise}
 * 
 */
bnImageCompression._compressionDirOneFile = function(dirPath, fileName){
    let self = this;
    return co(function *() {
        let ignoreFile = yield fs.getIgnoreFile(self.sourceDir);   // 忽略配置文件
        // 如果文件是忽略文件,不处理
        if (fileName == IGNORE_FILE) {
            return ;
        }
        // 处理文件路径
        let filePath = Path.join(dirPath, fileName);
        
        // 需要忽略的文件
        if (self._isIgnore(filePath, ignoreFile)) {
            return ;
        }
        let stat = yield fs.stat(filePath);
        
        if (stat.isDirectory()){
            // 文件及递归
            yield self._compressionDir(filePath);
        } else {
            // 文件类型是否符合
            if (self._conformType(filePath, self.fileType)) {
                // TODO  压缩文件
                console.log('file:%s', filePath);
            }
        }
    }).catch(function (err) {
        console.error(err);
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
 * 
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

module.exports = bnImageCompression;