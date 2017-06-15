let compression = require('./lib/bnImageCompression');
let bncompression = {};

/**
 * 压缩一个文件夹或文件夹
 * @param {String} sourceDir    源文件夹
 * @param {String} targetDir    目的文件夹
 * @param {String} key          压缩秘钥
 */
bncompression.compress = function(inputPath, outPutPath, key, callback){
    compression.compress(inputPath, outPutPath, key).then(function(){
        callback(null);
    }, function(error){
        callback(error);
    });
};

module.exports = bncompression;
