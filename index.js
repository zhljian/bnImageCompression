let compression = require('./lib/bnImageCompression');
let bncompression = {};

/**
 * 压缩一个文件夹
 * @param {String} sourceDir    源文件夹
 * @param {String} targetDir    目的文件夹
 * @param {String} key          压缩秘钥
 */
bncompression.compressionDir = function(inputPath, outPutPath, key, callback){
    compression.compressionDir(inputPath, outPutPath, key).then(function(){
        callback(null);
    }, function(error){
        callback(error);
    });
};

/**
 * 压缩一个文件
 * @param {String} source    源文件
 * @param {String} target    目的文件
 * @param {String} key          压缩秘钥
 */
bncompression.compressionFile = function(inputPath, outPutPath, key, callback){
    compression.compressionFile(inputPath, outPutPath, key).then(function(){
        callback(null);
    }, function(error){
        callback(error);
    });
};

module.exports = bncompression;
